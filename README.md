# clint-flow

## Project Name
ClientFlow

## Candidate Name
Monisha

## Selected Track
Selected Track — A: Full Stack (Frontend implemented using LocalStorage)

## Project Overview
ClientFlow is a complete, polished, production-style application built for managing client enquiries and operations. It provides an intuitive dashboard and comprehensive enquiry management features.

## Problem Understanding
Businesses need an efficient way to track client requests, manage enquiries, and visualize key performance indicators. ClientFlow solves this by providing a unified dashboard, detailed enquiry management, and status tracking using local storage for data persistence.

## Features Implemented
- **Dashboard**: High-level overview of enquiries with key metrics and charts.
- **Enquiry Management**: Complete workflow for tracking client requests (View, Add, Edit).
- **Search & Filter**: Powerful search and multi-filtering capabilities across multiple fields.
- **Forms & Validation**: Comprehensive form validation for adding and editing enquiries.
- **State Management**: Robust state handling.
- **Data Persistence**: Local storage implementation for data persistence across sessions.
- **Responsive Design**: Fully responsive layout for Desktop, Tablet, and Mobile devices.

## Technology Stack
- React
- Vite
- JavaScript
- CSS
- React Router
- Lucide React
- LocalStorage

## Architecture / Project Structure
```text
src/
├── assets/         # Static assets
├── components/     # Reusable React components
│   ├── common/     # Generic components (Buttons, Modals, Badges)
│   └── layout/     # Layout components (Sidebar, Header)
├── data/           # Mock data
├── hooks/          # Custom React hooks (useEnquiries)
├── layouts/        # Page layouts (DashboardLayout)
├── pages/          # Page components (Dashboard, Enquiries, etc.)
└── utils/          # Utility functions (Validation, Constants)
```

## Setup Instructions
```bash
# Install dependencies
npm install

# Start Development Server
npm run dev

# Production Build
npm run build

# Preview Production Build
npm run preview
```

## Environment Variables
No environment variables are required. The application uses browser `localStorage`.

## Demo / Hosted URL
[To be added]

## Test Credentials (if applicable)
Not applicable. No login is required to test the application.

## AI Usage Declaration
AI-assisted development was used during implementation, while the final application was reviewed, tested, and modified by the candidate to meet the strict requirements of the assessment.

## Known Limitations
- Data is stored in `localStorage` and will not persist across different browsers or devices.
- No backend database or authentication is implemented.

## Future Improvements
- Implement a real backend API (Node.js/Express) for persistent data storage.
- Add user authentication and role-based access control.
- Implement email notifications for follow-ups.
- Add export functionality for reports.
