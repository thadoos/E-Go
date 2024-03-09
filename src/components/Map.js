import React, { useState, useEffect, useRef } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import MapView, { Marker, Callout, PROVIDER_GOOGLE } from 'react-native-maps';
import * as FileSystem from 'expo-file-system';
import * as Location from 'expo-location';
import { shareAsync } from 'expo-sharing';

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

export function Map() {
  const [hasPermission, setHasPermission] = useState(false);
  const [doctorLocation, setDoctorLocation] = useState(null);
  const [casualties, setCasualties] = useState([]);
  const [closestCasualtyIndex, setClosestCasualtyIndex] = useState(null);
  const mapRef = useRef(null);

  const generateCasualties = () => {
    let casualtyArray = [];
    for (let i = 0; i < 5; i++) { // Generate 5 casualties for demonstration
      casualtyArray.push({
        id: i,
        name: `Casualty ${i + 1}`,
        age: Math.floor(Math.random() * 30) + 20, // Random age between 20 and 50
        gender: Math.random() > 0.5 ? 'Male' : 'Female',
        condition: 'Stable',
        latitude: Math.random() * 180 - 90,
        longitude: Math.random() * 360 - 180,
      });
    }
    return casualtyArray;
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

        const newCasualties = generateCasualties();
        setCasualties(newCasualties);

        let closestDistance = Number.MAX_VALUE;
        let closestIndex = null;
        newCasualties.forEach((casualty, index) => {
          const distance = getDistance(location.coords.latitude, location.coords.longitude, casualty.latitude, casualty.longitude);
          if (distance < closestDistance) {
            closestDistance = distance;
            closestIndex = index;
          }
        });
        setClosestCasualtyIndex(closestIndex);
      }
    })();
  }, []);

  if (!hasPermission) {
    return <Text>No access to location</Text>;
  }

  return (
    <View style={styles.container}>
      <MapView
        provider={PROVIDER_GOOGLE}
        ref={mapRef}
        style={styles.map}
        initialRegion={{
          latitude: doctorLocation ? doctorLocation.latitude : 0,
          longitude: doctorLocation ? doctorLocation.longitude : 0,
          latitudeDelta: 100,
          longitudeDelta: 100,
        }}
      >
        {doctorLocation && (
          <Marker
            coordinate={doctorLocation}
            title="Doctor/Paramedic"
            pinColor="#0000ff"
          />
        )}
        {casualties.map((casualty, index) => {
          const distance = doctorLocation ? getDistance(doctorLocation.latitude, doctorLocation.longitude, casualty.latitude, casualty.longitude) : 0;
          return (
            <Marker
              key={casualty.id}
              coordinate={{ latitude: casualty.latitude, longitude: casualty.longitude }}
              pinColor={index === closestCasualtyIndex ? "#ff0000" : "#ffa500"} // Closest is red, others are orange
              onPress={() => alert(`Name: ${casualty.name}\nAge: ${casualty.age}\nGender: ${casualty.gender}\nCondition: ${casualty.condition}\nLocation: (${casualty.latitude.toFixed(2)}, ${casualty.longitude.toFixed(2)})\nDistance: ${distance.toFixed(2)} km`)}
            />
          );
        })}
      </MapView>
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
