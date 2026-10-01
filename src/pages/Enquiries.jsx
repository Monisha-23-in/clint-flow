import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, Search, Download } from 'lucide-react';
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

  const exportToCSV = () => {
    if (filteredEnquiries.length === 0) return;
    
    const headers = ['Client Name', 'Contact Person', 'Email', 'Phone', 'Service', 'Source', 'Status', 'Assigned To', 'Follow-up Date'];
    const csvData = filteredEnquiries.map(e => [
      `"${e.clientName}"`,
      `"${e.contactPerson}"`,
      `"${e.email}"`,
      `"${e.phone}"`,
      `"${e.service}"`,
      `"${e.source}"`,
      `"${e.status}"`,
      `"${e.assignedTo}"`,
      `"${e.followUpDate || ''}"`
    ]);
    
    const csvContent = [headers.join(','), ...csvData.map(row => row.join(','))].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', `enquiries_export_${new Date().toISOString().split('T')[0]}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  if (loading) return <LoadingState />;

  return (
    <div>
      <div className="flex-between mb-24">
        <div>
          <button className="btn btn-secondary" onClick={exportToCSV} disabled={filteredEnquiries.length === 0} style={{ padding: '10px 16px' }}>
            <Download size={18} /> Export CSV
          </button>
        </div>
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
