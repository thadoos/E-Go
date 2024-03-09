import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Image, ScrollView } from "react-native";
import { MedicalBottomSheet } from "../../components/Medical";
import { getDatabase, ref, get } from "firebase/database";
import { getAuth } from "firebase/auth";
const userProfileImage = require("../../../assets/userprofile.jpeg");

export const ViewProfile = () => {
  const [userData, setUserData] = useState({});
  const patientID = "39254" // change this so it retrieves to FHIR data from Firebase of this user

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
  }
  , []);

  return (
    <View style={styles.container}>
    <ScrollView contentContainerStyle={styles.container}>
      <Image source={userProfileImage} style={styles.profileImage} />
      <Text style={styles.username}>{userData.firstName} {userData.lastName}</Text>
      <View style={styles.infoContainer}>
        <InfoRow
          title="Address:"
          value={userData.address}
        />
        <InfoRow title="Birthday:" value="0000/20/203" />
        <InfoRow title="Gender:" value={userData.gender} />
        <InfoRow title="Phone No.:" value="Example phone number" />
      </View>
    </ScrollView>
    <MedicalBottomSheet patientID={patientID} />
  </View>
  );
};

const InfoRow = ({ title, value }) => {
  return (
    <View style={styles.infoRow}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.value}>{value}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: "#DCE1DE",
    alignItems: "center",
    paddingVertical: 20,
  },
  subContainer: {
    flexGrow: 1,
    height: "10%",
    flex: 1,
    backgroundColor: "#DCE1DE",
    alignItems: "center",
    paddingVertical: 20,
  },

  username: {
    fontSize: 30,
    fontWeight: "bold",
    textAlign: "center",
    marginTop: -10,
  },
  profileImage: {
    width: 200,
    height: 200,
    borderRadius: 100,
    marginBottom: 20,
  },
  infoContainer: {
    width: "80%",
    marginBottom: 20,
    marginLeft: -20,
  },
  infoRow: {
    marginBottom: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 5,
  },
  value: {
    fontSize: 15,
  },
});

