import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer, createNavigationContainerRef } from '@react-navigation/native';
import FrontPage from './app/screens/FrontPage';

import SignUp from './app/screens/SignUp';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{headerShown:false}} 
      >
        <Stack.Screen 
          name="Login" 
          component = { FrontPage } 
          options = {{ headerShown:false}}
        />

        <Stack.Screen 
          name="Sign Up" 
          component = { SignUp } 
          options = {{
            headerStyle: {
              backgroundColor: '#DCE1DE',

            },
          }}
        />

        <Stack.Screen 
          name="Log In" 
          component = { SignUp } // To be changed once the dashboard is done
          options = {{
            headerStyle: {
              backgroundColor: '#DCE1DE',
            },
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>

    // <View style={styles.container}>
    //   <DropdownComponent />
    // </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },

  textElements: {
    borderRadius: 10,
  },

  navigation: {
    backgroundColor: '#DCE1DE',
  },
});
