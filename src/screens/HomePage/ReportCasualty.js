import { StyleSheet, Text, View, TouchableOpacity, ActivityIndicator, Image } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { useState, useEffect } from 'react'
import { SignButton, MultiLineDetailsEntry } from '../../components'
import { getDatabase, ref, get, set, push } from "firebase/database";
import { getAuth } from "firebase/auth";
import * as Location from 'expo-location';
import CasualtyList from '../../components/CasualtyList/CasualtyList';

export const ReportCasualty = () => {
  const [description, setDescription] = useState("");
  const [symptoms, setSymptoms] = useState("");
  const [location, setLocation] = useState("");
  const [currentLocation, setCurrentLocation] = useState(null);
  const [loading, setLoading] = useState(false);
  const [userData, setUserData] = useState({});

    useEffect(() => {
      fetchUserData();
    }
      , []);

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
    setLocation(userData.address);
    // console.log(userData.fhirid);
  };

  const getLocation = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    setLoading(true);


    if (status === 'granted') {
      let location = await Location.getCurrentPositionAsync({});
      setCurrentLocation({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude
      });

      // Reverse geocoding
      const response = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${location.coords.latitude}&lon=${location.coords.longitude}`);
      const data = await response.json();
      setLoading(false);
      setLocation(data.display_name);
    }
  };


  const submitReport = () => {
    if (!description || !symptoms || !location) {
      alert('All fields must be filled out');
      return;
    }

    // Get a reference to the Firebase database
    const db = getDatabase();


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



    // Create a new entry in the "casualties" collection

    // Split the location string into latitude and longitude
    const [lat, long] = location.replace(/[^0-9., -]/g, '').split(/[ ,]+/);
    const casultyRef = ref(db, 'casualties/');
    const newCasualtyRef = push(casultyRef);
    const auth = getAuth();
    const reporterID = auth.currentUser.uid;

    const fhriID = userData.fhirid;


    // Set the values of the new entry
    set(newCasualtyRef, {
      description: description,
      symptoms: symptoms,
      location:{location, latitude: currentLocation.latitude, longitude: currentLocation.longitude},
      userid: reporterID,
      fhrID: fhriID
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
  // create a new button - below is the supposed button code but didn't work (function not called) - declan. (stored a copy of it in case resolved asap)
  <SignButton text="Submit" borderStyle="buttonContainer" textStyle="buttonText" navigationTarget="Home Page" onPress={submitReport} />
  const [showCasualtyModal, setShowCasualtyModal] = useState(false);
  const [fhirID, setfhirID] = useState(null); // Either has 'null' meaning that this person is not in the proximity or the fhirID
  const [casualtyImage, setCasualtyImage] = useState(null);

  return (
    // <View alignItems="center" backgroundColor="#DCE1DE">
    //   <View style={styles.nameContainer}>
    //     {userData.avatar
    //       ? <Image source={{ uri: userData.avatar }} style={styles.profileImage} />
    <View style={styles.container}>
      <TouchableOpacity 
        style={styles.chooseCasualtyButton}
        onPress={() => {
          setShowCasualtyModal(true)
        }}
      >
        {casualtyImage
          ? <Image source={casualtyImage} style={styles.profileImage} />
          : <Ionicons
            name="person"
            size={100}
            color="#888888"
            style={styles.ioniconStyle}
          />
        }

      </TouchableOpacity>

      {showCasualtyModal && <CasualtyList setShowCasualtyModal={setShowCasualtyModal} setfhirID={setfhirID} setCasualtyImage={setCasualtyImage}/>}


      <View style={{ marginBottom: 10 }}>
        <MultiLineDetailsEntry titleText={"Description of Incident: "} lineNumber={3} text={description} setText={setDescription} />
        <MultiLineDetailsEntry titleText={"Symptoms: "} lineNumber={3} text={symptoms} setText={setSymptoms} />
        <MultiLineDetailsEntry
          titleText={"Location: "}
          lineNumber={1}
          text={location}
          setText={setLocation}
        />
        <View alignItems="center">
          {loading ? (
            <ActivityIndicator size="large" color="#0000ff" />
          ) : (
            <>
              {/* Rest of your component */}
              <TouchableOpacity onPress={getLocation}>
                <Text style={styles.locationButton}>Use Current Location</Text>
              </TouchableOpacity>
              {/* Rest of your component */}
            </>
          )}
        </View>

      </View>
      <TouchableOpacity style={styles.buttonContainer} onPress={submitReport}>
        <Text style={styles.buttonText}>Submit</Text>
      </TouchableOpacity>
    </View>
  )
}

export default ReportCasualty

const styles = StyleSheet.create({
  container:{
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    backgroundColor: '#DCE1DE',
  },
  nameContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    // marginTop: "20%",
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

  chooseCasualtyButton:{
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    borderRadius: 65,
    borderWidth: .5,
    width: 130,
    height: 130,
  },

  buttonContainer: {
    width: '75%',
    backgroundColor: '#000',
    paddingVertical: 15,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    borderColor: '#000',
  },
  buttonText: {
    color: '#FFF',
    fontWeight: '700',
  },
  signUpButton: {
    fontSize: 16,
    fontWeight: '800',
    color: '#088AE8',
  },
  locationButton: {
    fontSize: 13,
    fontWeight: '800',
    color: '#088AE8',
    marginTop: 10,
    marginBottom: 10,
  },
  profileImage: {
    width: 130,
    height: 130,
    borderRadius: 100,
  },
})
