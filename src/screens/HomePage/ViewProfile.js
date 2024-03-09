import React from "react";
import { View, Text, StyleSheet, Image, ScrollView } from "react-native";
import { getDatabase, ref, get } from "firebase/database";

const userProfileImage = require("../../../assets/userprofile.jpeg");

export const ViewProfile = () => {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Image source={userProfileImage} style={styles.profileImage} />
      <Text style={styles.username}>Name</Text>
      <View style={styles.infoContainer}>
        <InfoRow
          title="Address:"
          value="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum"
        />
        <InfoRow title="Birthday:" value="0000/20/203" />
        <InfoRow title="Gender:" value="Apache Helicopter" />
        <InfoRow title="Phone No.:" value="Example phone number" />
      </View>
    </ScrollView>
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

