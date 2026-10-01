import { useState, useCallback } from 'react';
import { getEnquiries, saveEnquiries, generateId } from '../utils/enquiryUtils';

export const useEnquiries = () => {
  const [enquiries, setEnquiries] = useState(() => getEnquiries());
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchEnquiries = useCallback(() => {
    setLoading(true);
    try {
      const data = getEnquiries();
      setEnquiries(data);
      setError(null);
    } catch {
      setError('Failed to load enquiries');
    } finally {
      setLoading(false);
    }
  }, []);

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
    } catch {
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
    } catch {
      return { success: false, error: 'Failed to update enquiry' };
    }
  };

  // FIX: wrapped in useCallback so EnquiryDetailsPage's useEffect
  // doesn't re-run infinitely (stable reference, only changes when enquiries change)
  const getEnquiryById = useCallback((id) => {
    return enquiries.find(e => e.id === id);
  }, [enquiries]);

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
