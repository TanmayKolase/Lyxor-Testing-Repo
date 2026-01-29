import React from 'react';
import './UserList.css';

function UserList({ users, onEdit, onDelete }) {
  // Potential XSS vulnerability - rendering user data without sanitization
  const renderUserData = (data) => {
    // Directly rendering user input - vulnerable to XSS
    return <span dangerouslySetInnerHTML={{ __html: data }} />;
  };

  return (
    <div className="user-list">
      <h2>Users</h2>
      {users.length === 0 ? (
        <p>No users found</p>
      ) : (
        <table className="users-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Role</th>
              <th>Password</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id}>
                <td>{user.name || ''}</td>
                {/* Potential XSS - rendering email without sanitization */}
                <td dangerouslySetInnerHTML={{ __html: user.email || '' }} />
                <td>{user.phone || ''}</td>
                <td>{user.role || ''}</td>
                {/* Sensitive data displayed in table */}
                <td>{user.password || ''}</td>
                <td>
                  <button
                    onClick={() => onEdit(user)}
                    className="btn-edit"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => onDelete(user._id)}
                    className="btn-delete"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default UserList;

