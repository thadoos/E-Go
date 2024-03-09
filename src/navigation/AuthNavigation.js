import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

// Import your screen components here
import { FrontPage, SignUp } from '../screens/Authorisation';
import { HomeNavigation } from './HomeNavigation';

const Stack = createStackNavigator();

export function AuthNavigation() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown:false}}>
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