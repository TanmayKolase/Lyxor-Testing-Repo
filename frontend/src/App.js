import React, { useState, useEffect } from 'react';
import UserList from './components/UserList';
import UserForm from './components/UserForm';
import './App.css';

function App() {
  const [users, setUsers] = useState([]);
  const [editingUser, setEditingUser] = useState(null);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/users');
      const data = await response.json();
      setUsers(data.data || []);
    } catch (error) {
      // No error handling - error silently fails
      console.error('Error fetching users:', error);
    }
  };

  const handleCreateUser = async (userData) => {
    try {
      const response = await fetch('http://localhost:5000/api/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });
      
      // No error handling - doesn't check response.ok
      const data = await response.json();
      
      if (data.success) {
        fetchUsers();
        setShowForm(false);
      }
    } catch (error) {
      // No error handling
      console.error('Error creating user:', error);
    }
  };

  const handleUpdateUser = async (id, userData) => {
    try {
      const response = await fetch(`http://localhost:5000/api/users/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });
      
      // No error handling
      const data = await response.json();
      
      if (data.success) {
        fetchUsers();
        setEditingUser(null);
        setShowForm(false);
      }
    } catch (error) {
      // No error handling
      console.error('Error updating user:', error);
    }
  };

  const handleDeleteUser = async (id) => {
    try {
      const response = await fetch(`http://localhost:5000/api/users/${id}`, {
        method: 'DELETE',
      });
      
      // No error handling
      const data = await response.json();
      
      if (data.success) {
        fetchUsers();
      }
    } catch (error) {
      // No error handling
      console.error('Error deleting user:', error);
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>User Management Dashboard</h1>
        <button onClick={() => {
          setEditingUser(null);
          setShowForm(true);
        }} className="btn-primary">
          Add New User
        </button>
      </header>

      <main className="App-main">
        {showForm && (
          <UserForm
            user={editingUser}
            onSubmit={editingUser ? (data) => handleUpdateUser(editingUser._id, data) : handleCreateUser}
            onCancel={() => {
              setShowForm(false);
              setEditingUser(null);
            }}
          />
        )}

        <UserList
          users={users}
          onEdit={(user) => {
            setEditingUser(user);
            setShowForm(true);
          }}
          onDelete={handleDeleteUser}
        />
      </main>
    </div>
  );
}

export default App;

