import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import {useState} from 'react'
import { SignButton, MultiLineDetailsEntry } from '../../components'
import { getDatabase, ref, set, push } from "firebase/database";

export const ReportCasualty = () => {
  const [description, setDescription] = useState("");
  const [symptoms, setSymptoms] = useState("");
  const [location, setLocation] = useState("");

  const submitReport = () => {
    // Get a reference to the Firebase database
    const db = getDatabase();

    // Create a new entry in the "casualties" collection
    const casultyRef = ref(db, 'casualties/');
    const newCasualtyRef = push(casultyRef);

    // Set the values of the new entry
    set(newCasualtyRef, {
      description: description,
      symptoms: symptoms,
      location: location,
    })
      .then(() => {
        alert('Report submitted successfully');
        // Reset the input fields
        setDescription("");
        setSymptoms("");
        setLocation("");
      })
      .catch((error) => {
        alert('Error submitting report:', error);
      });
  };

  // Call the submitReport function when the Submit button is pressed
  // create a new button
  <SignButton text="Submit" borderStyle="buttonContainer" textStyle="buttonText" navigationTarget="Home Page" onPress={submitReport} />

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
      <MultiLineDetailsEntry titleText={"Description of incident: "} lineNumber={3} text={description} setText={setDescription} />
      <MultiLineDetailsEntry titleText={"Symptoms: "} lineNumber={3} text={symptoms} setText={setSymptoms} />
      <MultiLineDetailsEntry titleText={"Location: "} lineNumber={1} text={location} setText={setLocation} />
      
      </View>
      <TouchableOpacity style={styles.buttonContainer} onPress={submitReport}>
        <Text style={styles.buttonText}>Submit</Text>
      </TouchableOpacity>
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
  },

  buttonContainer: {
    width: '75%',
    backgroundColor: '#000',
    paddingVertical: 15,
    borderRadius: 20,
    alignItems: 'center', 
    justifyContent: 'center', 
  },
  buttonText: {
    textAlign: 'center',
    color: '#FFF',
    fontWeight: '700',
  },
  signUpButton: {
    fontSize: 16,
    fontWeight: '800',
    color: '#088AE8',
  }
})
