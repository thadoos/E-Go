import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import FrontPage from './app/screens/FrontPage';
import SignUp from './app/screens/SignUp';
import { NavigationContainer, createNavigationContainerRef } from '@react-navigation/native';
import { TouchableOpacity } from 'react-native-web';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen 
          name="Front Page" 
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
      </Stack.Navigator>
    </NavigationContainer>
    // <View style={styles.container}>
    //   {/* <SignUp /> */}
    //   <FrontPage />
    //   {/* <Text>Open up App.js to start working on your app!</Text> */}
    //   {/* <StatusBar style="auto" /> */}
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
