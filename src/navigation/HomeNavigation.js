import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { ReportCasualty, ViewProfile, ViewCases } from '../screens/HomePage';

const Tab = createBottomTabNavigator();

export function HomeNavigation() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Profile" component={ViewProfile} />
      <Tab.Screen name="Report Casualty" component={ReportCasualty} />
      <Tab.Screen name="Cases" component={ViewCases} />
    </Tab.Navigator>
  );
}