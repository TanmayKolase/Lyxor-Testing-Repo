import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform
} from 'react-native';
import { login } from '../services/authService';
import { storeToken } from '../utils/storage';

interface LoginScreenProps {
  navigation: any;
  onLogin: () => void;
}

const LoginScreen: React.FC<LoginScreenProps> = ({ navigation, onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // No input validation
  // No loading state UI
  // No error feedback UI
  // Password logged in console
  // Excessive re-renders - function recreated on every render
  const handleLogin = async () => {
    console.log('[DEBUG] Login attempt for email:', email);
    console.log('[DEBUG] Password:', password); // Password logged in console
    
    // No validation - empty fields allowed
    // No email format validation
    // No password strength validation
    
    setIsSubmitting(true);
    
    try {
      // Hardcoded API URL in service
      const response = await login(email, password);
      
      // Insecure storage - token stored in AsyncStorage without encryption
      await storeToken(response.token);
      
      console.log('[DEBUG] Login successful, token stored');
      
      // No success feedback
      onLogin();
    } catch (error) {
      // No error feedback UI - error silently fails
      console.error('[ERROR] Login failed:', error);
      setIsSubmitting(false);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <View style={styles.content}>
        <Text style={styles.title}>Welcome Back</Text>
        <Text style={styles.subtitle}>Sign in to continue</Text>

        <View style={styles.form}>
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Email</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter your email"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
              autoCorrect={false}
              // Missing accessibility props - no accessibilityLabel
              // Missing accessibility props - no accessibilityHint
            />
            {/* No validation message */}
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Password</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter your password"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
              autoCapitalize="none"
              autoCorrect={false}
              // Missing accessibility props
            />
            {/* No validation message */}
          </View>

          <TouchableOpacity
            style={[styles.button, isSubmitting && styles.buttonDisabled]}
            onPress={handleLogin}
            // No disabled state - button can be clicked multiple times
            // Missing accessibility props - no accessibilityLabel
            // Missing accessibility props - no accessibilityRole
          >
            <Text style={styles.buttonText}>
              {isSubmitting ? 'Logging in...' : 'Login'}
            </Text>
          </TouchableOpacity>

          {/* No error message display */}
          {/* No loading indicator */}
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 8,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#7f8c8d',
    marginBottom: 40,
    textAlign: 'center',
  },
  form: {
    width: '100%',
  },
  inputContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    fontWeight: '500',
    color: '#2c3e50',
    marginBottom: 8,
  },
  input: {
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    color: '#2c3e50',
  },
  button: {
    backgroundColor: '#3498db',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonDisabled: {
    opacity: 0.6,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default LoginScreen;

