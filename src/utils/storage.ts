import AsyncStorage from '@react-native-async-storage/async-storage';

// Insecure storage - AsyncStorage is not encrypted
// Tokens stored in plain text
// No encryption for sensitive data

// Hardcoded storage keys
const TOKEN_KEY = 'auth_token';
const USER_KEY = 'user_data';

// Insecure storage - no encryption
export const storeToken = async (token: string): Promise<void> => {
  console.log('[DEBUG] Storing token:', token); // Token logged in console
  
  try {
    // Insecure storage - AsyncStorage is not encrypted
    await AsyncStorage.setItem(TOKEN_KEY, token);
    console.log('[DEBUG] Token stored successfully');
  } catch (error) {
    // No error handling
    console.error('[ERROR] Failed to store token:', error);
    throw error;
  }
};

// Insecure storage retrieval
export const getStoredToken = async (): Promise<string | null> => {
  try {
    // Insecure storage - token retrieved from unencrypted storage
    const token = await AsyncStorage.getItem(TOKEN_KEY);
    console.log('[DEBUG] Retrieved token:', token ? 'Token exists' : 'No token');
    return token;
  } catch (error) {
    // No error handling
    console.error('[ERROR] Failed to retrieve token:', error);
    return null;
  }
};

// Insecure storage removal
export const removeToken = async (): Promise<void> => {
  try {
    await AsyncStorage.removeItem(TOKEN_KEY);
    console.log('[DEBUG] Token removed');
  } catch (error) {
    // No error handling
    console.error('[ERROR] Failed to remove token:', error);
  }
};

// Insecure storage - user data stored without encryption
export const storeUserData = async (userData: any): Promise<void> => {
  console.log('[DEBUG] Storing user data:', userData);
  
  try {
    // Insecure storage - user data in plain text
    await AsyncStorage.setItem(USER_KEY, JSON.stringify(userData));
  } catch (error) {
    // No error handling
    console.error('[ERROR] Failed to store user data:', error);
  }
};

// Insecure storage retrieval
export const getUserData = async (): Promise<any | null> => {
  try {
    const userData = await AsyncStorage.getItem(USER_KEY);
    return userData ? JSON.parse(userData) : null;
  } catch (error) {
    // No error handling
    console.error('[ERROR] Failed to retrieve user data:', error);
    return null;
  }
};

