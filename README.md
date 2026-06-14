# GOTS Complaints Intake System

A modern, whistleblower-friendly complaints intake system for Global Organic Textile Standard (GOTS). Built with React, Redux, Tailwind CSS, Node.js, MongoDB Atlas, and integrated with Zendesk for ticket management.

## Features

- **7-Step Wizard Interface**: Intuitive step-by-step complaint intake process
- **Five Complaint Categories**: Labor violations, OHS, Environmental, Business ethics, Trademark misuse
- **File Uploads**: Support for up to 5 files per complaint (10MB max, stored in MongoDB GridFS)
- **Zendesk Integration**: Automatic ticket creation from complaints
- **Whistleblower-Friendly**: Clear confidentiality options and identity protection
- **Mobile Responsive**: Works seamlessly on desktop, tablet, and mobile
- **Modern Design**: Following GOTS brand standards with clean, professional UI
- **Motivation Verification**: Filter frivolous reports and business rivalries
- **No AI Token Costs**: Pure client-side logic, no expensive API calls

## Quick Start

### Prerequisites

- Node.js 16+
- MongoDB Atlas account (shared cluster available)
- Zendesk trial or paid account
- Git

### Installation

```bash
# Navigate to project directory
cd GOTS-Complaints

# Install dependencies
npm install
```

### Configuration

1. Copy environment template:
```bash
cp .env.example .env
```

2. Update `.env` with your credentials:
```env
# Server
PORT=3000
NODE_ENV=development

# MongoDB Atlas (shared cluster from GOTS-faq-rahul project)
MONGODB_USER=RahulTrialAdmin
MONGODB_PASSWORD=your_mongodb_password
MONGODB_CLUSTER=gots-trial.jfoz0n7.mongodb.net
MONGODB_DATABASE=gots_complaints
MONGODB_APP_NAME=GOTS-Complaints

# Zendesk Integration
ZENDESK_SUBDOMAIN=gots
ZENDESK_EMAIL=your_email@domain.com
ZENDESK_API_TOKEN=your_api_token

# File Upload
MAX_FILE_SIZE=10485760
MAX_FILES_PER_COMPLAINT=5
```

### Development

```bash
# Start dev server (Vite frontend + Express backend)
npm run dev
```

- Frontend: http://localhost:5173
- Backend API: http://localhost:3000

### Production Build

```bash
# Build frontend
npm run build
```

Output goes to `dist/` directory. Deploy to any static host (Netlify, Vercel, S3, etc.).

## Project Structure

```
src/
├── components/
│   ├── steps/              # 7 wizard step components
│   │   ├── Step1Welcome.jsx
│   │   ├── Step2Category.jsx
│   │   ├── Step3Questions.jsx    # Category-specific Q&A
│   │   ├── Step4FileUpload.jsx   # Evidence upload
│   │   ├── Step5ContactInfo.jsx
│   │   ├── Step6Confidentiality.jsx
│   │   └── Step7Review.jsx
│   ├── Header.jsx
│   ├── Footer.jsx
│   ├── ComplaintsWizard.jsx      # Main wizard logic
│   ├── StepIndicator.jsx         # Progress tracking
│   └── SuccessMessage.jsx
├── redux/
│   ├── store.js                  # Redux configuration
│   └── slices/
│       └── complaintSlice.js     # Complaint state management
├── server/
│   ├── server.js                 # Express API
│   ├── db.js                     # MongoDB + GridFS
│   └── zendesk.js                # Zendesk integration
├── styles/
│   └── index.css                 # Tailwind + custom styles
└── main.jsx                      # React entry point
```

## The 7-Step Wizard

### Step 1: Welcome
- Introduction emphasizing whistleblower protection
- Overview of process and confidentiality options

### Step 2: Category Selection
- Choose from 5 complaint types with icons and descriptions
- Visual category cards for easy selection

### Step 3: Category-Specific Questions
- Dynamically shown questions based on selected category
- Mix of textarea, text input, and dropdown questions
- Visual cards with icons for each question
- Real-time validation

### Step 4: File Upload
- Drag-and-drop interface
- Multiple file support (max 5 files, 10MB each)
- Supported formats: JPG, PNG, GIF, PDF, DOCX, XLSX, TXT
- Mandatory step (at least 1 file required)
- GridFS storage for reliability

