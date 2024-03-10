import React, { useState, useEffect, useRef } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import MapView, { Marker, PROVIDER_GOOGLE, Callout } from 'react-native-maps';
import * as FileSystem from 'expo-file-system';
import * as Location from 'expo-location';
import { shareAsync } from 'expo-sharing';
import { getDatabase, ref, get } from "firebase/database";
import { MedicalBottomSheet } from './Medical';

function getDistance(lat1, lon1, lat2, lon2) {
  var R = 6371; // Radius of the earth in km
  var dLat = (lat2 - lat1) * Math.PI / 180;
  var dLon = (lon2 - lon1) * Math.PI / 180;
  var a =
    0.5 - Math.cos(dLat) / 2 +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
    (1 - Math.cos(dLon)) / 2;
  return R * 2 * Math.asin(Math.sqrt(a));
}

export const Map = () => {
  const [hasPermission, setHasPermission] = useState(false);
  const [doctorLocation, setDoctorLocation] = useState(null);
  const [casualties, setCasualties] = useState([]);
  const mapRef = useRef(null);
  const [patientID, setPatientID] = useState(null);
  const generateCasualties = async () => {
    const db = getDatabase();
    const casualtiesRef = ref(db, 'casualties');
    const snapshot = await get(casualtiesRef);
    if (snapshot.exists()) {
      const data = snapshot.val();
      let casualtyArray = [];
      for (let id in data) {
        console.log(data[id]);
        casualtyArray.push({
          description: data[id].description,
          symptoms: data[id].symptoms,
          location: data[id].location,
          fhirID: data[id].fhirID,
          latitude: parseFloat(data[id].latitude),
          longitude: parseFloat(data[id].longitude),
        });
      }
      return casualtyArray;
    } else {
      console.log("No data available");
      return [];
    }
  };

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      setHasPermission(status === 'granted');

      if (status === 'granted') {
        let location = await Location.getCurrentPositionAsync({});
        setDoctorLocation({
          latitude: location.coords.latitude,
          longitude: location.coords.longitude
        });

        const newCasualties = await generateCasualties();
        setCasualties(newCasualties);
      }
    })();
  }, []);

  if (!hasPermission) {
    return <Text>No access to location</Text>;
  }

  return (
    <View style={styles.container}>
      {doctorLocation ? (
        <MapView
          provider={PROVIDER_GOOGLE}
          ref={mapRef}
          style={styles.map}
          initialRegion={{
            latitude: doctorLocation.latitude,
            longitude: doctorLocation.longitude,
            latitudeDelta: 0.005,
            longitudeDelta: 0.005,
          }}
        >
          <Marker
            coordinate={doctorLocation}
            title="You"
            pinColor="#0000ff"
          />
          {casualties.map((casualty, index) => {
            const { location } = casualty;
            if (!location || !location.latitude || !location.longitude) {
              console.error(`Invalid coordinates for casualty ${index}: ${location?.latitude}, ${location?.longitude}`);
              return null;
            }

            return (
              <Marker
                key={casualty.id}
                coordinate={{
                  latitude: parseFloat(location.latitude),
                  longitude: parseFloat(location.longitude)
                }}
                pinColor="#ff0000"
                onPress={()=>{
                  console.log("pressed")
                  setPatientID(casualty.fhirID)
                  console.log(casualty)
                }}
              >
                <Callout
                  
                >
                  <Text>Description: {casualty.description}</Text>
                  <Text>Symptoms: {casualty.symptoms}</Text>
                  <Text>Location: {location.location}</Text>
                </Callout>
              </Marker>
            );
          })}
        </MapView>
      ) : (
        <Text>Loading...</Text>
      )}

      <MedicalBottomSheet patientID = {patientID} setSnapPoint={0}/>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  map: {
    width: '100%',
    height: '100%',
  },
});