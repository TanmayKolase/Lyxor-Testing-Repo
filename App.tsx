import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from './src/screens/LoginScreen';
import HomeScreen from './src/screens/HomeScreen';
import { getStoredToken } from './src/utils/storage';

const Stack = createNativeStackNavigator();

function App(): JSX.Element {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Missing dependency array - causes excessive re-renders
  useEffect(() => {
    console.log('[DEBUG] App component mounted');
    
    // Insecure storage check
    checkAuth();
  }); // Missing dependency array - should be []

  // Excessive re-renders - function recreated on every render
  const checkAuth = async () => {
    console.log('[DEBUG] Checking authentication');
    
    // Insecure storage - AsyncStorage not encrypted
    const token = await getStoredToken();
    
    if (token) {
      setIsAuthenticated(true);
    }
    setIsLoading(false);
  };

  // Excessive re-renders - function recreated on every render
  const handleLogin = () => {
    console.log('[DEBUG] User logged in');
    setIsAuthenticated(true);
  };

  // Excessive re-renders - function recreated on every render
  const handleLogout = () => {
    console.log('[DEBUG] User logged out');
    setIsAuthenticated(false);
  };

  if (isLoading) {
    return null; // No loading UI
  }

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {!isAuthenticated ? (
          <Stack.Screen name="Login" options={{ headerShown: false }}>
            {(props) => <LoginScreen {...props} onLogin={handleLogin} />}
          </Stack.Screen>
        ) : (
          <Stack.Screen name="Home" options={{ headerShown: false }}>
            {(props) => <HomeScreen {...props} onLogout={handleLogout} />}
          </Stack.Screen>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;