### Step 5: Contact Information
- Email address (required)
- Name (optional)
- Organization (optional)
- Email validation

### Step 6: Privacy & Verification
- Confidentiality options (public or confidential)
- Motivation verification:
  - Employee
  - Contractor/Supplier
  - Customer/Consumer
  - Community stakeholder
  - External observer
- Filters business rivalries from genuine concerns

### Step 7: Review & Submit
- Full complaint summary
- Confirmation of all details
- Submit button with error handling
- Success message on completion

## Complaint Categories & Questions

### Labor Violations
- Excessive overtime
- Wage/compensation issues
- Discrimination or harassment
- Forced labor suspicions

### Health & Safety (OHS)
- Type of hazard observed
- Work-related injuries
- Reporting status
- Specific location

### Environmental Issues
- Violation description
- Location
- Environmental impact
- Evidence availability

### Business Ethics & Corruption
- Violation description
- Parties involved
- Beneficiaries
- Documentation

### Trademark/Logo Misuse
- Brand/product name
- Misuse description
- Discovery location
- Evidence availability

## Database Schema

### Complaints Collection
```javascript
{
  _id: ObjectId,
  category: String,              // "labor" | "ohs" | "environmental" | "ethics" | "trademark"
  email: String,                 // Required, validated
  name: String,                  // Optional
  organization: String,          // Optional
  confidential: Boolean,         // Identity protection flag
  answers: Object,               // Category-specific answers
  fileCount: Number,             // Number of uploaded files
  fileNames: Array,              // Original filenames
  ipAddress: String,             // For spam detection
  submittedAt: Date,            // Submission timestamp
  status: String                 // "submitted" | "reviewed" | "investigating"
}
```

### Files (GridFS Storage)
Files are stored separately in GridFS with metadata linking to complaint ID:
```javascript
{
  filename: String,
  complaintId: ObjectId,
  mimeType: String,
  uploadedAt: Date,
  size: Number
}
```

## API Endpoints

### Public Endpoints

- **POST** `/api/complaints` - Submit a new complaint
  - Body: `multipart/form-data`
  - Fields: category, email, name, organization, confidential, answers, files
  - Returns: complaintId, zendesk (if created)

- **GET** `/api/health` - Health check
  - Returns: API status

- **GET** `/api/zendesk-test` - Test Zendesk connection
  - Returns: Connection status

### Protected Endpoints (Admin - Future)

- **GET** `/api/complaints/:id` - Retrieve complaint details
- **PUT** `/api/complaints/:id` - Update complaint status
- **GET** `/api/complaints` - List all complaints (with filtering)

## Zendesk Integration

When a complaint is submitted:

1. **Stored in MongoDB** immediately (guaranteed)
2. **Zendesk ticket created** with:
   - Complaint category and details
   - Complainant email
   - Confidentiality flag
   - All answers formatted for readability
   - Link back to MongoDB ID

3. **Graceful fallback**: If Zendesk fails, complaint still saves to MongoDB

### Zendesk Setup

1. Create a free Zendesk trial account
2. Go to **Admin** → **Apps and Integrations** → **APIs** → **Zendesk API**
3. **Enable** "Allow API token access"
4. Create a new API token
5. Add to `.env`:
   ```env
   ZENDESK_SUBDOMAIN=your_subdomain
   ZENDESK_EMAIL=your_email
   ZENDESK_API_TOKEN=your_token
   ```

## Design Standards

Follows GOTS brand guidelines as documented in `/ClaudeCode/README.md`:

- **Colors**: GOTS green, dark gray, white, light gray
- **Typography**: System font stack with proper hierarchy
- **Responsive**: Mobile-first, tested on 320px - 1920px
- **Accessibility**: WCAG AA compliance
  - Color contrast ≥4.5:1
  - Focus indicators visible
  - Keyboard navigation support
  - Semantic HTML

See `/ClaudeCode/README.md` for complete design specifications.

## Technologies

- **Frontend**: React 18, Redux Toolkit, Tailwind CSS, Vite
- **Backend**: Node.js, Express
- **Database**: MongoDB Atlas
- **File Storage**: MongoDB GridFS
- **Integrations**: Zendesk API
- **Build**: Vite
- **Styling**: Tailwind CSS v4

## Performance

