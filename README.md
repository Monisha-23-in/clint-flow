# ClientFlow - CRM & Enquiry Management System

## ☑️ Project Details
- **Project Name:** ClientFlow
- **Candidate Name:** Monisha BR
- **Selected Track:** Track A - Full Stack (Frontend Implementation)

---

## 📌 Project Overview
ClientFlow is a production-grade, highly responsive Customer Relationship Management (CRM) and Enquiry Management application. Designed with a clean, minimal, and realistic UI, it empowers businesses to track client requests, manage sales pipelines, and visualize key performance indicators (KPIs) through an intuitive dashboard. 

## 🎯 Problem Understanding
Businesses often struggle to maintain visibility over their sales pipeline, leading to missed follow-ups, scattered client data, and inefficient lead tracking. ClientFlow solves this by providing a unified, centralized dashboard that tracks the entire lifecycle of a client enquiry—from the initial lead generation to the final deal closure—ensuring no opportunity is lost.

---

## ✨ Features Implemented

### 1. Interactive Dashboard
- **Real-time Metrics:** Tracks Total Enquiries, Active Pipeline, Win Rate, and Total Pipeline Value.
- **Data Visualization:** Includes dynamic Bar charts and Donut charts mapping leads by Status and Source.
- **AI Insights & Targets:** Displays smart insights (e.g., overdue follow-ups) and monthly target progress bars.

### 2. Comprehensive Enquiry Management
- **CRUD Operations:** Seamlessly Add, View, Edit, and Manage client enquiries.
- **Detailed View:** Dedicated page for each enquiry displaying Client Profile, Requirement Description, Activity Log, and Follow-up schedules.
- **Status Workflows:** Move leads through stages (New, In Progress, Qualified, Won, Lost).

### 3. Advanced Search & Multi-Filtering
- Instantly search clients by name or service.
- Multi-select filters for Status, Lead Source, and Assigned Team Members.
- Real-time table updates based on applied filters.

### 4. Robust Forms & Validation
- Comprehensive controlled forms for adding/editing enquiries.
- Strict validation rules preventing empty fields and enforcing proper data formats.
- Visual error states and loading states.

### 5. UI/UX & Responsive Design
- **Human-Centric Design:** Built with a minimal, clean, and professional Light Mode SaaS theme (utilizing CSS variables).
- **Mobile-First Responsiveness:** Fully responsive across Mobile, Tablet, and Desktop using a custom Flexbox/Grid system and Bootstrap Grid integrations.
- **Interactive States:** Smooth hover effects, transitions, and active navigation states.

### 6. Local Storage Data Persistence
- Custom React Hooks handle data synchronization with browser `localStorage`, ensuring data persists across page reloads without needing a backend server.

---

## 💻 Technology Stack
- **Framework:** React 18 (Vite)
- **Language:** JavaScript (ES6+)
- **Styling:** Custom CSS3 (CSS Variables for Theming) + Bootstrap Grid (`bootstrap-grid.min.css`)
- **Routing:** React Router v6
- **Icons:** Lucide React
- **State Management:** Custom React Hooks + LocalStorage API

---

## 🏗️ Architecture & Project Structure
The codebase follows a scalable, modular architecture separating logic from presentation:

```text
src/
├── assets/         # Static images and icons
├── components/     # Reusable UI components
│   ├── common/     # Buttons, Modals, Badges, Loaders, Charts
│   └── layout/     # Sidebar, Header, Navigation
├── data/           # Mock initial data and schema definitions
├── hooks/          # Custom Hooks (useEnquiries.js for LocalStorage sync)
├── layouts/        # Parent layouts (DashboardLayout)
├── pages/          # Core views (Dashboard, Enquiries, Settings, etc.)
├── utils/          # Helper functions (Validation, Formatting, Constants)
├── App.jsx         # App routing and layout configuration
└── index.css       # Global design system, tokens, and responsive utilities
```

---

## 🚀 Setup Instructions

Follow these steps to run the project locally on your machine:

```bash
# 1. Clone the repository
git clone https://github.com/Monisha-23-in/clint-flow.git

# 2. Navigate to the project directory
cd clint-flow

# 3. Install NPM dependencies
npm install

# 4. Start the Development Server
npm run dev
```
*The app will automatically open in your browser at `http://localhost:5173`.*

### Production Build
```bash
npm run build
npm run preview
```

---

## 🔐 Environment Variables
No environment variables (`.env`) are required to run this application. All data operations are strictly handled client-side using browser `localStorage`.

---

## 🌐 Demo / Hosted URL
*(Add your Vercel or Netlify link here after deployment)*
**Live Demo:** `[Insert Deployment URL]`

---

## 🔑 Test Credentials (if applicable)
**Not applicable.** No authentication gateway is required to test the application. Users have immediate access to the dashboard.

---

## 🤖 AI Usage Declaration
AI tools were utilized during the development process to assist with scaffolding boilerplate code, debugging complex React layout issues, and optimizing CSS Grid/Flexbox structures. All AI-generated logic was rigorously reviewed, heavily refactored, and tested manually by the candidate to ensure it met the strict requirements of a professional, non-AI-generated-looking minimal UI.

---

## ⚠️ Known Limitations
- **Data Persistence:** Because the app uses `localStorage`, data is tied to the specific browser and device being used. Clearing browser data will reset the application.
- **Authentication:** There is no user authentication or role-based access control (Admin vs. Employee).
- **Backend Absence:** All "backend" logic is simulated on the client side.

---

## 🔮 Future Improvements
1. **Backend Integration:** Migrate data storage to a Node.js/Express backend with a MongoDB/PostgreSQL database.
2. **Authentication:** Implement Firebase or NextAuth for secure user logins.
3. **Export Functionality:** Enable CSV/PDF exports for reports and enquiries tables.
4. **Email Notifications:** Integrate a service like SendGrid to alert team members of urgent follow-ups.
