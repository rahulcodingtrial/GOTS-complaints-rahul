# GOTS Complaints Project - Complete Prompt History

**Project Owner:** Rahul Bhajekar (Global Standard)  
**Email:** bhajekar@global-standard.org  
**Project Start Date:** 2026-06-14  
**Status:** Production Ready  
**Last Updated:** 2026-06-15

---

## Table of Contents
1. [Initial Vision & Problem Statement](#initial-vision)
2. [Design & Technology Decisions](#design-decisions)
3. [Development Iterations](#development-iterations)
4. [Integration & Testing](#integration-testing)
5. [Production Deployment](#production-deployment)
6. [Final Refinements](#final-refinements)

---

## Initial Vision & Problem Statement

### Prompt 1: Project Overview
**Date:** 2026-06-14  
**Request:** Define the complaints system and its challenges

**Summary:**
- Current system is not user-friendly with too many fields
- Mandatory requirements are unclear
- English-only, needs support for Hindi, Turkish, Tamil
- System designed for trademark violations only, but needs to handle whistleblower issues:
  - Excess overtime (labor)
  - OHS (occupational health & safety)
  - Environmental violations
  - Poor business ethics
  - Labor law violations
- Not mobile-friendly, needs modern design
- Needs to be less form-like, more conversational
- Concerned about AI token costs - needs alternative

**Challenges Identified:**
- Receives many "mickey mouse" complaints from @gmail.com addresses (business rivalries)
- Need authentication to verify genuine complainants without AI costs
- Need to clearly communicate that identities can be kept confidential
- Complainants must identify themselves and their "motives"

### Prompt 2: Technology Stack & Approach
**Date:** 2026-06-14  
**Request:** Propose implementation approach given constraints

**Decisions Made:**
- **Frontend:** React, Redux, Tailwind CSS
- **Backend:** Node.js, Express
- **Database:** MongoDB (shared cluster from GOTS-faq-rahul project)
- **Integrations:** Zendesk (for ticket management)
- **Deployment:** Single server (not multi-service)
- **No AI chatbot:** Use step-by-step wizard instead (pure JavaScript logic)
- **Multi-language:** Defer for now, start with English
- **Authentication:** Email collection only, no fancy OAuth

### Prompt 3: Design & Compliance Standards
**Date:** 2026-06-14  
**Request:** Create GOTS-wide CSS/design standards document

**Output:** `/ClaudeCode/README.md`  
**Content:**
- Brand colors (green #10B981, dark gray, white)
- Typography (system font stack)
- Responsive breakpoints (mobile-first)
- Accessibility standards (WCAG AA)
- Layout patterns (header, footer, grid, spacing)
- Form design guidelines

---

## Design Decisions

### Prompt 4: Five Complaint Categories
**Date:** 2026-06-14  
**Request:** Finalize complaint categories and scope

**Categories Agreed:**
1. **Labor Violations:** Excess overtime, wage theft, discrimination, forced labor
2. **Health & Safety (OHS):** Unsafe conditions, lack of PPE, injuries
3. **Environmental Issues:** Pollution, waste, ecological damage
4. **Business Ethics & Corruption:** Bribery, fraud, misconduct
5. **Trademark/Logo Misuse:** GOTS logo unauthorized use, false certifications

### Prompt 5: 7-Step Wizard Flow
**Date:** 2026-06-14  
**Request:** Design complaint intake flow

**Steps Designed:**
1. **Step 1 - Welcome:** Whistleblower assurance, process overview
2. **Step 2 - Category Selection:** 5 category buttons with icons
3. **Step 3 - Category-Specific Questions:** 4 questions per category
4. **Step 4 - File Upload:** Mandatory, 5 files max, 10MB each
5. **Step 5 - Contact Info:** Email (required), name/org (optional)
6. **Step 6 - Privacy & Verification:** Confidentiality choice + motivation verification
7. **Step 7 - Review & Submit:** Full summary confirmation

### Prompt 6: Filtering Frivolous Complaints
**Date:** 2026-06-14  
**Request:** Design authentication to prevent spam

**Solution Implemented:**
- Motivation verification (Step 6):
  - Employee/Contractor/Customer/Community member/External observer
  - Distinguishes genuine concerns from business rivalries
- Email requirement (mandatory)
- Confidentiality options (build trust)
- No AI token costs (pure JavaScript conditional logic)

### Prompt 7: File Upload Strategy
**Date:** 2026-06-14  
**Request:** Determine file upload approach

**Specifications:**
- **Storage:** MongoDB GridFS (no external services)
- **Max per complaint:** 5 files
- **Max file size:** 10MB per file
- **Allowed types:** JPG, PNG, GIF, PDF, DOCX, XLSX, TXT
- **Mandatory:** At least 1 file required for submission
- **Integration:** Files attached to Zendesk tickets

---

## Development Iterations

### Prompt 8: Project Setup & Initial Build
**Date:** 2026-06-14  
**Request:** Initialize React project with Vite, Express, MongoDB

**Outcome:**
- Created Vite + React project
- Set up Express backend
- Connected MongoDB Atlas (shared cluster)
- Created Redux store with complaint state
- Built 7 wizard steps with styling
- Established file upload infrastructure

### Prompt 9: Form Design Improvement
**Date:** 2026-06-14  
**Request:** Make form less "boring", more visually engaging

**Changes Made:**
- Added icons to each question (emoji-based)
- Created card-based layout (2-column grid)
- Added visual confirmation (✓ Answered status)
- Improved typography hierarchy
- Better spacing and visual breathing room
- Hover effects on cards

**Result:** Form retained all 4 questions visible at once but felt modern and engaging

### Prompt 10: Conversational vs. Form Comparison
**Date:** 2026-06-14  
**Request:** Create alternative one-question-at-a-time interface for testing

**Decision:** User preferred form version (all questions visible at once)

**Action:** Removed conversational version from codebase

### Prompt 11: Multi-Language Deferral
**Date:** 2026-06-14  
**Request:** Plan multi-language support (Hindi, Turkish, Tamil)

**Decision:** Defer for MVP, implement with i18next later if needed

---

## Integration & Testing

### Prompt 12: MongoDB Connection Setup
**Date:** 2026-06-14  
**Request:** Reuse MongoDB from GOTS-faq-rahul project

**Solution:**
- Located shared MongoDB Atlas cluster
- Created separate `gots_complaints` database
- Implemented GridFS for file storage
- Created test script to verify connection

### Prompt 13: Zendesk Integration - Initial Attempt
**Date:** 2026-06-14  
**Request:** Integrate with Zendesk to auto-create tickets

**Initial Challenge:** File uploads failing with 401 Zendesk authentication errors

**Debugging Process:**
1. Verified API token format
2. Checked Zendesk trial account limitations
3. Found that "Allow API token access" setting wasn't enabled
4. Updated authentication format multiple times
5. Tested with curl commands

### Prompt 14: Zendesk File Upload Issue
**Date:** 2026-06-14  
**Request:** Debug why files weren't attaching to tickets

**Investigation:**
- File uploads to Zendesk working (getting valid tokens)
- But files not appearing in tickets
- Tested multiple API approaches

**Solution Found:** Gemini suggestion to put files in comment object instead of ticket root

**Implementation:**
- Files now attached as comment: `{ticket: {comment: {uploads: [tokens]}}}`
- Files visible in Zendesk ticket comments
- Verified via API that attachments are present

### Prompt 15: Full Integration Testing
**Date:** 2026-06-14  
**Request:** Create comprehensive integration test

**Test Scope:**
- MongoDB storage
- Zendesk ticket creation
- File upload and attachment
- API endpoint health

**Result:** ✅ All systems working correctly

---

## Production Deployment

### Prompt 16: Single vs. Dual Server Architecture
**Date:** 2026-06-15  
**Request:** Should we run frontend and backend on separate servers?

**User Decision:** "Can we combine the front and back ends? I do not want two servers."

**Implementation:**
- Modified Express to serve built React frontend as static files
- Frontend builds to `dist/` directory
- Express serves `dist/` + API routes from same port (3000)
- Updated vite.config.js and package.json scripts

**Result:** Single server deployment model in production

### Prompt 17: Production Build Testing
**Date:** 2026-06-15  
**Request:** Test production build before pushing

**Testing Checklist:**
- ✅ Frontend loads on port 3000
- ✅ API endpoints responding
- ✅ Zendesk connection working
- ✅ Complaint submission working end-to-end
- ✅ Files uploaded and attached to Zendesk
- ✅ Dev mode still working (npm run dev)

### Prompt 18: GitHub Repository Creation
**Date:** 2026-06-15  
**Request:** Create and push to GitHub

**Repository:** https://github.com/rahulcodingtrial/GOTS-complaints-rahul

**Initial Commit:** Included all project files and comprehensive README

### Prompt 19: Email Configuration for .env
**Date:** 2026-06-15  
**Request:** Use correct Zendesk email (rahulcodingtrial+zendesk@gmail.com)

**Issue Found:** Using wrong email in .env initially

**Resolution:** Updated .env with correct email via git amend

---

## Final Refinements

### Prompt 20: Zendesk Subject Line Improvement
**Date:** 2026-06-15  
**Request:** Change generic "New Complaint Report" to descriptive titles

**Original:** `[Labor Violations] New Complaint Report`  
**Improved:** `[Labor Violations] Workers forced to work 14 hour shifts - Manufacturing Corp`

**Implementation:**
- Extract first key issue from complaint answers
- Include organization name
- Format: `[Category] Key Issue - Organization`

### Prompt 21: Combine Frontend and Backend Servers
**Date:** 2026-06-15  
**Request:** Deploy as single server, not two

**Changes Made:**
1. Modified `src/server/server.js` to serve static frontend
2. Updated package.json with `npm start` for production
3. Fixed catch-all route for client-side routing
4. Tested in both dev and production modes

### Prompt 22: File Attachment Fix
**Date:** 2026-06-15  
**Request:** Fix files not appearing in Zendesk tickets

**Root Cause:** Files were being uploaded but not properly attached

**Solution (via Gemini):**
- Move `uploads` field from ticket root to comment object
- Create implicit comment with files on ticket creation
- Files now visible in ticket comments

### Prompt 23: Documentation for IT Handoff
**Date:** 2026-06-15  
**Request:** Update README for IT team to take over deployment

**Content Added:**
- Single-server deployment instructions
- Zendesk setup checklist
- Environment variable documentation
- Deployment options (Render, Railway, self-hosted)
- Troubleshooting guide
- Maintenance tasks
- Performance metrics
- Testing procedures

---

## Key Decision Log

### Architecture Decisions
| Decision | Original | Chosen | Reason |
|----------|----------|--------|--------|
| Multi-language | Plan for it | Defer to MVP | Cost & complexity; English sufficient for launch |
| Conversational UI | Chatbot with AI | Step wizard | Avoid token costs; better UX with forms |
| Frontend/Backend | Two separate servers | Single server | Simpler deployment, one port, easier maintenance |
| File Storage | Cloud (S3, etc) | MongoDB GridFS | No external infrastructure; integrated with existing DB |
| File Attachments | Direct to ticket | In comment | Zendesk API limitation; files visible in comments |

### Technical Decisions
| Component | Option A | Option B (Chosen) | Trade-off |
|-----------|----------|-------------------|-----------|
| State Management | Context API | Redux | More boilerplate, but better for complex form state |
| Styling | CSS-in-JS | Tailwind CSS | Less flexibility, but faster development |
| Form Validation | Real-time | Step-by-step | Better UX for wizards; clear error states |
| API Auth | OAuth | Email collection | Simpler for whistleblowers; less friction |
| Complaint Filtering | Complex AI | Motivation questions | No token costs; still effective at filtering |

---

## Lessons & Recommendations for Future Work

### What Worked Well
1. **Step-by-step wizard approach** — Reduced form abandonment vs. long forms
2. **Category-specific questions** — Prevents information overload
3. **File upload with visual feedback** — Users understand importance
4. **Redux for state management** — Complex form state handled cleanly
5. **Zendesk integration** — Automatic ticket creation reduces manual work
6. **Single server deployment** — Much simpler operations and infrastructure

### Areas for Future Enhancement
1. **Multi-language support** — Use i18next (defer to v1.1)
2. **Admin dashboard** — Review and investigate complaints
3. **Email notifications** — Status updates to complainants
4. **Analytics** — Track complaint types, volume, resolution rates
5. **Advanced search** — Find complaints by keywords, date range
6. **Compliance reports** — Export for audits and legal holds
7. **Two-factor authentication** — For admin accounts
8. **Complaint templates** — Pre-filled fields for similar cases

### Operational Recommendations
1. **Monitor MongoDB storage** — Free tier has 512MB limit
2. **Set Zendesk alerts** — For high-volume complaint days
3. **Regular backups** — Database snapshots monthly
4. **Security audit** — Review IP whitelist, API tokens quarterly
5. **User feedback loop** — Survey complainants on form usability
6. **Translation strategy** — Hire native speakers vs. automated tools
7. **Performance monitoring** — Track API response times, file upload speeds

---

## Technology Stack Summary

**Frontend:**
- React 18
- Redux Toolkit
- Tailwind CSS v4
- Vite

**Backend:**
- Node.js
- Express
- MongoDB Atlas
- GridFS (file storage)

**Integrations:**
- Zendesk API
- MongoDB Atlas

**Deployment:**
- Single server (Express serves React + API)
- Port: 3000 (production), 3000 (backend) + 5173 (frontend in dev)

---

## Repository & Access

**GitHub:** https://github.com/rahulcodingtrial/GOTS-complaints-rahul  
**Branch:** master  
**Clone Command:**
```bash
git clone https://github.com/rahulcodingtrial/GOTS-complaints-rahul.git
```

**Deployment:**
```bash
npm install
npm run build
npm start
```

---

## Contact & Support

**Project Owner:** Rahul Bhajekar  
**Email:** bhajekar@global-standard.org  
**Brother's Tech Help:** Not available in future (independent operation required)  
**IT Handoff:** See README.md for IT team setup and maintenance guide

---

**Document Created:** 2026-06-15  
**Version:** 1.0  
**Status:** Complete & Ready for Reference
