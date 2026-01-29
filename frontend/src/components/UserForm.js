import React, { useState, useEffect } from 'react';
import './UserForm.css';

function UserForm({ user, onSubmit, onCancel }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    role: 'user',
    password: ''
  });

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || '',
        email: user.email || '',
        phone: user.phone || '',
        role: user.role || 'user',
        password: user.password || ''
      });
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // No validation - empty fields allowed
    // No email format validation
    // No password strength validation
    // No phone format validation
    
    onSubmit(formData);
  };

  return (
    <div className="user-form-container">
      <div className="user-form">
        <h2>{user ? 'Edit User' : 'Add New User'}</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter name"
              // No required attribute
              // No minLength validation
            />
            {/* No validation message */}
          </div>

          <div className="form-group">
            <label>Email</label>
            <input
              type="text" // Should be type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter email"
              // No required attribute
              // No email format validation
            />
            {/* No validation message */}
          </div>

          <div className="form-group">
            <label>Phone</label>
            <input
              type="text"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="Enter phone"
              // No required attribute
              // No phone format validation
            />
            {/* No validation message */}
          </div>

          <div className="form-group">
            <label>Role</label>
            <select
              name="role"
              value={formData.role}
              onChange={handleChange}
            >
              <option value="user">User</option>
              <option value="admin">Admin</option>
            </select>
          </div>

          <div className="form-group">
            <label>Password</label>
            <input
              type="text" // Should be type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter password"
              // No required attribute
              // No password strength validation
              // No minLength validation
            />
            {/* No validation message */}
          </div>

          <div className="form-actions">
            <button type="submit" className="btn-submit">
              {user ? 'Update' : 'Create'}
            </button>
            <button type="button" onClick={onCancel} className="btn-cancel">
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default UserForm;

