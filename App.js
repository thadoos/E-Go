import { StyleSheet, Text, View, LogBox } from 'react-native';
import { AuthNavigation } from './src/navigation';
// console.disableYellowBox = true;
LogBox.ignoreAllLogs();
export default function App() {
  return (
    <AuthNavigation/>
  )
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

