import { View } from 'react-native'
import { StyleSheet } from 'react-native-web';
import { MedicalBottomSheet } from '../../components/Medical';

export const ViewCases = () => {
  const patientID = "39254" // This should be somehow set to the casualty's patientID
  return (
    <View style={styles.container}>
      {/* Map Goes Here */}

      <MedicalBottomSheet patientID = {patientID}/>

    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#DCE1DE",
    alignItems: "center",
  },
})