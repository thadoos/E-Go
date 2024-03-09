import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  TextInput,
} from "react-native";
import React, { useState } from "react";
import { colors } from "../styles/colors";
import { auth } from "../firebaseConfig";
import { createUserWithEmailAndPassword } from "firebase/auth";
import firebaseConfig from "../firebaseConfig";
import { SignUpDetailEntry, UploadPictureModal, ProfilePicUpload } from "../components/";


export const SignUpReworked = ({ navigation }) => {
  const [user, setUser] = useState({
    avatar: null,
    firstName: "",
    lastName: "",
    email: "",
    phone: null,
    password: "",
    address: "",
    role: "",
    gender: "",
    dob: null,
  });

  const updateUserDetails = (fieldName, value) => {
    setUser(prevState => ({
      ...prevState,
      [fieldName]: value
    }));
  };

  const [showModal, setShowModal] = useState(false);

  return (
    <View style={styles.container}>
      
      
      <ProfilePicUpload image={user.avatar} setShowModal={setShowModal}/>

      <View style={styles.inputContainer}>

        <Text style={styles.signupText}>Sign Up</Text>

        <SignUpDetailEntry 
          value={user.email}
          fieldName="email"
          ioniconName="mail"
          placeholder="Email"
          autoCapitalize="none"
          updateUserDetails={updateUserDetails}
        />
        <SignUpDetailEntry 
          value={user.phone}
          fieldName="phone"
          ioniconName="phone-portrait"
          placeholder="Phone Number"
          keyboardType="phone-pad"
          updateUserDetails={updateUserDetails}
        />
        <SignUpDetailEntry 
          value={user.password}
          fieldName="password"
          ioniconName="key"
          placeholder="Password"
          secureTextEntry
          updateUserDetails={updateUserDetails}
        />
        <SignUpDetailEntry 
          value={user.address}
          fieldName="address"
          ioniconName="map"
          placeholder="Address"
          updateUserDetails={updateUserDetails}
        />

      </View>
        
      {showModal && <UploadPictureModal updateUserDetails={updateUserDetails} setShowModal={setShowModal}/>}
    </View>

  );

}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    flex: 1,
    backgroundColor: colors.background,
    justifyContent: "flex-start",
    paddingTop: 100,
    alignItems: "center",
    paddingHorizontal: 20,
  },

  inputContainer: {
    // This is the container for all input fields
    width: "70%",
    alignItems: "stretch",
  },

  signupText: {
    textAlign: "center",
    marginBottom: 20,
    fontWeight: "800",
    fontSize: 25,
  },

  
  
})