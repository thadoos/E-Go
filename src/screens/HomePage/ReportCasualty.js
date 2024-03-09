import { StyleSheet, Text, View, TextInput } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import {useState} from 'react'
import { SignButton, MultiLineDetailsEntry } from '../../components'

export const ReportCasualty = () => {
  const [description, setDescription] = useState("");
  const [symptoms, setSymptoms] = useState("");
  const [location, setLocation] = useState("");

  return (
    <View alignItems="center">
      <View style={styles.nameContainer}>
        <Ionicons
          name="person"
          size={100}
          color="#888888"
          style={styles.ioniconStyle}
        />
      </View>

      <View style={{marginBottom: 30}}>
      <MultiLineDetailsEntry titleText={"Description of Incident: "} lineNumber={3} text={description} setText={setDescription} />
      <MultiLineDetailsEntry titleText={"Symptoms: "} lineNumber={3} text={symptoms} setText={setSymptoms} />
      <MultiLineDetailsEntry titleText={"Location: "} lineNumber={1} text={location} setText={setLocation} />
      </View>

      <SignButton text="Submit" borderStyle="buttonContainer" textStyle="buttonText" navigationTarget="Home Page" />
    </View>
  )
}

export default ReportCasualty

const styles = StyleSheet.create({
  nameContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: "20%",
    borderRadius: 65,
    borderWidth: .5,
    width: 130,
    height: 130,
  },

  lineEntry: {
    borderColor: 'gray',
    borderWidth: 1,
    width: 300,
    alignSelf: 'center',
    height: 40,
    maxHeight: 150,
    backgroundColor: '#EFEFE',
    marginBottom: 10,
    paddingHorizontal: 10,
    borderRadius: 10,
    borderWidth: .5,
    paddingLeft: 15,

  },
  ioniconStyle: {
  }
})