import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { ReportCasualty, ViewProfile, ViewCases } from '../screens/HomePage';
import { Ionicons } from '@expo/vector-icons'; // Import Ionicons from @expo/vector-icons
import { getDatabase, ref, get} from "firebase/database";
import { getAuth } from "firebase/auth";
import { useState, useEffect } from 'react';
import { Map } from '../components';

const Tab = createBottomTabNavigator();
export function HomeNavigation() {
  const [userData, setUserData] = useState({});

  const fetchUserData = async () => {
    const db = getDatabase();
    const auth = getAuth();
    const user = auth.currentUser;

    if (user) {
      const userRef = ref(db, `users/${user.uid}`);
      const snapshot = await get(userRef);
      if (snapshot.exists()) {
        setUserData(snapshot.val());
      } else {
        console.log("No data available");
      }
    } else {
      console.log("No user is signed in");
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'Profile') {
            iconName = focused ? 'person' : 'person-outline';
          } else if (route.name === 'Report Casualty') {
            iconName = focused ? 'alert-circle' : 'alert-circle-outline';
          } else if (route.name === 'Cases') {
            iconName = focused ? 'list' : 'list-outline';
          } else if (route.name === 'Map') {
            iconName = focused ? 'map' : 'map-outline'; // Add Ionicon for Map
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
      tabBarOptions={{
        inactiveTintColor: 'gray',
      }}
    >
      <Tab.Screen 
        name="Profile" 
        component={ViewProfile} 
        options={{ tabBarActiveTintColor: 'gray' }}
      />
      <Tab.Screen 
        name="Report Casualty" 
        component={ReportCasualty} 
        options={{ tabBarActiveTintColor: 'red' }}
      />
      {(userData.role === 'Doctor' || userData.role === 'Paramedic')&& (
        <Tab.Screen 
          name="Cases" 
          component={ViewCases} 
          options={{ tabBarActiveTintColor: 'black' }}
        />
      
      )}
      {(userData.role === 'Doctor' || userData.role === 'Paramedic')&& (
      <Tab.Screen 
        name="Map"
        component={Map}
        options={{ tabBarActiveTintColor: 'green' }} // Set active tint color to green
      />)}
    </Tab.Navigator>
  );
}