import express from 'express';
import cors from 'cors';
import multer from 'multer';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { connectDB, insertComplaint, getGridFSBucket } from './db.js';
import { createZendeskTicket, testZendeskConnection } from './zendesk.js';

dotenv.config();

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Serve frontend static files
app.use(express.static(path.join(__dirname, '../../dist')));

const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB
const storage = multer.memoryStorage();
const upload = multer({
  storage,
  limits: { fileSize: MAX_FILE_SIZE },
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'GOTS Complaints API' });
});

// Zendesk test endpoint
app.get('/api/zendesk-test', async (req, res) => {
  try {
    const isConnected = await testZendeskConnection();
    res.json({
      success: isConnected,
      message: isConnected
        ? 'Connected to Zendesk'
        : 'Failed to connect to Zendesk',
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
});

// Submit complaint endpoint
app.post('/api/complaints', upload.array('files', 5), async (req, res) => {
  try {
    // Ensure database connection
    await connectDB();

    const { category, email, name, organization, confidential, answers } = req.body;

    if (!category || !email || !answers) {
      return res.status(400).json({
        error: 'Missing required fields: category, email, answers',
      });
    }

    // Validate email
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return res.status(400).json({ error: 'Invalid email address' });
    }

    // Parse answers if it's a string
    let parsedAnswers = answers;
    if (typeof answers === 'string') {
      try {
        parsedAnswers = JSON.parse(answers);
      } catch (e) {
        console.error('Failed to parse answers:', e);
      }
    }

    const complaintData = {
      category,
      email,
      name: name || null,
      organization: organization || null,
      confidential: confidential === 'true' || confidential === true,
      answers: parsedAnswers,
      fileCount: (req.files || []).length,
      fileNames: (req.files || []).map((f) => f.originalname),
      ipAddress: req.ip,
    };

    // Insert complaint to database
    const result = await insertComplaint(complaintData);
    const complaintId = result.insertedId.toString();

    // Create Zendesk ticket with files (optional - doesn't block submission if it fails)
    let zendeskInfo = null;
    if (process.env.ZENDESK_API_TOKEN) {
      try {
        const complaint = { ...complaintData, _id: complaintId };
        zendeskInfo = await createZendeskTicket(complaint, req.files || []);
        console.log('✓ Zendesk ticket created successfully');
      } catch (zendeskError) {
        console.warn(
          '⚠️  Zendesk ticket creation skipped (complaint saved to MongoDB):'
        );
        console.warn(zendeskError.message);
      }
    }

    // Upload files to GridFS if present
    if (req.files && req.files.length > 0) {
      const bucket = getGridFSBucket();
      const uploadPromises = req.files.map((file) => {
        return new Promise((resolve, reject) => {
          const uploadStream = bucket.openUploadStream(file.originalname, {
            metadata: {
              complaintId,
              mimeType: file.mimetype,
              uploadedAt: new Date(),
            },
          });

          uploadStream.on('finish', () => {
            console.log(`File uploaded: ${file.originalname} for complaint ${complaintId}`);
            resolve();
          });

          uploadStream.on('error', (err) => {
            console.error(`Failed to upload file ${file.originalname}:`, err);
            reject(err);
          });

          uploadStream.end(file.buffer);
        });
      });

      try {
        await Promise.all(uploadPromises);
      } catch (fileError) {
        console.error('File upload error:', fileError);
        // Continue even if file upload fails - complaint data is already saved
      }
    }

    res.status(201).json({
      success: true,
      complaintId,
      message: 'Complaint submitted successfully',
      zendesk: zendeskInfo || null,
    });
  } catch (error) {
    console.error('Error submitting complaint:', error);
    res.status(500).json({
      error: 'Failed to submit complaint',
      message: error.message,
    });
  }
});

// Get complaint endpoint (for verification/debugging)
app.get('/api/complaints/:id', async (req, res) => {
  try {
    await connectDB();
    const { ObjectId } = await import('mongodb');

    if (!ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ error: 'Invalid complaint ID' });
    }

    const db = (await connectDB());
    const collection = db.collection('complaints');
    const complaint = await collection.findOne({ _id: new ObjectId(req.params.id) });

    if (!complaint) {
      return res.status(404).json({ error: 'Complaint not found' });
    }

    res.json(complaint);
  } catch (error) {
    console.error('Error fetching complaint:', error);
    res.status(500).json({ error: 'Failed to fetch complaint' });
  }
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Unhandled error:', err);

  if (err instanceof multer.MulterError) {
    if (err.code === 'LIMIT_FILE_SIZE') {
      return res.status(400).json({ error: 'File too large. Maximum 10MB per file.' });
    }
    return res.status(400).json({ error: err.message });
  }

  res.status(500).json({
    error: 'Internal server error',
    message: err.message,
  });
});

// Serve index.html for all non-API routes (client-side routing)
app.get(/^(?!\/api).*/, (req, res) => {
  res.sendFile(path.join(__dirname, '../../dist/index.html'));
});

// Start server
app.listen(PORT, async () => {
  console.log(`GOTS Complaints API running on http://localhost:${PORT}`);
  console.log('Health check: http://localhost:3000/api/health');
  console.log('Zendesk test: http://localhost:3000/api/zendesk-test\n');

  // Test Zendesk connection
  const zendeskConnected = await testZendeskConnection();
  if (!zendeskConnected) {
    console.warn(
      '⚠️  Warning: Zendesk connection failed. Complaints will be saved to MongoDB but Zendesk tickets won\'t be created.'
    );
  }
});
