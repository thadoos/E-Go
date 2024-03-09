import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
// Import your screen components here
import { FrontPage, SignUp } from '../screens/Authorisation';
import { HomeNavigation } from './HomeNavigation';

const Stack = createStackNavigator();

export function AuthNavigation() {
  const [initialRoute, setInitialRoute] = useState("Login");

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, user => {
      setInitialRoute(user ? "Home Page" : "Login");
    });

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={initialRoute} screenOptions={{headerShown:false}}>
        <Stack.Screen 
          name="Login" 
          component={FrontPage} 
          options={{ headerShown:false}}
        />
        <Stack.Screen 
          name="Sign Up" 
          component={SignUp} 
          options={{
            headerStyle: {
              backgroundColor: '#DCE1DE',
            },
          }}
        />
        <Stack.Screen 
          name="Home Page" 
          component={HomeNavigation} 
          options={{
            headerStyle: {
              backgroundColor: '#DCE1DE',
            },
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}