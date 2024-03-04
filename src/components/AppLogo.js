import { StyleSheet, Text, View, Image, Dimensions } from "react-native";
import React from "react";

// Used to set fixed image size, prevents re-sizing as keyboard pops up
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;


const appLogoImage = require("../../assets/images/E-GO-Logo.png");

export const AppLogo = () => {
  return (
    <>
      <Image source={appLogoImage} style={styles.logo} resizeMode="contain" />
      <Text style={styles.tagline}>
        EmergencyGo! {"\n"} Helping whenever, wherever you can.
      </Text>
    </>
  );
};

const styles = StyleSheet.create({
  logo: {
    width: windowWidth * 0.7,
    height: windowHeight * 0.1,
    marginBottom: "1%",
    marginTop: "45%",
  },
  tagline: {
    textAlign: "center",
    marginBottom: 50,
  },
});
