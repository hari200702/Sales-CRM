import React, { useState, useEffect } from 'react';
import '../App.css';

const EditEmployee = ({ isOpen, onClose, onSave, employee }) => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    location:'',
    language:''
  });
  

  useEffect(() => {
    if (employee) {
      const [firstName, ...rest] = employee.name.split(' ');
      const lastName = rest.join(' ');
      setFormData({
        firstName: firstName || '',
        lastName: lastName || '',
        email: employee.email || '',
        location: employee.location || '',
        language: employee.language || ''
      });
    }
  }, [employee]);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    const updatedData = {
      firstName: formData.firstName,
      lastName: formData.lastName,
      email: formData.email
    };
    onSave({ id: employee._id, updatedData });
    setFormData({ firstName: '', lastName: '', email: '' });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="modalOverlay">
      <div className="modal">
        <div className="modalHeader">
          <h3>Edit Employee</h3>
          <button className="closeBtn" onClick={onClose}>×</button>
        </div>
        <div className="modalBody">
          <div className="formGroup">
            <label htmlFor="firstName">
              First Name <span style={{ color: 'red' }}>*</span>
            </label>
            <input
              id="firstName"
              name="firstName"
              value={formData.firstName}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="formGroup">
            <label htmlFor="lastName">
              Last Name <span style={{ color: 'red' }}>*</span>
            </label>
            <input
              id="lastName"
              name="lastName"
              value={formData.lastName}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="formGroup">
            <label htmlFor="email">
              Email <span style={{ color: 'red' }}>*</span>
            </label>
            <input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="formGroup">
            <label htmlFor="location">Location</label>
            <input
              id="location"
              name="location"
              value={formData.location}
              disabled
            />
        </div>
        <div className="formGroup">
          <label htmlFor="languages">Preferred Language</label>
          <input
            id="languages"
            name="languages"
            value={formData.language}
            disabled
          />
        </div>
        </div>

        <div className="modalFooter">
          <button className="saveBtn" onClick={handleSave}>
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditEmployee;
