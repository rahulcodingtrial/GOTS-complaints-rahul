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

export async function createZendeskTicket(complaint) {
  try {
    console.log('Creating Zendesk ticket for complaint...');

    const answers = complaint.answers || {};
    const answersSummary = Object.entries(answers)
      .map(([key, value]) => `${formatKey(key)}: ${value}`)
      .join('\n\n');

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

    const ticketPayload = {
      ticket: {
        subject: `[${CATEGORY_NAMES[complaint.category]}] New Complaint Report`,
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

    const response = await zendeskClient.post('/tickets.json', ticketPayload);

    const ticketId = response.data.ticket.id;
    console.log(`✓ Zendesk ticket created: #${ticketId}`);

    return {
      success: true,
      ticketId,
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
