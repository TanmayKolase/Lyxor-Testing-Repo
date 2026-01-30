import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView
} from 'react-native';
import { getUserProfile } from '../services/authService';
import { removeToken } from '../utils/storage';

interface HomeScreenProps {
  navigation: any;
  onLogout: () => void;
}

const HomeScreen: React.FC<HomeScreenProps> = ({ navigation, onLogout }) => {
  const [user, setUser] = useState<any>(null);

  // Missing dependency array - causes excessive re-renders
  useEffect(() => {
    console.log('[DEBUG] HomeScreen mounted');
    loadUserProfile();
  }); // Missing dependency array - should be []

  // Excessive re-renders - function recreated on every render
  const loadUserProfile = async () => {
    console.log('[DEBUG] Loading user profile');
    
    try {
      // Hardcoded API URL in service
      const userData = await getUserProfile();
      setUser(userData);
      console.log('[DEBUG] User profile loaded:', userData);
    } catch (error) {
      // No error handling UI
      console.error('[ERROR] Failed to load profile:', error);
    }
  };

  // Excessive re-renders - function recreated on every render
  const handleLogout = async () => {
    console.log('[DEBUG] Logging out');
    
    // Insecure storage - token removal
    await removeToken();
    onLogout();
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Home</Text>
        
        {user && (
          <View style={styles.profileSection}>
            <Text style={styles.profileName}>{user.name || 'User'}</Text>
            <Text style={styles.profileEmail}>{user.email}</Text>
          </View>
        )}

        <TouchableOpacity
          style={styles.logoutButton}
          onPress={handleLogout}
          // Missing accessibility props
        >
          <Text style={styles.logoutButtonText}>Logout</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  content: {
    padding: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 30,
  },
  profileSection: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 8,
    marginBottom: 20,
  },
  profileName: {
    fontSize: 24,
    fontWeight: '600',
    color: '#2c3e50',
    marginBottom: 8,
  },
  profileEmail: {
    fontSize: 16,
    color: '#7f8c8d',
  },
  logoutButton: {
    backgroundColor: '#e74c3c',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
  },
  logoutButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default HomeScreen;

