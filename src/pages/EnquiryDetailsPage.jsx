import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useEnquiries } from '../hooks/useEnquiries';
import { STATUSES, TEAM_MEMBERS } from '../utils/constants';
import LoadingState from '../components/common/LoadingState';
import Toast from '../components/common/Toast';
import StatusBadge from '../components/common/StatusBadge';
import { Mail, Phone, Calendar as CalendarIcon, User, Briefcase, FileText, Clock, History, Plus } from 'lucide-react';

const EnquiryDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getEnquiryById, updateEnquiry, loading } = useEnquiries();
  
  const enquiry = getEnquiryById(id);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({});
  const [toast, setToast] = useState(null);
  const [isSaving, setIsSaving] = useState(false);

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
      setIsEditing(false);
      setToast({ message: 'Enquiry updated successfully.', type: 'success' });
    } else {
      setToast({ message: result.error, type: 'error' });
    }
    setIsSaving(false);
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'None';
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div>
      <div className="flex-between mb-24">
        <button className="btn btn-secondary" onClick={() => navigate('/enquiries')}>← Back to List</button>
        {!isEditing && (
          <button className="btn btn-primary" onClick={() => { setIsEditing(true); setFormData(enquiry); }}>Edit Enquiry</button>
        )}
      </div>

      <div className="details-grid">
        {/* Left Column */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
          
          <div className="card">
            <h3 className="mb-24" style={{borderBottom: '1px solid var(--border-color)', paddingBottom: '12px', display: 'flex', alignItems: 'center', gap: '8px'}}>
              <User size={18} className="text-primary" /> Client Profile
            </h3>
            <div className="form-grid mb-24">
              <div>
                <div className="details-label">Client / Company Name</div>
                <div className="details-value" style={{fontWeight: 600, fontSize: '1.2rem'}}>{enquiry.clientName}</div>
              </div>
              <div>
                <div className="details-label">Contact Person</div>
                <div className="details-value">{enquiry.contactPerson}</div>
              </div>
              <div>
                <div className="details-label">Email</div>
                <div className="details-value" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Mail size={14} style={{ color: 'var(--text-muted)' }} />
                  <a href={`mailto:${enquiry.email}`} style={{color: 'var(--primary-color)'}}>{enquiry.email}</a>
                </div>
              </div>
              <div>
                <div className="details-label">Phone</div>
                <div className="details-value" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Phone size={14} style={{ color: 'var(--text-muted)' }} />
                  {enquiry.phone}
                </div>
              </div>
            </div>
          </div>

          <div className="card">
            <h3 className="mb-24" style={{borderBottom: '1px solid var(--border-color)', paddingBottom: '12px', display: 'flex', alignItems: 'center', gap: '8px'}}>
              <Briefcase size={18} className="text-primary" /> Enquiry Details
            </h3>
            <div className="form-grid">
              <div>
                <div className="details-label">Service / Requirement</div>
                <div className="details-value">{enquiry.service}</div>
              </div>
              <div>
                <div className="details-label">Source</div>
                <div className="details-value">
                  <span style={{ background: 'rgba(99, 102, 241, 0.1)', padding: '4px 10px', borderRadius: '4px', color: 'var(--primary-color)', fontSize: '0.9rem', fontWeight: 500 }}>
                    {enquiry.source}
                  </span>
                </div>
              </div>
              <div style={{gridColumn: '1 / -1'}}>
                <div className="details-label">Requirement Description</div>
                <div style={{backgroundColor: 'var(--surface-input)', border: '1px solid var(--border-default)', padding: '16px', borderRadius: 'var(--radius-md)', lineHeight: '1.6', color: 'var(--text-primary)'}}>
                  {enquiry.description || 'No description provided by the client.'}
                </div>
              </div>
              <div>
                <div className="details-label">Estimated Budget</div>
                <div className="details-value" style={{ color: 'var(--success)', fontWeight: 600 }}>
                  {enquiry.budget ? `₹${Number(enquiry.budget).toLocaleString('en-IN')}` : 'Not specified'}
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Right Column */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
          
          <div className="card">
            <h3 className="mb-24" style={{borderBottom: '1px solid var(--border-color)', paddingBottom: '12px', display: 'flex', alignItems: 'center', gap: '8px'}}>
              <FileText size={18} className="text-primary" /> Management
            </h3>
            
            <div className="form-group">
              <label className="form-label">Current Status</label>
              {isEditing ? (
                <select className="form-select" name="status" value={formData.status} onChange={handleChange}>
                  {STATUSES.map(s => <option key={s} value={s}>{s}</option>)}
                </select>
              ) : (
                <div><StatusBadge status={enquiry.status} /></div>
              )}
            </div>
            
            <div className="form-group">
              <label className="form-label">Assigned Representative</label>
              {isEditing ? (
                <select className="form-select" name="assignedTo" value={formData.assignedTo} onChange={handleChange}>
                  {TEAM_MEMBERS.map(t => <option key={t} value={t}>{t}</option>)}
                </select>
              ) : (
                <div className="details-value" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <div className="avatar" style={{ width: '24px', height: '24px', fontSize: '0.7rem' }}>
                    {enquiry.assignedTo.charAt(0)}
                  </div>
                  {enquiry.assignedTo}
                </div>
              )}
            </div>
            
            <div className="form-group">
              <label className="form-label">Next Follow-up Action</label>
              {isEditing ? (
                <input type="date" className="form-input" name="followUpDate" value={formData.followUpDate} onChange={handleChange} />
              ) : (
                <div className="details-value" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <CalendarIcon size={16} style={{ color: 'var(--text-muted)' }} />
                  {enquiry.followUpDate ? new Date(enquiry.followUpDate).toLocaleDateString('en-US', { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' }) : 'None scheduled'}
                </div>
              )}
            </div>
            
            <div className="form-group mb-24">
              <label className="form-label">Internal Notes</label>
              {isEditing ? (
                <textarea className="form-textarea" name="notes" value={formData.notes} onChange={handleChange} rows="4" placeholder="Add private notes..."></textarea>
              ) : (
                <div style={{backgroundColor: 'color-mix(in srgb, var(--color-warning) 8%, transparent)', border: '1px solid color-mix(in srgb, var(--color-warning) 25%, transparent)', padding: '16px', borderRadius: 'var(--radius-md)', minHeight: '80px', fontSize: '0.95rem', color: 'var(--text-primary)'}}>
                  {enquiry.notes || <span style={{ color: 'var(--text-secondary)', fontStyle: 'italic' }}>No notes added yet.</span>}
                </div>
              )}
            </div>
            
            {isEditing && (
              <div className="flex-between" style={{ marginTop: '32px', paddingTop: '16px', borderTop: '1px solid var(--border-color)' }}>
                <button className="btn btn-secondary" onClick={() => { setIsEditing(false); setFormData(enquiry); }} disabled={isSaving}>Cancel</button>
                <button className="btn btn-primary" onClick={handleSave} disabled={isSaving}>
                  {isSaving ? 'Saving...' : 'Save Changes'}
                </button>
              </div>
            )}
          </div>

          {!isEditing && (
            <div className="card">
              <h3 className="mb-24" style={{borderBottom: '1px solid var(--border-color)', paddingBottom: '12px', display: 'flex', alignItems: 'center', gap: '8px'}}>
                <History size={18} className="text-primary" /> Activity Log
              </h3>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <div style={{ display: 'flex', gap: '12px' }}>
                  <div style={{ marginTop: '4px', color: 'var(--primary-color)' }}><Clock size={16} /></div>
                  <div>
                    <div style={{ fontSize: '0.9rem', fontWeight: 500 }}>Enquiry Updated</div>
                    <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{formatDate(enquiry.updatedAt)}</div>
                  </div>
                </div>
                
                <div style={{ width: '2px', height: '16px', background: 'var(--border-color)', margin: '-8px 0 -8px 19px' }}></div>
                
                <div style={{ display: 'flex', gap: '12px' }}>
                  <div style={{ marginTop: '4px', color: 'var(--success)' }}><Plus size={16} /></div>
                  <div>
                    <div style={{ fontSize: '0.9rem', fontWeight: 500 }}>Enquiry Created</div>
                    <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{formatDate(enquiry.createdAt)} • via {enquiry.source}</div>
                  </div>
                </div>
              </div>
            </div>
          )}

        </div>
      </div>
      
      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
    </div>
  );
};

export default EnquiryDetailsPage;
