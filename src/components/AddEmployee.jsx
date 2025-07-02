import React, { useState } from 'react';
import '../App.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInfoCircle } from '@fortawesome/free-solid-svg-icons';

const AddEmployee = ({ isOpen, onClose, onSave }) => {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        location: '',
        languages: ''
    });

    const locations = [
        "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh",
        "Goa", "Gujarat", "Haryana", "Himachal Pradesh", "Jharkhand", "Karnataka",
        "Kerala", "Madhya Pradesh", "Maharashtra", "Manipur", "Meghalaya", "Mizoram",
        "Nagaland", "Odisha", "Punjab", "Rajasthan", "Sikkim", "Tamil Nadu",
        "Telangana", "Tripura", "Uttar Pradesh", "Uttarakhand", "West Bengal"
    ];

    const languages = ["Tamil", "English", "Hindi", "Telugu", "Kannada", "Malayalam"];

    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const isFormValid = () => {
        return (
            formData.firstName.trim() !== '' &&
            formData.lastName.trim() !== '' &&
            formData.email.trim() !== '' &&
            formData.location !== '' &&
            formData.languages !== ''
        );
    };

    const handleSave = () => {
        onSave(formData);
        setFormData({
            firstName: '',
            lastName: '',
            email: '',
            location: '',
            languages: ''
        });
        onClose();
    };

    const handleOnClose = () => {
        setFormData({
            firstName: '',
            lastName: '',
            email: '',
            location: '',
            languages: ''
        });
        onClose();
    };

    if (!isOpen) return null;

    return (
        <div className="modalOverlay">
            <div className="modal">
                <div className="modalHeader">
                    <h3>Add New Employee</h3>
                    <button className="closeBtn" onClick={handleOnClose}>×</button>
                </div>
                <div className="modalBody">
                    <div className="formGroup">
                        <label htmlFor="firstName">
                            First name <span style={{ color: 'red' }}>*</span>
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
                            Last name <span style={{ color: 'red' }}>*</span>
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
                        <label htmlFor="location">
                            Location <span style={{ color: 'red' }}>*</span>
                            <span className="info-icon">
                                <FontAwesomeIcon icon={faInfoCircle} />
                                <span className="tooltip-text">Lead will be assigned based on location</span>
                            </span>
                        </label>
                        <select
                            id="location"
                            name="location"
                            value={formData.location}
                            onChange={handleInputChange}
                            required
                        >
                            <option value="">Select Location</option>
                            {locations.map((state) => (
                                <option key={state} value={state}>{state}</option>
                            ))}
                        </select>
                    </div>

                    <div className="formGroup">
                        <label htmlFor="languages">
                            Preferred Language <span style={{ color: 'red' }}>*</span>
                            <span className="info-icon">
                                <FontAwesomeIcon icon={faInfoCircle} />
                                <span className="tooltip-text">Lead will be assigned based on language</span>
                            </span>
                        </label>
                        <select
                            id="languages"
                            name="languages"
                            value={formData.languages}
                            onChange={handleInputChange}
                            required
                        >
                            <option value="">Select Language</option>
                            {languages.map((lang) => (
                                <option key={lang} value={lang}>{lang}</option>
                            ))}
                        </select>
                    </div>



                </div>

                <div className="modalFooter">
                    <button
                        className={`saveBtn ${!isFormValid() ? 'disabled' : ''}`}
                        onClick={handleSave}
                        disabled={!isFormValid()}
                    >
                        Save
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AddEmployee;
