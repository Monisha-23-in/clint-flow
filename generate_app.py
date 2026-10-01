import os

files = {
    "src/index.css": """
:root {
  --primary-color: #2563eb;
  --primary-hover: #1d4ed8;
  --secondary-color: #64748b;
  --background-color: #f8fafc;
  --card-bg: #ffffff;
  --text-main: #0f172a;
  --text-muted: #64748b;
  --border-color: #e2e8f0;
  --danger: #ef4444;
  --success: #22c55e;
  --warning: #eab308;
  
  --radius-md: 8px;
  --radius-lg: 12px;
  --shadow-sm: 0 1px 2px 0 rgb(0 0 0 / 0.05);
  --shadow-md: 0 4px 6px -1px rgb(0 0 0 / 0.1);
  --shadow-lg: 0 10px 15px -3px rgb(0 0 0 / 0.1);
}

* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

body {
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
  background-color: var(--background-color);
  color: var(--text-main);
  line-height: 1.5;
}

a {
  text-decoration: none;
  color: inherit;
}

ul {
  list-style: none;
}

input, select, textarea, button {
  font-family: inherit;
}

/* Layout */
.dashboard-layout {
  display: flex;
  min-height: 100vh;
}

.main-content {
  flex: 1;
  display: flex;
  flex-direction: column;
  min-width: 0;
}

.page-content {
  padding: 24px;
  flex: 1;
  overflow-y: auto;
}

/* Sidebar */
.sidebar {
  width: 260px;
  background-color: var(--card-bg);
  border-right: 1px solid var(--border-color);
  display: flex;
  flex-direction: column;
  transition: transform 0.3s ease;
}

.sidebar-header {
  padding: 24px;
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--primary-color);
  border-bottom: 1px solid var(--border-color);
  display: flex;
  align-items: center;
  gap: 12px;
}

.sidebar-nav {
  padding: 24px 12px;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.nav-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 16px;
  border-radius: var(--radius-md);
  color: var(--text-muted);
  font-weight: 500;
  transition: all 0.2s;
}

.nav-item:hover {
  background-color: var(--background-color);
  color: var(--text-main);
}

.nav-item.active {
  background-color: #eff6ff;
  color: var(--primary-color);
}

/* Header */
.header {
  height: 72px;
  background-color: var(--card-bg);
  border-bottom: 1px solid var(--border-color);
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 24px;
}

.header-title {
  font-size: 1.25rem;
  font-weight: 600;
}

.header-subtitle {
  font-size: 0.875rem;
  color: var(--text-muted);
}

.user-profile {
  display: flex;
  align-items: center;
  gap: 12px;
}

.avatar {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background-color: var(--primary-color);
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
}

/* Cards */
.card {
  background-color: var(--card-bg);
  border-radius: var(--radius-lg);
  border: 1px solid var(--border-color);
  box-shadow: var(--shadow-sm);
  padding: 24px;
}

.stat-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 24px;
  margin-bottom: 32px;
}

.stat-card {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.stat-title {
  font-size: 0.875rem;
  color: var(--text-muted);
  font-weight: 500;
}

.stat-value {
  font-size: 2rem;
  font-weight: 700;
  color: var(--text-main);
}

/* Dashboard Sections */
.dashboard-sections {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 24px;
  margin-bottom: 32px;
}

.chart-bar {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 12px;
}
.chart-label {
  width: 120px;
  font-size: 0.875rem;
}
.chart-track {
  flex: 1;
  height: 8px;
  background-color: var(--border-color);
  border-radius: 4px;
  overflow: hidden;
}
.chart-fill {
  height: 100%;
  background-color: var(--primary-color);
  border-radius: 4px;
}
.chart-value {
  width: 40px;
  text-align: right;
  font-size: 0.875rem;
  font-weight: 600;
}

/* Forms */
.form-group {
  margin-bottom: 20px;
}

.form-label {
  display: block;
  font-size: 0.875rem;
  font-weight: 500;
  margin-bottom: 8px;
  color: var(--text-main);
}

.form-label.required::after {
  content: " *";
  color: var(--danger);
}

.form-input, .form-select, .form-textarea {
  width: 100%;
  padding: 10px 12px;
  border: 1px solid var(--border-color);
  border-radius: var(--radius-md);
  font-size: 0.95rem;
  transition: border-color 0.2s, box-shadow 0.2s;
}

.form-input:focus, .form-select:focus, .form-textarea:focus {
  outline: none;
  border-color: var(--primary-color);
  box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.1);
}

.form-error {
  color: var(--danger);
  font-size: 0.75rem;
  margin-top: 6px;
  display: block;
}

.form-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
}

/* Buttons */
.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 10px 16px;
  border-radius: var(--radius-md);
  font-size: 0.95rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
  border: none;
}

.btn-primary {
  background-color: var(--primary-color);
  color: white;
}

.btn-primary:hover {
  background-color: var(--primary-hover);
}

.btn-primary:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}

.btn-secondary {
  background-color: white;
  border: 1px solid var(--border-color);
  color: var(--text-main);
}

.btn-secondary:hover {
  background-color: var(--background-color);
}

/* Tables */
.table-container {
  overflow-x: auto;
  border: 1px solid var(--border-color);
  border-radius: var(--radius-lg);
  background-color: var(--card-bg);
}

.table {
  width: 100%;
  border-collapse: collapse;
  text-align: left;
}

.table th {
  background-color: #f8fafc;
  padding: 16px;
  font-size: 0.75rem;
  font-weight: 600;
  text-transform: uppercase;
  color: var(--text-muted);
  border-bottom: 1px solid var(--border-color);
}

.table td {
  padding: 16px;
  border-bottom: 1px solid var(--border-color);
  font-size: 0.875rem;
}

.table tbody tr:hover {
  background-color: #f8fafc;
}

/* Badges */
.badge {
  display: inline-flex;
  align-items: center;
  padding: 4px 10px;
  border-radius: 999px;
  font-size: 0.75rem;
  font-weight: 600;
}

.badge-new { background-color: #dbeafe; color: #1e40af; }
.badge-contacted { background-color: #fef3c7; color: #92400e; }
.badge-qualified { background-color: #e0e7ff; color: #3730a3; }
.badge-proposalsent { background-color: #f3e8ff; color: #6b21a8; }
.badge-negotiation { background-color: #ffedd5; color: #9a3412; }
.badge-won { background-color: #dcfce7; color: #166534; }
.badge-lost { background-color: #fee2e2; color: #991b1b; }

/* Utilities */
.mb-24 { margin-bottom: 24px; }
.mt-24 { margin-top: 24px; }
.flex-between { display: flex; justify-content: space-between; align-items: center; }
.gap-12 { gap: 12px; }

/* Filter Bar */
.filter-bar {
  display: flex;
  gap: 16px;
  margin-bottom: 24px;
  flex-wrap: wrap;
}
.search-wrapper {
  position: relative;
  flex: 1;
  min-width: 250px;
}
.search-icon {
  position: absolute;
  left: 12px;
  top: 50%;
  transform: translateY(-50%);
  color: var(--text-muted);
}
.search-input {
  width: 100%;
  padding: 10px 12px 10px 40px;
  border: 1px solid var(--border-color);
  border-radius: var(--radius-md);
}
.filter-select {
  padding: 10px 12px;
  border: 1px solid var(--border-color);
  border-radius: var(--radius-md);
  background-color: white;
}

/* Toast */
.toast-container {
  position: fixed;
  bottom: 24px;
  right: 24px;
  z-index: 50;
  display: flex;
  flex-direction: column;
  gap: 10px;
}
.toast {
  background-color: #334155;
  color: white;
  padding: 12px 24px;
  border-radius: var(--radius-md);
  box-shadow: var(--shadow-lg);
  display: flex;
  align-items: center;
  gap: 12px;
  animation: slideIn 0.3s ease;
}
.toast.success {
  background-color: var(--success);
}
.toast.error {
  background-color: var(--danger);
}
@keyframes slideIn {
  from { transform: translateX(100%); opacity: 0; }
  to { transform: translateX(0); opacity: 1; }
}

/* Empty State / Error State */
.empty-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 64px 24px;
  text-align: center;
  background-color: var(--card-bg);
  border-radius: var(--radius-lg);
  border: 1px solid var(--border-color);
}
.empty-icon {
  color: var(--text-muted);
  margin-bottom: 16px;
  width: 48px;
  height: 48px;
}
.empty-title {
  font-size: 1.25rem;
  font-weight: 600;
  margin-bottom: 8px;
}
.empty-text {
  color: var(--text-muted);
  margin-bottom: 24px;
}

/* Loader */
.loader-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 200px;
}
.loader {
  border: 3px solid #f3f3f3;
  border-top: 3px solid var(--primary-color);
  border-radius: 50%;
  width: 32px;
  height: 32px;
  animation: spin 1s linear infinite;
}
@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

/* Enquiry Details */
.details-grid {
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 24px;
}
@media (max-width: 768px) {
  .details-grid { grid-template-columns: 1fr; }
  .form-grid { grid-template-columns: 1fr; }
  .dashboard-layout { flex-direction: column; }
  .sidebar { 
    position: fixed;
    z-index: 40;
    height: 100vh;
    transform: translateX(-100%);
  }
  .sidebar.open {
    transform: translateX(0);
  }
  .mobile-menu-btn {
    display: block;
  }
  .header {
    padding-left: 16px;
  }
}

.mobile-menu-btn {
  display: none;
  background: none;
  border: none;
  cursor: pointer;
  color: var(--text-main);
}
@media (max-width: 768px) {
  .mobile-menu-btn { display: block; }
}

.overlay {
  position: fixed;
  inset: 0;
  background-color: rgba(0,0,0,0.5);
  z-index: 30;
  display: none;
}
.overlay.open {
  display: block;
}
""",
    "src/App.jsx": """
import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import DashboardLayout from './layouts/DashboardLayout';
import Dashboard from './pages/Dashboard';
import Enquiries from './pages/Enquiries';
import AddEnquiry from './pages/AddEnquiry';
import EnquiryDetailsPage from './pages/EnquiryDetailsPage';
import NotFound from './pages/NotFound';
import { loadInitialData } from './utils/enquiryUtils';

function App() {
  useEffect(() => {
    loadInitialData();
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<DashboardLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="enquiries" element={<Enquiries />} />
          <Route path="enquiries/new" element={<AddEnquiry />} />
          <Route path="enquiries/:id" element={<EnquiryDetailsPage />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
""",
    "src/main.jsx": """
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
""",
    "src/utils/constants.js": """
export const STATUSES = [
  'New',
  'Contacted',
  'Qualified',
  'Proposal Sent',
  'Negotiation',
  'Won',
  'Lost'
];

export const SOURCES = [
  'Website',
  'Email',
  'WhatsApp',
  'Instagram',
  'Referral',
  'Direct'
];

export const TEAM_MEMBERS = [
  'Priya',
  'Arun',
  'Karthik',
  'Divya'
];
""",
    "src/data/mockEnquiries.js": """
export const mockEnquiries = [
  {
    id: "1",
    clientName: "TechCorp Solutions",
    contactPerson: "Rajesh Kumar",
    email: "rajesh@techcorp.com",
    phone: "9876543210",
    source: "Website",
    service: "Custom Software Development",
    description: "Looking for a custom ERP solution for our manufacturing unit.",
    budget: "500000",
    status: "New",
    assignedTo: "Priya",
    followUpDate: "2024-05-20",
    notes: "Client seems very interested, needs a demo soon.",
    createdAt: "2024-05-15T10:00:00Z",
    updatedAt: "2024-05-15T10:00:00Z"
  },
  {
    id: "2",
    clientName: "Green Valley Organics",
    contactPerson: "Sneha Patel",
    email: "sneha@greenvalley.in",
    phone: "9876543211",
    source: "Instagram",
    service: "E-commerce Website",
    description: "Want to launch an online store for our organic products.",
    budget: "150000",
    status: "Contacted",
    assignedTo: "Arun",
    followUpDate: "2024-05-18",
    notes: "Emailed them the standard company profile.",
    createdAt: "2024-05-10T11:30:00Z",
    updatedAt: "2024-05-12T14:20:00Z"
  },
  {
    id: "3",
    clientName: "Apex Logistics",
    contactPerson: "Vikram Singh",
    email: "vsingh@apexlogistics.com",
    phone: "9876543212",
    source: "Referral",
    service: "Mobile App Development",
    description: "Need a driver tracking application for iOS and Android.",
    budget: "800000",
    status: "Qualified",
    assignedTo: "Karthik",
    followUpDate: "2024-05-22",
    notes: "Requirements are clear. Moving to proposal stage.",
    createdAt: "2024-05-08T09:15:00Z",
    updatedAt: "2024-05-14T16:45:00Z"
  },
  {
    id: "4",
    clientName: "Bright Sparks Education",
    contactPerson: "Anjali Desai",
    email: "admin@brightsparks.edu",
    phone: "9876543213",
    source: "Email",
    service: "LMS Implementation",
    description: "Looking to deploy a learning management system for 500 students.",
    budget: "300000",
    status: "Proposal Sent",
    assignedTo: "Divya",
    followUpDate: "2024-05-25",
    notes: "Proposal sent on May 15. Waiting for board approval.",
    createdAt: "2024-05-05T14:00:00Z",
    updatedAt: "2024-05-15T10:30:00Z"
  },
  {
    id: "5",
    clientName: "Urban Spaces Real Estate",
    contactPerson: "Manoj Verma",
    email: "manoj@urbanspaces.in",
    phone: "9876543214",
    source: "Direct",
    service: "CRM Integration",
    description: "Need to integrate our existing website leads into Salesforce.",
    budget: "200000",
    status: "Negotiation",
    assignedTo: "Priya",
    followUpDate: "2024-05-17",
    notes: "Client asking for a 10% discount. Discussing with management.",
    createdAt: "2024-05-01T11:00:00Z",
    updatedAt: "2024-05-16T09:20:00Z"
  },
  {
    id: "6",
    clientName: "Blue Ocean Marketing",
    contactPerson: "Neha Sharma",
    email: "neha@blueocean.com",
    phone: "9876543215",
    source: "Website",
    service: "SEO and Digital Marketing",
    description: "Looking for comprehensive SEO services for 6 months.",
    budget: "120000",
    status: "Won",
    assignedTo: "Arun",
    followUpDate: "",
    notes: "Contract signed. Project kick-off next week.",
    createdAt: "2024-04-20T10:00:00Z",
    updatedAt: "2024-05-10T15:00:00Z"
  },
  {
    id: "7",
    clientName: "Pioneer Manufacturing",
    contactPerson: "Suresh Pillai",
    email: "suresh@pioneermfg.com",
    phone: "9876543216",
    source: "Email",
    service: "Inventory Management System",
    description: "Need a barcode-based inventory system.",
    budget: "400000",
    status: "Lost",
    assignedTo: "Karthik",
    followUpDate: "",
    notes: "Client chose a cheaper off-the-shelf product.",
    createdAt: "2024-04-15T09:30:00Z",
    updatedAt: "2024-05-05T11:00:00Z"
  },
  {
    id: "8",
    clientName: "Zenith Fitness",
    contactPerson: "Rahul Kapoor",
    email: "rahul@zenithfitness.in",
    phone: "9876543217",
    source: "WhatsApp",
    service: "Mobile App Development",
    description: "Workout tracking app for gym members.",
    budget: "600000",
    status: "New",
    assignedTo: "Divya",
    followUpDate: "2024-05-21",
    notes: "Received via WhatsApp. Need to schedule a discovery call.",
    createdAt: "2024-05-16T14:45:00Z",
    updatedAt: "2024-05-16T14:45:00Z"
  },
  {
    id: "9",
    clientName: "Silver Spoon Restaurant",
    contactPerson: "Anita Roy",
    email: "anita@silverspoon.com",
    phone: "9876543218",
    source: "Instagram",
    service: "Website Redesign",
    description: "Modernize current website and add online ordering.",
    budget: "100000",
    status: "Contacted",
    assignedTo: "Priya",
    followUpDate: "2024-05-19",
    notes: "Sent portfolio. Client will review on the weekend.",
    createdAt: "2024-05-14T12:20:00Z",
    updatedAt: "2024-05-15T09:10:00Z"
  },
  {
    id: "10",
    clientName: "Global Trade Exim",
    contactPerson: "Amit Agarwal",
    email: "amit@globaltrade.in",
    phone: "9876543219",
    source: "Referral",
    service: "Custom Software Development",
    description: "Export documentation automation software.",
    budget: "450000",
    status: "Qualified",
    assignedTo: "Arun",
    followUpDate: "2024-05-23",
    notes: "Technical requirements gathered. Team is estimating effort.",
    createdAt: "2024-05-12T16:00:00Z",
    updatedAt: "2024-05-16T10:30:00Z"
  },
  {
    id: "11",
    clientName: "MediCare Clinics",
    contactPerson: "Dr. Sunita Rao",
    email: "s.rao@medicare.com",
    phone: "9876543220",
    source: "Website",
    service: "Appointment Booking System",
    description: "Centralized booking for 5 clinic branches.",
    budget: "250000",
    status: "Proposal Sent",
    assignedTo: "Karthik",
    followUpDate: "2024-05-24",
    notes: "Awaiting feedback from hospital board.",
    createdAt: "2024-05-09T10:15:00Z",
    updatedAt: "2024-05-14T11:45:00Z"
  },
  {
    id: "12",
    clientName: "NextGen Robotics",
    contactPerson: "Tarun Bajaj",
    email: "tarun@nextgenrobotics.in",
    phone: "9876543221",
    source: "Direct",
    service: "IoT Dashboard",
    description: "Real-time dashboard for monitoring robotic arms.",
    budget: "900000",
    status: "Negotiation",
    assignedTo: "Divya",
    followUpDate: "2024-05-18",
    notes: "Discussing SLA terms.",
    createdAt: "2024-05-02T09:00:00Z",
    updatedAt: "2024-05-15T15:20:00Z"
  },
  {
    id: "13",
    clientName: "FinTech Innovations",
    contactPerson: "Rohan Gupta",
    email: "rohan@fintechinnovations.com",
    phone: "9876543222",
    source: "Referral",
    service: "Security Audit",
    description: "Comprehensive security audit of payment gateway.",
    budget: "350000",
    status: "Won",
    assignedTo: "Priya",
    followUpDate: "",
    notes: "Advance payment received.",
    createdAt: "2024-04-10T14:30:00Z",
    updatedAt: "2024-04-25T10:00:00Z"
  },
  {
    id: "14",
    clientName: "Cloud Nine Tours",
    contactPerson: "Pooja Menon",
    email: "pooja@cloudninetours.in",
    phone: "9876543223",
    source: "Website",
    service: "Website Redesign",
    description: "Travel portal redesign with booking engine integration.",
    budget: "180000",
    status: "Lost",
    assignedTo: "Arun",
    followUpDate: "",
    notes: "Budget constraint. Client postponed project to next year.",
    createdAt: "2024-04-05T11:15:00Z",
    updatedAt: "2024-04-20T16:30:00Z"
  },
  {
    id: "15",
    clientName: "Elite Interiors",
    contactPerson: "Kavita Reddy",
    email: "kavita@eliteinteriors.com",
    phone: "9876543224",
    source: "WhatsApp",
    service: "Mobile App Development",
    description: "AR app for visualizing furniture in rooms.",
    budget: "750000",
    status: "New",
    assignedTo: "Karthik",
    followUpDate: "2024-05-22",
    notes: "Initial chat done. Arranging a formal meeting.",
    createdAt: "2024-05-17T09:45:00Z",
    updatedAt: "2024-05-17T09:45:00Z"
  }
];
""",
    "src/utils/enquiryUtils.js": """
import { mockEnquiries } from '../data/mockEnquiries';

const STORAGE_KEY = 'clientflow_enquiries';

export const loadInitialData = () => {
  try {
    const existingData = localStorage.getItem(STORAGE_KEY);
    if (!existingData) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(mockEnquiries));
    }
  } catch (error) {
    console.error("Failed to load initial data", error);
  }
};

export const getEnquiries = () => {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.error("Failed to get enquiries", error);
    return [];
  }
};

export const saveEnquiries = (enquiries) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(enquiries));
  } catch (error) {
    console.error("Failed to save enquiries", error);
  }
};

export const generateId = () => {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
};
""",
    "src/utils/validation.js": """
export const validateEnquiryForm = (data) => {
  const errors = {};

  if (!data.clientName?.trim()) {
    errors.clientName = 'Client/Company Name is required';
  }
  
  if (!data.contactPerson?.trim()) {
    errors.contactPerson = 'Contact Person is required';
  }

  if (!data.email?.trim()) {
    errors.email = 'Email is required';
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
    errors.email = 'Must be a valid email address';
  }

  if (!data.phone?.trim()) {
    errors.phone = 'Phone is required';
  } else if (!/^\+?[\d\s-]{8,15}$/.test(data.phone)) {
    errors.phone = 'Must be a valid phone number';
  }

  if (!data.service?.trim()) {
    errors.service = 'Service/Requirement is required';
  }

  if (!data.source) {
    errors.source = 'Source must be selected';
  }

  if (!data.status) {
    errors.status = 'Status must be selected';
  }

  if (!data.assignedTo) {
    errors.assignedTo = 'Assigned Person must be selected';
  }

  if (data.budget && (isNaN(data.budget) || Number(data.budget) < 0)) {
    errors.budget = 'Budget must be a valid non-negative number';
  }

  if (data.followUpDate) {
    const date = new Date(data.followUpDate);
    if (isNaN(date.getTime())) {
      errors.followUpDate = 'Must be a valid date';
    }
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
};
""",
    "src/hooks/useEnquiries.js": """
import { useState, useEffect, useCallback } from 'react';
import { getEnquiries, saveEnquiries, generateId } from '../utils/enquiryUtils';

export const useEnquiries = () => {
  const [enquiries, setEnquiries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchEnquiries = useCallback(() => {
    setLoading(true);
    try {
      const data = getEnquiries();
      setEnquiries(data);
      setError(null);
    } catch (err) {
      setError('Failed to load enquiries');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchEnquiries();
  }, [fetchEnquiries]);

  const addEnquiry = (enquiryData) => {
    try {
      const newEnquiry = {
        ...enquiryData,
        id: generateId(),
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };
      const updatedEnquiries = [newEnquiry, ...enquiries];
      setEnquiries(updatedEnquiries);
      saveEnquiries(updatedEnquiries);
      return { success: true, id: newEnquiry.id };
    } catch (err) {
      return { success: false, error: 'Failed to add enquiry' };
    }
  };

  const updateEnquiry = (id, updates) => {
    try {
      const updatedEnquiries = enquiries.map(enq => 
        enq.id === id 
          ? { ...enq, ...updates, updatedAt: new Date().toISOString() }
          : enq
      );
      setEnquiries(updatedEnquiries);
      saveEnquiries(updatedEnquiries);
      return { success: true };
    } catch (err) {
      return { success: false, error: 'Failed to update enquiry' };
    }
  };

  const getEnquiryById = (id) => {
    return enquiries.find(e => e.id === id);
  };

  return {
    enquiries,
    loading,
    error,
    addEnquiry,
    updateEnquiry,
    getEnquiryById,
    refreshEnquiries: fetchEnquiries
  };
};
""",
    "src/components/common/StatusBadge.jsx": """
import React from 'react';

const StatusBadge = ({ status }) => {
  const badgeClass = `badge badge-${status.toLowerCase().replace(' ', '')}`;
  return (
    <span className={badgeClass}>
      {status}
    </span>
  );
};

export default StatusBadge;
""",
    "src/components/common/Toast.jsx": """
import React, { useEffect } from 'react';
import { CheckCircle, AlertCircle, X } from 'lucide-react';

const Toast = ({ message, type = 'success', onClose }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 3000);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className={`toast ${type}`}>
      {type === 'success' ? <CheckCircle size={20} /> : <AlertCircle size={20} />}
      <span>{message}</span>
      <button onClick={onClose} style={{background: 'none', border: 'none', color: 'white', cursor: 'pointer', marginLeft: 'auto'}}>
        <X size={16} />
      </button>
    </div>
  );
};

export default Toast;
""",
    "src/components/common/LoadingState.jsx": """
import React from 'react';

const LoadingState = () => (
  <div className="loader-container">
    <div className="loader"></div>
  </div>
);

export default LoadingState;
""",
    "src/components/common/EmptyState.jsx": """
import React from 'react';
import { SearchX } from 'lucide-react';

const EmptyState = ({ title, description, action }) => (
  <div className="empty-state">
    <SearchX className="empty-icon" />
    <h3 className="empty-title">{title}</h3>
    <p className="empty-text">{description}</p>
    {action}
  </div>
);

export default EmptyState;
""",
    "src/components/common/ErrorState.jsx": """
import React from 'react';
import { AlertTriangle } from 'lucide-react';

const ErrorState = ({ message, onRetry }) => (
  <div className="empty-state">
    <AlertTriangle className="empty-icon" style={{color: 'var(--danger)'}} />
    <h3 className="empty-title">Something went wrong</h3>
    <p className="empty-text">{message || "We couldn't complete this operation."}</p>
    {onRetry && (
      <button className="btn btn-primary" onClick={onRetry}>Try Again</button>
    )}
  </div>
);

export default ErrorState;
""",
    "src/layouts/DashboardLayout.jsx": """
import React, { useState } from 'react';
import { Outlet, NavLink, useLocation } from 'react-router-dom';
import { LayoutDashboard, Users, PlusCircle, Menu, X } from 'lucide-react';

const DashboardLayout = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  const toggleMenu = () => setMobileMenuOpen(!mobileMenuOpen);
  const closeMenu = () => setMobileMenuOpen(false);

  const getPageTitle = () => {
    if (location.pathname === '/') return 'Dashboard';
    if (location.pathname === '/enquiries') return 'Enquiries';
    if (location.pathname === '/enquiries/new') return 'Add Enquiry';
    if (location.pathname.startsWith('/enquiries/')) return 'Enquiry Details';
    return 'ClientFlow';
  };

  const getPageSubtitle = () => {
    if (location.pathname === '/') return 'Overview of your client enquiry pipeline.';
    if (location.pathname === '/enquiries') return 'Manage and track client requests.';
    if (location.pathname === '/enquiries/new') return 'Create a new client request.';
    if (location.pathname.startsWith('/enquiries/')) return 'View and edit details.';
    return '';
  };

  return (
    <div className="dashboard-layout">
      {/* Mobile Overlay */}
      <div className={`overlay ${mobileMenuOpen ? 'open' : ''}`} onClick={closeMenu}></div>
      
      {/* Sidebar */}
      <aside className={`sidebar ${mobileMenuOpen ? 'open' : ''}`}>
        <div className="sidebar-header">
          <div className="avatar" style={{width: '24px', height: '24px', fontSize: '12px'}}>CF</div>
          ClientFlow
        </div>
        <nav className="sidebar-nav">
          <NavLink to="/" className={({isActive}) => `nav-item ${isActive ? 'active' : ''}`} end onClick={closeMenu}>
            <LayoutDashboard size={20} />
            Dashboard
          </NavLink>
          <NavLink to="/enquiries" className={({isActive}) => `nav-item ${isActive && !location.pathname.includes('/new') ? 'active' : ''}`} end onClick={closeMenu}>
            <Users size={20} />
            Enquiries
          </NavLink>
          <NavLink to="/enquiries/new" className={({isActive}) => `nav-item ${isActive ? 'active' : ''}`} onClick={closeMenu}>
            <PlusCircle size={20} />
            Add Enquiry
          </NavLink>
        </nav>
      </aside>

      {/* Main Content */}
      <div className="main-content">
        <header className="header">
          <div style={{display: 'flex', alignItems: 'center', gap: '16px'}}>
            <button className="mobile-menu-btn" onClick={toggleMenu} aria-label="Menu">
              <Menu size={24} />
            </button>
            <div>
              <h1 className="header-title">{getPageTitle()}</h1>
              <p className="header-subtitle" style={{display: window.innerWidth > 768 ? 'block' : 'none'}}>{getPageSubtitle()}</p>
            </div>
          </div>
          <div className="user-profile">
            <div className="avatar">JD</div>
            <span style={{fontWeight: 500, display: window.innerWidth > 768 ? 'block' : 'none'}}>John Doe</span>
          </div>
        </header>
        
        <main className="page-content">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
""",
    "src/pages/Dashboard.jsx": """
import React, { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useEnquiries } from '../hooks/useEnquiries';
import StatusBadge from '../components/common/StatusBadge';
import LoadingState from '../components/common/LoadingState';
import { STATUSES, SOURCES } from '../utils/constants';

const Dashboard = () => {
  const { enquiries, loading } = useEnquiries();
  const navigate = useNavigate();

  const metrics = useMemo(() => {
    if (!enquiries) return {};
    
    const total = enquiries.length;
    const newEnqs = enquiries.filter(e => e.status === 'New').length;
    const won = enquiries.filter(e => e.status === 'Won').length;
    const lost = enquiries.filter(e => e.status === 'Lost').length;
    const active = total - won - lost;
    
    const today = new Date().toISOString().split('T')[0];
    const followUps = enquiries.filter(e => e.followUpDate && e.followUpDate <= today && e.status !== 'Won' && e.status !== 'Lost').length;

    const statusCounts = {};
    STATUSES.forEach(s => statusCounts[s] = 0);
    enquiries.forEach(e => {
      if (statusCounts[e.status] !== undefined) statusCounts[e.status]++;
    });

    const sourceCounts = {};
    SOURCES.forEach(s => sourceCounts[s] = 0);
    enquiries.forEach(e => {
      if (sourceCounts[e.source] !== undefined) sourceCounts[e.source]++;
    });

    return { total, new: newEnqs, active, won, lost, followUps, statusCounts, sourceCounts };
  }, [enquiries]);

  if (loading) return <LoadingState />;

  const recentEnquiries = enquiries.slice(0, 5);

  return (
    <div>
      <div className="stat-grid">
        <div className="card stat-card">
          <span className="stat-title">Total Enquiries</span>
          <span className="stat-value">{metrics.total}</span>
        </div>
        <div className="card stat-card">
          <span className="stat-title">New Enquiries</span>
          <span className="stat-value" style={{color: 'var(--primary-color)'}}>{metrics.new}</span>
        </div>
        <div className="card stat-card">
          <span className="stat-title">Active Enquiries</span>
          <span className="stat-value" style={{color: '#3b82f6'}}>{metrics.active}</span>
        </div>
        <div className="card stat-card">
          <span className="stat-title">Won Enquiries</span>
          <span className="stat-value" style={{color: 'var(--success)'}}>{metrics.won}</span>
        </div>
        <div className="card stat-card">
          <span className="stat-title">Lost Enquiries</span>
          <span className="stat-value" style={{color: 'var(--danger)'}}>{metrics.lost}</span>
        </div>
        <div className="card stat-card">
          <span className="stat-title">Follow-ups Due</span>
          <span className="stat-value" style={{color: 'var(--warning)'}}>{metrics.followUps}</span>
        </div>
      </div>

      <div className="dashboard-sections">
        <div className="card">
          <h3 className="mb-24" style={{fontSize: '1.1rem'}}>Enquiries by Status</h3>
          {STATUSES.map(status => {
            const count = metrics.statusCounts[status];
            const max = Math.max(...Object.values(metrics.statusCounts), 1);
            const percent = (count / max) * 100;
            return (
              <div key={status} className="chart-bar">
                <span className="chart-label">{status}</span>
                <div className="chart-track">
                  <div className="chart-fill" style={{width: `${percent}%`}}></div>
                </div>
                <span className="chart-value">{count}</span>
              </div>
            );
          })}
        </div>
        
        <div className="card">
          <h3 className="mb-24" style={{fontSize: '1.1rem'}}>Enquiries by Source</h3>
          {SOURCES.map(source => {
            const count = metrics.sourceCounts[source];
            const max = Math.max(...Object.values(metrics.sourceCounts), 1);
            const percent = (count / max) * 100;
            return (
              <div key={source} className="chart-bar">
                <span className="chart-label">{source}</span>
                <div className="chart-track">
                  <div className="chart-fill" style={{width: `${percent}%`, backgroundColor: '#8b5cf6'}}></div>
                </div>
                <span className="chart-value">{count}</span>
              </div>
            );
          })}
        </div>
      </div>

      <div className="card">
        <div className="flex-between mb-24">
          <h3 style={{fontSize: '1.1rem'}}>Recent Enquiries</h3>
          <button className="btn btn-secondary" onClick={() => navigate('/enquiries')}>View All</button>
        </div>
        <div className="table-container">
          <table className="table">
            <thead>
              <tr>
                <th>Client</th>
                <th>Service</th>
                <th>Source</th>
                <th>Status</th>
                <th>Assigned To</th>
                <th>Follow-up</th>
              </tr>
            </thead>
            <tbody>
              {recentEnquiries.map(enq => (
                <tr key={enq.id} onClick={() => navigate(`/enquiries/${enq.id}`)} style={{cursor: 'pointer'}}>
                  <td style={{fontWeight: 500}}>{enq.clientName}</td>
                  <td>{enq.service}</td>
                  <td>{enq.source}</td>
                  <td><StatusBadge status={enq.status} /></td>
                  <td>{enq.assignedTo}</td>
                  <td>{enq.followUpDate || '-'}</td>
                </tr>
              ))}
              {recentEnquiries.length === 0 && (
                <tr>
                  <td colSpan="6" style={{textAlign: 'center', padding: '24px', color: 'var(--text-muted)'}}>No recent enquiries</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
""",
    "src/pages/Enquiries.jsx": """
import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, Search } from 'lucide-react';
import { useEnquiries } from '../hooks/useEnquiries';
import StatusBadge from '../components/common/StatusBadge';
import LoadingState from '../components/common/LoadingState';
import EmptyState from '../components/common/EmptyState';
import { STATUSES, SOURCES, TEAM_MEMBERS } from '../utils/constants';

const Enquiries = () => {
  const { enquiries, loading } = useEnquiries();
  const navigate = useNavigate();
  
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [sourceFilter, setSourceFilter] = useState('All');
  const [assignedFilter, setAssignedFilter] = useState('All');

  const filteredEnquiries = useMemo(() => {
    return enquiries.filter(enq => {
      const matchesSearch = 
        enq.clientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        enq.contactPerson.toLowerCase().includes(searchTerm.toLowerCase()) ||
        enq.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        enq.service.toLowerCase().includes(searchTerm.toLowerCase()) ||
        enq.phone.includes(searchTerm);
        
      const matchesStatus = statusFilter === 'All' || enq.status === statusFilter;
      const matchesSource = sourceFilter === 'All' || enq.source === sourceFilter;
      const matchesAssigned = assignedFilter === 'All' || enq.assignedTo === assignedFilter;

      return matchesSearch && matchesStatus && matchesSource && matchesAssigned;
    });
  }, [enquiries, searchTerm, statusFilter, sourceFilter, assignedFilter]);

  const clearFilters = () => {
    setSearchTerm('');
    setStatusFilter('All');
    setSourceFilter('All');
    setAssignedFilter('All');
  };

  if (loading) return <LoadingState />;

  return (
    <div>
      <div className="flex-between mb-24">
        <div></div>
        <button className="btn btn-primary" onClick={() => navigate('/enquiries/new')}>
          <Plus size={18} /> Add Enquiry
        </button>
      </div>

      <div className="card mb-24">
        <div className="filter-bar">
          <div className="search-wrapper">
            <Search className="search-icon" size={18} />
            <input 
              type="text" 
              className="search-input" 
              placeholder="Search enquiries..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <select className="filter-select" value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
            <option value="All">All Statuses</option>
            {STATUSES.map(s => <option key={s} value={s}>{s}</option>)}
          </select>

          <select className="filter-select" value={sourceFilter} onChange={(e) => setSourceFilter(e.target.value)}>
            <option value="All">All Sources</option>
            {SOURCES.map(s => <option key={s} value={s}>{s}</option>)}
          </select>

          <select className="filter-select" value={assignedFilter} onChange={(e) => setAssignedFilter(e.target.value)}>
            <option value="All">All Team</option>
            {TEAM_MEMBERS.map(t => <option key={t} value={t}>{t}</option>)}
          </select>

          <button className="btn btn-secondary" onClick={clearFilters}>Clear Filters</button>
        </div>
      </div>

      {filteredEnquiries.length === 0 ? (
        <EmptyState 
          title="No enquiries found" 
          description="No enquiries match your current search or filters."
          action={
            <div style={{display: 'flex', gap: '12px'}}>
              <button className="btn btn-secondary" onClick={clearFilters}>Clear Filters</button>
              <button className="btn btn-primary" onClick={() => navigate('/enquiries/new')}>Add Enquiry</button>
            </div>
          }
        />
      ) : (
        <div className="table-container">
          <table className="table">
            <thead>
              <tr>
                <th>Client</th>
                <th>Contact</th>
                <th>Service</th>
                <th>Source</th>
                <th>Status</th>
                <th>Assigned To</th>
                <th>Follow-up</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredEnquiries.map(enq => (
                <tr key={enq.id}>
                  <td style={{fontWeight: 500}}>{enq.clientName}</td>
                  <td>
                    <div>{enq.contactPerson}</div>
                    <div style={{fontSize: '0.75rem', color: 'var(--text-muted)'}}>{enq.email}</div>
                  </td>
                  <td>{enq.service}</td>
                  <td>{enq.source}</td>
                  <td><StatusBadge status={enq.status} /></td>
                  <td>{enq.assignedTo}</td>
                  <td>{enq.followUpDate || '-'}</td>
                  <td>
                    <button className="btn btn-secondary" style={{padding: '6px 12px', fontSize: '0.85rem'}} onClick={() => navigate(`/enquiries/${enq.id}`)}>
                      View/Edit
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Enquiries;
""",
    "src/pages/AddEnquiry.jsx": """
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useEnquiries } from '../hooks/useEnquiries';
import { validateEnquiryForm } from '../utils/validation';
import { STATUSES, SOURCES, TEAM_MEMBERS } from '../utils/constants';
import Toast from '../components/common/Toast';

const AddEnquiry = () => {
  const navigate = useNavigate();
  const { addEnquiry } = useEnquiries();
  
  const [formData, setFormData] = useState({
    clientName: '',
    contactPerson: '',
    email: '',
    phone: '',
    service: '',
    source: '',
    description: '',
    budget: '',
    status: 'New',
    assignedTo: '',
    followUpDate: '',
    notes: ''
  });
  
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [toast, setToast] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear error when user types
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: null }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    const { isValid, errors: validationErrors } = validateEnquiryForm(formData);
    
    if (!isValid) {
      setErrors(validationErrors);
      setIsSubmitting(false);
      return;
    }
    
    // Simulate API delay
    await new Promise(r => setTimeout(r, 500));
    
    const result = addEnquiry(formData);
    
    if (result.success) {
      setToast({ message: 'Enquiry created successfully.', type: 'success' });
      setTimeout(() => {
        navigate('/enquiries');
      }, 1500);
    } else {
      setToast({ message: result.error, type: 'error' });
      setIsSubmitting(false);
    }
  };

  return (
    <div className="card">
      <form onSubmit={handleSubmit}>
        <h3 className="mb-24">Client Information</h3>
        <div className="form-grid">
          <div className="form-group">
            <label className="form-label required">Client / Company Name</label>
            <input type="text" className="form-input" name="clientName" value={formData.clientName} onChange={handleChange} placeholder="e.g. Acme Corp" />
            {errors.clientName && <span className="form-error">{errors.clientName}</span>}
          </div>
          <div className="form-group">
            <label className="form-label required">Contact Person</label>
            <input type="text" className="form-input" name="contactPerson" value={formData.contactPerson} onChange={handleChange} placeholder="e.g. John Doe" />
            {errors.contactPerson && <span className="form-error">{errors.contactPerson}</span>}
          </div>
          <div className="form-group">
            <label className="form-label required">Email</label>
            <input type="email" className="form-input" name="email" value={formData.email} onChange={handleChange} placeholder="john@acme.com" />
            {errors.email && <span className="form-error">{errors.email}</span>}
          </div>
          <div className="form-group">
            <label className="form-label required">Phone</label>
            <input type="tel" className="form-input" name="phone" value={formData.phone} onChange={handleChange} placeholder="+1 234 567 8900" />
            {errors.phone && <span className="form-error">{errors.phone}</span>}
          </div>
        </div>

        <h3 className="mb-24 mt-24">Enquiry Information</h3>
        <div className="form-grid">
          <div className="form-group">
            <label className="form-label required">Service / Requirement</label>
            <input type="text" className="form-input" name="service" value={formData.service} onChange={handleChange} placeholder="e.g. Web Development" />
            {errors.service && <span className="form-error">{errors.service}</span>}
          </div>
          <div className="form-group">
            <label className="form-label required">Source</label>
            <select className="form-select" name="source" value={formData.source} onChange={handleChange}>
              <option value="">Select a source</option>
              {SOURCES.map(s => <option key={s} value={s}>{s}</option>)}
            </select>
            {errors.source && <span className="form-error">{errors.source}</span>}
          </div>
          <div className="form-group" style={{gridColumn: '1 / -1'}}>
            <label className="form-label">Requirement Description</label>
            <textarea className="form-textarea" name="description" value={formData.description} onChange={handleChange} rows="3" placeholder="Briefly describe the requirements..."></textarea>
          </div>
          <div className="form-group">
            <label className="form-label">Estimated Budget</label>
            <input type="number" className="form-input" name="budget" value={formData.budget} onChange={handleChange} placeholder="e.g. 50000" />
            {errors.budget && <span className="form-error">{errors.budget}</span>}
          </div>
        </div>

        <h3 className="mb-24 mt-24">Management</h3>
        <div className="form-grid">
          <div className="form-group">
            <label className="form-label required">Status</label>
            <select className="form-select" name="status" value={formData.status} onChange={handleChange}>
              {STATUSES.map(s => <option key={s} value={s}>{s}</option>)}
            </select>
            {errors.status && <span className="form-error">{errors.status}</span>}
          </div>
          <div className="form-group">
            <label className="form-label required">Assigned Person</label>
            <select className="form-select" name="assignedTo" value={formData.assignedTo} onChange={handleChange}>
              <option value="">Select team member</option>
              {TEAM_MEMBERS.map(t => <option key={t} value={t}>{t}</option>)}
            </select>
            {errors.assignedTo && <span className="form-error">{errors.assignedTo}</span>}
          </div>
          <div className="form-group">
            <label className="form-label">Next Follow-up Date</label>
            <input type="date" className="form-input" name="followUpDate" value={formData.followUpDate} onChange={handleChange} />
            {errors.followUpDate && <span className="form-error">{errors.followUpDate}</span>}
          </div>
          <div className="form-group" style={{gridColumn: '1 / -1'}}>
            <label className="form-label">Additional Notes</label>
            <textarea className="form-textarea" name="notes" value={formData.notes} onChange={handleChange} rows="2" placeholder="Internal notes..."></textarea>
          </div>
        </div>

        <div className="flex-between mt-24" style={{borderTop: '1px solid var(--border-color)', paddingTop: '24px'}}>
          <button type="button" className="btn btn-secondary" onClick={() => navigate('/enquiries')} disabled={isSubmitting}>Cancel</button>
          <button type="submit" className="btn btn-primary" disabled={isSubmitting}>
            {isSubmitting ? 'Saving...' : 'Save Enquiry'}
          </button>
        </div>
      </form>
      
      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
    </div>
  );
};

export default AddEnquiry;
""",
    "src/pages/EnquiryDetailsPage.jsx": """
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useEnquiries } from '../hooks/useEnquiries';
import { STATUSES, TEAM_MEMBERS } from '../utils/constants';
import LoadingState from '../components/common/LoadingState';
import ErrorState from '../components/common/ErrorState';
import Toast from '../components/common/Toast';
import StatusBadge from '../components/common/StatusBadge';

const EnquiryDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getEnquiryById, updateEnquiry, loading } = useEnquiries();
  
  const [enquiry, setEnquiry] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({});
  const [toast, setToast] = useState(null);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    if (!loading) {
      const data = getEnquiryById(id);
      if (data) {
        setEnquiry(data);
        setFormData(data);
      } else {
        setEnquiry(null); // Not found
      }
    }
  }, [id, loading, getEnquiryById]);

  if (loading) return <LoadingState />;
  
  if (!enquiry) return (
    <div className="empty-state">
      <h3 className="empty-title">Enquiry not found.</h3>
      <p className="empty-text">The enquiry you are looking for does not exist or has been removed.</p>
      <button className="btn btn-primary" onClick={() => navigate('/enquiries')}>Back to Enquiries</button>
    </div>
  );

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    setIsSaving(true);
    
    // Simulate API delay
    await new Promise(r => setTimeout(r, 500));
    
    const updates = {
      status: formData.status,
      assignedTo: formData.assignedTo,
      followUpDate: formData.followUpDate,
      notes: formData.notes
    };
    
    const result = updateEnquiry(id, updates);
    
    if (result.success) {
      setEnquiry(prev => ({ ...prev, ...updates }));
      setIsEditing(false);
      setToast({ message: 'Enquiry updated successfully.', type: 'success' });
    } else {
      setToast({ message: result.error, type: 'error' });
    }
    setIsSaving(false);
  };

  return (
    <div>
      <div className="flex-between mb-24">
        <button className="btn btn-secondary" onClick={() => navigate('/enquiries')}>← Back</button>
        {!isEditing && (
          <button className="btn btn-primary" onClick={() => setIsEditing(true)}>Edit Details</button>
        )}
      </div>

      <div className="details-grid">
        <div className="card">
          <h3 className="mb-24" style={{borderBottom: '1px solid var(--border-color)', paddingBottom: '12px'}}>Client Information</h3>
          <div className="form-grid mb-24">
            <div>
              <div className="form-label">Client / Company Name</div>
              <div style={{fontWeight: 500}}>{enquiry.clientName}</div>
            </div>
            <div>
              <div className="form-label">Contact Person</div>
              <div>{enquiry.contactPerson}</div>
            </div>
            <div>
              <div className="form-label">Email</div>
              <div><a href={`mailto:${enquiry.email}`} style={{color: 'var(--primary-color)'}}>{enquiry.email}</a></div>
            </div>
            <div>
              <div className="form-label">Phone</div>
              <div>{enquiry.phone}</div>
            </div>
          </div>

          <h3 className="mb-24" style={{borderBottom: '1px solid var(--border-color)', paddingBottom: '12px'}}>Enquiry Information</h3>
          <div className="form-grid">
            <div>
              <div className="form-label">Service / Requirement</div>
              <div style={{fontWeight: 500}}>{enquiry.service}</div>
            </div>
            <div>
              <div className="form-label">Source</div>
              <div>{enquiry.source}</div>
            </div>
            <div style={{gridColumn: '1 / -1'}}>
              <div className="form-label">Requirement Description</div>
              <div style={{backgroundColor: 'var(--background-color)', padding: '12px', borderRadius: 'var(--radius-md)'}}>
                {enquiry.description || 'No description provided.'}
              </div>
            </div>
            <div>
              <div className="form-label">Estimated Budget</div>
              <div>{enquiry.budget ? `₹${enquiry.budget}` : 'Not specified'}</div>
            </div>
          </div>
        </div>

        <div className="card">
          <h3 className="mb-24" style={{borderBottom: '1px solid var(--border-color)', paddingBottom: '12px'}}>Management Information</h3>
          
          <div className="form-group">
            <label className="form-label">Status</label>
            {isEditing ? (
              <select className="form-select" name="status" value={formData.status} onChange={handleChange}>
                {STATUSES.map(s => <option key={s} value={s}>{s}</option>)}
              </select>
            ) : (
              <div><StatusBadge status={enquiry.status} /></div>
            )}
          </div>
          
          <div className="form-group">
            <label className="form-label">Assigned Person</label>
            {isEditing ? (
              <select className="form-select" name="assignedTo" value={formData.assignedTo} onChange={handleChange}>
                {TEAM_MEMBERS.map(t => <option key={t} value={t}>{t}</option>)}
              </select>
            ) : (
              <div>{enquiry.assignedTo}</div>
            )}
          </div>
          
          <div className="form-group">
            <label className="form-label">Next Follow-up Date</label>
            {isEditing ? (
              <input type="date" className="form-input" name="followUpDate" value={formData.followUpDate} onChange={handleChange} />
            ) : (
              <div>{enquiry.followUpDate || 'None'}</div>
            )}
          </div>
          
          <div className="form-group mb-24">
            <label className="form-label">Notes</label>
            {isEditing ? (
              <textarea className="form-textarea" name="notes" value={formData.notes} onChange={handleChange} rows="4"></textarea>
            ) : (
              <div style={{backgroundColor: 'var(--background-color)', padding: '12px', borderRadius: 'var(--radius-md)', minHeight: '60px'}}>
                {enquiry.notes || 'No notes added.'}
              </div>
            )}
          </div>
          
          <div style={{fontSize: '0.8rem', color: 'var(--text-muted)', borderTop: '1px solid var(--border-color)', paddingTop: '12px', marginBottom: '24px'}}>
            <div>Created: {new Date(enquiry.createdAt).toLocaleString()}</div>
            <div>Updated: {new Date(enquiry.updatedAt).toLocaleString()}</div>
          </div>
          
          {isEditing && (
            <div className="flex-between">
              <button className="btn btn-secondary" onClick={() => { setIsEditing(false); setFormData(enquiry); }} disabled={isSaving}>Cancel</button>
              <button className="btn btn-primary" onClick={handleSave} disabled={isSaving}>
                {isSaving ? 'Saving...' : 'Save Changes'}
              </button>
            </div>
          )}
        </div>
      </div>
      
      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
    </div>
  );
};

export default EnquiryDetailsPage;
""",
    "src/pages/NotFound.jsx": """
import React from 'react';
import { useNavigate } from 'react-router-dom';

const NotFound = () => {
  const navigate = useNavigate();
  return (
    <div className="empty-state" style={{marginTop: '40px'}}>
      <h1 style={{fontSize: '4rem', color: 'var(--primary-color)', marginBottom: '16px'}}>404</h1>
      <h3 className="empty-title">Page not found.</h3>
      <p className="empty-text">The page you're looking for doesn't exist.</p>
      <button className="btn btn-primary" onClick={() => navigate('/')}>Back to Dashboard</button>
    </div>
  );
};

export default NotFound;
"""
}

def create_files():
    for filepath, content in files.items():
        dir_name = os.path.dirname(filepath)
        if dir_name and not os.path.exists(dir_name):
            os.makedirs(dir_name)
        with open(filepath, "w", encoding="utf-8") as f:
            f.write(content.strip() + "\\n")
    
    print("All files generated successfully.")

if __name__ == "__main__":
    create_files()
