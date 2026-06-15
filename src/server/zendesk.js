import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

const ZENDESK_SUBDOMAIN = process.env.ZENDESK_SUBDOMAIN;
const ZENDESK_EMAIL = process.env.ZENDESK_EMAIL;
const ZENDESK_API_TOKEN = process.env.ZENDESK_API_TOKEN;

const ZENDESK_API_URL = `https://${ZENDESK_SUBDOMAIN}.zendesk.com/api/v2`;

const zendeskClient = axios.create({
  baseURL: ZENDESK_API_URL,
  auth: {
    username: `${ZENDESK_EMAIL}/token`,
    password: ZENDESK_API_TOKEN,
  },
  headers: {
    'Content-Type': 'application/json',
  },
});

const CATEGORY_NAMES = {
  labor: 'Labor Violations',
  ohs: 'Health & Safety (OHS)',
  environmental: 'Environmental Issues',
  ethics: 'Business Ethics & Corruption',
  trademark: 'Trademark/Logo Misuse',
};

export async function createZendeskTicket(complaint, files = []) {
  try {
    console.log('Creating Zendesk ticket for complaint...');

    const answers = complaint.answers || {};
    const answersSummary = Object.entries(answers)
      .map(([key, value]) => `${formatKey(key)}: ${value}`)
      .join('\n\n');

    // Extract key issue (first significant answer) for subject line
    const keyIssuesByCategory = {
      labor: 'overtime',
      ohs: 'hazard_type',
      environmental: 'violation_type',
      ethics: 'violation_type',
      trademark: 'violation_type',
    };

    const keyField = keyIssuesByCategory[complaint.category];
    const keyIssue = keyField && answers[keyField]
      ? answers[keyField].split('\n')[0].substring(0, 60) // First line, max 60 chars
      : 'Complaint Received';

    const organizationName = complaint.organization || 'Anonymous';
    const subjectLine = `[${CATEGORY_NAMES[complaint.category]}] ${keyIssue} - ${organizationName}`;

    const description = `
**Complaint Category:** ${CATEGORY_NAMES[complaint.category]}
**Submitted By:** ${complaint.confidential ? '(Confidential)' : complaint.name || 'Anonymous'}
**Organization:** ${complaint.organization || 'Not provided'}
**Email:** ${complaint.email}
**IP Address:** ${complaint.ipAddress}
**Files Uploaded:** ${complaint.fileCount || 0}

---

**COMPLAINT DETAILS:**

${answersSummary}

---

**Confidentiality:** ${complaint.confidential ? 'Yes - Identity to be kept confidential' : 'No - Can be identified'}
**Database ID:** ${complaint._id}
    `.trim();

    // Upload files to Zendesk first if available
    const uploadTokens = [];
    if (files && files.length > 0) {
      console.log(`Uploading ${files.length} files to Zendesk...`);
      for (const file of files) {
        try {
          const uploadResponse = await axios.post(
            `https://${ZENDESK_SUBDOMAIN}.zendesk.com/api/v2/uploads.json?filename=${encodeURIComponent(file.originalname)}`,
            file.buffer,
            {
              auth: {
                username: `${ZENDESK_EMAIL}/token`,
                password: ZENDESK_API_TOKEN,
              },
              headers: {
                'Content-Type': file.mimetype || 'application/octet-stream',
              },
            }
          );
          uploadTokens.push(uploadResponse.data.upload.token);
          console.log(`✓ Uploaded file: ${file.originalname}`);
        } catch (fileError) {
          console.warn(
            `⚠️  Failed to upload file ${file.originalname}:`,
            fileError.response?.status || fileError.message
          );
        }
      }
    }

    // Build ticket payload with comment containing attachments
    const ticketPayload = {
      ticket: {
        subject: subjectLine,
        description,
        priority: 'normal',
        tags: [
          complaint.category,
          complaint.confidential ? 'confidential' : 'public',
        ],
        custom_fields: [
          {
            id: 'complaint_category',
            value: complaint.category,
          },
          {
            id: 'complainant_email',
            value: complaint.email,
          },
          {
            id: 'complaint_confidential',
            value: complaint.confidential ? 'yes' : 'no',
          },
        ],
      },
    };

    // Add files as a comment with attachments if files were uploaded
    if (uploadTokens.length > 0) {
      ticketPayload.ticket.comment = {
        body: `Complaint evidence files attached (${uploadTokens.length} file${uploadTokens.length > 1 ? 's' : ''}).`,
        uploads: uploadTokens,
      };
    }

    const response = await zendeskClient.post('/tickets.json', ticketPayload);

    const ticketId = response.data.ticket.id;
    console.log(`✓ Zendesk ticket created: #${ticketId}`);
    if (uploadTokens.length > 0) {
      console.log(`✓ ${uploadTokens.length} file(s) attached to ticket`);
    }

    return {
      success: true,
      ticketId,
      filesAttached: uploadTokens.length,
      zendeskUrl: `https://${ZENDESK_SUBDOMAIN}.zendesk.com/agent/tickets/${ticketId}`,
    };
  } catch (error) {
    console.error('Error creating Zendesk ticket:', error.message);
    if (error.response?.data) {
      console.error('Zendesk error details:', error.response.data);
    }
    throw error;
  }
}

export async function testZendeskConnection() {
  try {
    console.log('Testing Zendesk connection...');
    const response = await zendeskClient.get('/users/me.json');
    console.log(`✓ Connected to Zendesk as: ${response.data.user.email}`);
    return true;
  } catch (error) {
    console.error('✗ Failed to connect to Zendesk:', error.message);
    return false;
  }
}

function formatKey(key) {
  return key
    .replace(/_/g, ' ')
    .split(' ')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}
