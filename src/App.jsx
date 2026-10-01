import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import DashboardLayout from './layouts/DashboardLayout';
import Dashboard from './pages/Dashboard';
import Enquiries from './pages/Enquiries';
import AddEnquiry from './pages/AddEnquiry';
import EnquiryDetailsPage from './pages/EnquiryDetailsPage';
import Settings from './pages/Settings';
import Clients from './pages/Clients';
import Tasks from './pages/Tasks';
import CalendarPage from './pages/CalendarPage';
import Reports from './pages/Reports';
import NotFound from './pages/NotFound';
import { loadInitialData } from './utils/enquiryUtils';

function App() {
  useEffect(() => {
    loadInitialData();
  }, []);

  return (
    <ThemeProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<DashboardLayout />}>
            <Route index element={<Dashboard />} />
            <Route path="enquiries" element={<Enquiries />} />
            <Route path="enquiries/new" element={<AddEnquiry />} />
            <Route path="enquiries/:id" element={<EnquiryDetailsPage />} />
            <Route path="clients" element={<Clients />} />
            <Route path="tasks" element={<Tasks />} />
            <Route path="calendar" element={<CalendarPage />} />
            <Route path="reports" element={<Reports />} />
            <Route path="settings" element={<Settings />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
