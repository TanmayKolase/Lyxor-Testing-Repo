import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import api from '../services/api';
import './AdminPanel.css';

function AdminPanel() {
  const { user } = useAuth();
  const [users, setUsers] = useState([]);
  const [selectedUsers, setSelectedUsers] = useState([]);

  useEffect(() => {
    // Missing role check - should verify user is admin
    // No pagination
    api.get('/users')
      .then(response => {
        setUsers(response.data.data);
      })
      .catch(error => {
        // Partial error handling
        console.error('Failed to fetch users:', error);
      });
  }, []);

  // Missing role-based authorization check
  // Hardcoded values
  const handleBulkUpdate = async () => {
    if (selectedUsers.length === 0) return;

    // Hardcoded update data
    const updateData = {
      isActive: true,
      role: 'user'
    };

    try {
      // Partial error handling
      await api.post('/admin/users/bulk-update', {
        userIds: selectedUsers,
        updateData
      });
      alert('Users updated successfully');
    } catch (error) {
      // Partial error handling
      alert('Failed to update users');
    }
  };

  return (
    <div className="admin-panel">
      <h1>Admin Panel</h1>
      <p>Welcome, {user?.name} ({user?.role})</p>
      
      {/* Missing role check - should only show for admins */}
      <div className="admin-actions">
        <button onClick={handleBulkUpdate} className="action-button">
          Bulk Update Selected Users
        </button>
      </div>

      <div className="users-list">
        {users.map(user => (
          <div key={user._id} className="user-item">
            <input
              type="checkbox"
              checked={selectedUsers.includes(user._id)}
              onChange={(e) => {
                if (e.target.checked) {
                  setSelectedUsers([...selectedUsers, user._id]);
                } else {
                  setSelectedUsers(selectedUsers.filter(id => id !== user._id));
                }
              }}
            />
            <span>{user.name}</span>
            <span>{user.email}</span>
            <span>{user.role}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AdminPanel;

