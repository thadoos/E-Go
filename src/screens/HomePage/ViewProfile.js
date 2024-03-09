import React from "react";
import { View, Text, StyleSheet, Image, ScrollView } from "react-native";
import { MedicalBottomSheet } from "../../components/Medical";

const userProfileImage = require("../../../assets/userprofile.jpeg");

export const ViewProfile = () => { 
  const patientID = "39254" // Change this so it retrieves to FHIR id from Firebase of this user

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.subContainer}>
        <Image source={userProfileImage} style={styles.profileImage} />
        <Text style={styles.username}>Name</Text>
        <View style={styles.infoContainer}>
          <InfoRow
            title="Address:"
            value="UCL 2910 Gower Street, London, WC1E 7HZ"
          />
          <InfoRow title="Birthday:" value="0000/20/203" />
          <InfoRow title="Gender:" value="Apache Helicopter" />
          <InfoRow title="Phone No.:" value="Example phone number" />
        </View>
      </ScrollView>
      <MedicalBottomSheet patientID = {patientID}/>

      
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

