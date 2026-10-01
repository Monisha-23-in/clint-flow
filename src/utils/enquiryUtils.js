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
