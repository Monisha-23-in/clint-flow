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
