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
