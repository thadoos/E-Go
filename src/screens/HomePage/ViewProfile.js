import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Image, ScrollView } from "react-native";
import { MedicalBottomSheet } from "../../components/Medical";
import { getDatabase, ref, get } from "firebase/database";
import { getAuth } from "firebase/auth";
const userProfileImage = require("../../../assets/userprofile.jpeg");

export const ViewProfile = () => {
  const [userData, setUserData] = useState({});
  const patientID = 39254 // change this so it retrieves to FHIR data from Firebase of this user

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
      <ScrollView contentContainerStyle={styles.subContainer} style={{ width: '65%' }}>
        <Image source={userData.avatar ? {uri: userData.avatar} : userProfileImage} style={styles.profileImage} />
        <Text style={styles.username}>{userData.firstName} {userData.lastName}</Text>
        <View style={styles.infoContainer}>
          <InfoRow title="Address:" value={userData.address}/>
          <InfoRow title="Email:" value={userData.email} styleType="oneLine"/>
          <InfoRow title="Role:" value={userData.role} styleType="oneLine" />
          <InfoRow title="Phone No.:" value={userData.phone} styleType="oneLine" />
          <InfoRow title="Gender:" value={userData.gender} styleType="oneLine" />
          <InfoRow title="FHIR ID:" value={userData.fhirID} styleType="oneLine" />
          
        </View>
      </ScrollView>
      <MedicalBottomSheet patientID={userData.fhirID} setSnapPoint={0}/>
    </View>
  );
};

const InfoRow = ({ title, value, styleType }) => {
  return (
    <View style={[styles.infoRow, styleType==="oneLine" && styles.oneLine]}> 

      <Text style={styles.title}>{title}</Text>
      <Text style={styles.value}>{value}</Text>
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#DCE1DE",
    alignItems: "center",
    justifyContent: 'center',
  },

  subContainer:{
    width: '100%',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  username: {
    fontSize: 30,
    fontWeight: "900",
    textAlign: "center",
    marginVertical: 25,
  },
  profileImage: {
    width: 200,
    height: 200,
    borderRadius: 100,
  },
  infoContainer: {
    width: "100%",
    marginBottom: 20,
  },
  infoRow: {
    marginBottom: 10,
  },
  oneLine:{
    flexDirection: 'row',
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginRight: 10,
  },
  value: {
    fontSize: 18,
    
  },
});