- **First Load**: < 1s (Vite)
- **Form Submit**: < 2s (API + MongoDB + Zendesk)
- **File Upload**: 5MB file ≈ 1s (depends on connection)
- **Database**: MongoDB Atlas free tier (512MB)

## Browser Support

- Chrome/Edge: Latest
- Firefox: Latest
- Safari: Latest
- Mobile browsers: iOS Safari, Chrome Mobile
- Minimum: ES2020 support

## Security

- ✅ Environment variables for all secrets (never committed)
- ✅ File type validation (whitelist of allowed formats)
- ✅ File size limits enforced (10MB per file)
- ✅ Input validation and sanitization
- ✅ CORS protection
- ✅ MongoDB Atlas IP whitelisting
- ✅ GridFS for secure file storage
- ✅ No sensitive data in client-side code

## Troubleshooting

### "Cannot connect to MongoDB"
- Verify credentials in `.env`
- Check IP whitelist in MongoDB Atlas
- Ensure password special characters are URL-encoded
- Test with: `npm run test-mongo`

### "Zendesk integration failing"
- Verify API token is correct and active
- Ensure "Allow API token access" is enabled in Zendesk
- Check email matches the account that created the token
- Test with: `curl -u "email/token:api_token" https://subdomain.zendesk.com/api/v2/users/me.json`

### "File upload not working"
- Check file size (max 10MB)
- Verify file type is in whitelist (JPG, PNG, GIF, PDF, DOCX, XLSX, TXT)
- Ensure MongoDB GridFS is initialized
- Check browser console for errors

### "Frontend won't load"
- Verify Vite is running on port 5173
- Check for port conflicts: `lsof -i :5173`
- Clear browser cache
- Try different browser

## Deployment

### Frontend (Vite Build)

```bash
npm run build
# Output: dist/
```

Deploy `dist/` to:
- Netlify (auto-deploy from git)
- Vercel
- AWS S3 + CloudFront
- Any static hosting

### Backend (Express + MongoDB)

```bash
NODE_ENV=production npm run server
```

Deploy to:
- Render
- Railway
- Heroku
- AWS EC2
- DigitalOcean
- Any Node.js host

Make sure to set all environment variables in production.

## Testing

### Integration Test

```bash
node test-full-integration.js
```

Tests MongoDB, Zendesk, and API endpoint all together.

### Manual Testing Checklist

- [ ] Fill form through all 7 steps
- [ ] Submit complaint
- [ ] Verify in MongoDB
- [ ] Check Zendesk ticket created
- [ ] Download and view files in Zendesk
- [ ] Test on mobile browser
- [ ] Test file upload with drag-drop
- [ ] Test with all 5 complaint categories

## Future Enhancements

- [ ] Multi-language support (Hindi, Turkish, Tamil)
- [ ] Email notifications on status updates
- [ ] Complaint tracking dashboard
- [ ] Admin review interface
- [ ] Bulk complaint import
- [ ] Advanced filtering and search
- [ ] Compliance report generation
- [ ] Mobile app (React Native)
- [ ] Two-factor authentication
- [ ] Encrypted file storage

## Scripts

```bash
npm run dev          # Start dev server (Vite + Express)
npm run server       # Backend only
npm run build        # Production build
npm run preview      # Preview production build
```

## Environment Variables

See `.env.example` for complete list. Required:

```env
MONGODB_USER
MONGODB_PASSWORD
MONGODB_CLUSTER
MONGODB_DATABASE
ZENDESK_SUBDOMAIN
ZENDESK_EMAIL
ZENDESK_API_TOKEN
```

## Contributing

1. Create feature branch: `git checkout -b feature/my-feature`
2. Commit changes: `git commit -am 'Add feature'`
3. Push to branch: `git push origin feature/my-feature`
4. Open pull request

## License

Internal GOTS Project - All rights reserved

## Support

For issues and questions:
- Check existing documentation in this README
- Review `/ClaudeCode/README.md` for design standards
- Check browser console for client-side errors
- Review server logs for backend errors
- Test MongoDB connection separately

## Version History

- **1.0.0** (2026-06-14): Initial release
  - 7-step wizard interface
  - 5 complaint categories
  - File upload with GridFS
  - Zendesk integration
  - MongoDB storage
  - GOTS brand compliance

---

**Last Updated**: 2026-06-14  
**Status**: Production Ready  
**Maintainer**: GOTS Team
