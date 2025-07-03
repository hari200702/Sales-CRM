import React, { useState, useEffect } from 'react';
import { useAppContext } from '../context/AppContext';
import { useSelector, useDispatch } from 'react-redux';
import {
  fetchAdminProfile,
  updateAdminProfile,
  clearSettings,
  clearUpdateStatus
} from '../store/settingsSlics';

const Settings = () => {
  const { globalFilter } = useAppContext();
  const dispatch = useDispatch();

  const { profile, loading, error,updateStatus } = useSelector(state => state.settings);

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  useEffect(() => {
    dispatch(fetchAdminProfile());

    return () => {
      dispatch(clearSettings());
      dispatch(clearUpdateStatus());
    };
  }, []);

  useEffect(() => {
    if (profile) {
      setFormData(prev => ({
        ...prev,
        firstName: profile.firstName || '',
        lastName: profile.lastName || '',
        email: profile.email || ''
      }));
    }
  }, [profile]);

  useEffect(() => {
    if (error) {
      alert(error);
    }
  }, [error]);

  useEffect(() => {
    if (updateStatus) {
      alert(updateStatus);
    }
  }, [updateStatus]);

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updateAdminProfile(formData));
  };

  if (loading) {
        return <div className="loader">Loading Profile...</div>;
    }
    if (error) {
        alert("Error : " , error)
    }

  return (
    <>
      <div className="breadcrumb">Home &gt; Settings</div>

      <div className="settingsFormWrapper">
        <h4>Edit Profile</h4>

        <form className="settingsForm" onSubmit={handleSubmit}>
          <div className="formGroup">
            <label htmlFor="firstName">First name</label>
            <input
              id="firstName"
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
            />
          </div>

          <div className="formGroup">
            <label htmlFor="lastName">Last name</label>
            <input
              id="lastName"
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
            />
          </div>

          <div className="formGroup">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
            />
          </div>

          <div className="formGroup">
            <label htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
            />
          </div>

          <div className="formGroup">
            <label htmlFor="confirmPassword">Confirm Password</label>
            <input
              id="confirmPassword"
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
            />
          </div>

          <div className="saveBtnWrapper">
            <button type="submit" className="saveBtn">
              Save
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default Settings;

