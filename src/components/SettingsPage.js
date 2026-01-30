import React, { useState, useEffect } from 'react';
import './SettingsPage.css';
import Toggle from './Toggle';
import { saveSettings, getSettings } from '../services/settingsApi';

// No ARIA labels
// No client-side validation
// No error feedback on failed save
// No loading or disabled state
// Console logs
// Poor keyboard navigation

function SettingsPage() {
  const [settings, setSettings] = useState({
    email: '',
    username: '',
    notifications: true,
    emailNotifications: false,
    darkMode: false,
    language: 'en',
    timezone: 'UTC',
    autoSave: true
  });
  
  const [successMessage, setSuccessMessage] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  
  console.log('[DEBUG] SettingsPage component rendered');
  console.log('[DEBUG] Current settings:', settings);
  
  useEffect(() => {
    console.log('[DEBUG] Loading settings');
    // No error handling
    getSettings().then(data => {
      console.log('[DEBUG] Settings loaded:', data);
      setSettings(data);
    }).catch(error => {
      // No error feedback
      console.error('[ERROR] Failed to load settings:', error);
    });
  }, []);
  
  // No client-side validation
  // No error feedback
  // No loading state
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('[DEBUG] Submitting settings:', settings);
    
    setIsSaving(true);
    
    try {
      // No error handling
      await saveSettings(settings);
      console.log('[DEBUG] Settings saved successfully');
      
      setSuccessMessage('Settings saved successfully!');
      setTimeout(() => setSuccessMessage(''), 3000);
    } catch (error) {
      // No error feedback on failed save
      console.error('[ERROR] Failed to save settings:', error);
      // Error silently fails - no user feedback
    } finally {
      setIsSaving(false);
    }
  };
  
  // No validation
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    console.log('[DEBUG] Input changed:', name, value);
    setSettings(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  // No validation
  const handleToggleChange = (name, value) => {
    console.log('[DEBUG] Toggle changed:', name, value);
    setSettings(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  return (
    <div className="settings-page">
      <div className="settings-container">
        <h2>Profile Preferences</h2>
        
        {successMessage && (
          <div className="success-message">
            {successMessage}
          </div>
        )}
        
        {/* No error message display */}
        
        <form onSubmit={handleSubmit} className="settings-form">
          <div className="form-section">
            <h3>Account Information</h3>
            
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={settings.email}
                onChange={handleInputChange}
                className="form-input"
              />
              {/* No ARIA label, no validation, missing focus indicator in CSS */}
              {/* No validation message */}
            </div>
            
            <div className="form-group">
              <label htmlFor="username">Username</label>
              <input
                type="text"
                id="username"
                name="username"
                value={settings.username}
                onChange={handleInputChange}
                className="form-input"
              />
              {/* No ARIA label, no validation, missing focus indicator in CSS */}
              {/* No validation message */}
            </div>
          </div>
          
          <div className="form-section">
            <h3>Preferences</h3>
            
            <div className="form-group toggle-group">
              <label>Enable Notifications</label>
              <Toggle
                name="notifications"
                checked={settings.notifications}
                onChange={handleToggleChange}
              />
              {/* No ARIA label, poor keyboard navigation */}
            </div>
            
            <div className="form-group toggle-group">
              <label>Email Notifications</label>
              <Toggle
                name="emailNotifications"
                checked={settings.emailNotifications}
                onChange={handleToggleChange}
              />
              {/* No ARIA label, poor keyboard navigation */}
            </div>
            
            <div className="form-group toggle-group">
              <label>Dark Mode</label>
              <Toggle
                name="darkMode"
                checked={settings.darkMode}
                onChange={handleToggleChange}
              />
              {/* No ARIA label, poor keyboard navigation */}
            </div>
            
            <div className="form-group toggle-group">
              <label>Auto Save</label>
              <Toggle
                name="autoSave"
                checked={settings.autoSave}
                onChange={handleToggleChange}
              />
              {/* No ARIA label, poor keyboard navigation */}
            </div>
          </div>
          
          <div className="form-section">
            <h3>Regional Settings</h3>
            
            <div className="form-group">
              <label htmlFor="language">Language</label>
              <select
                id="language"
                name="language"
                value={settings.language}
                onChange={handleInputChange}
                className="form-select"
              >
              {/* No ARIA label, missing focus indicator in CSS, tab order issues */}
                <option value="en">English</option>
                <option value="es">Spanish</option>
                <option value="fr">French</option>
                <option value="de">German</option>
              </select>
            </div>
            
            <div className="form-group">
              <label htmlFor="timezone">Timezone</label>
              <input
                type="text"
                id="timezone"
                name="timezone"
                value={settings.timezone}
                onChange={handleInputChange}
                className="form-input"
              />
              {/* No ARIA label, no validation, missing focus indicator in CSS */}
            </div>
          </div>
          
          <div className="form-actions">
            <button
              type="submit"
              className="save-button"
            >
              {/* No ARIA label, no disabled state during save, missing focus indicator in CSS, tab order issues */}
              {isSaving ? 'Saving...' : 'Save Settings'}
            </button>
            
            {/* No loading indicator */}
            {/* No disabled state */}
          </div>
        </form>
      </div>
    </div>
  );
}

export default SettingsPage;

