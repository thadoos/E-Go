import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  TextInput,
} from "react-native";
import React, { useState } from "react";
import { colors } from "../../styles/colors";
import { auth } from "../../firebaseConfig";
import { createUserWithEmailAndPassword } from "firebase/auth";
import firebaseConfig from "../../firebaseConfig";
import { DateEntry, SignUpDetailEntry, UploadPictureModal, ProfilePicUpload, NameEntry, RoleGenderEntry } from "../../components/UserEntryFields";
import { useNavigation } from "@react-navigation/native";
import { handleSignUp } from "../../components/AuthHandlers";


export const SignUp = () => {
  const [user, setUser] = useState({
    avatar: null,
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
    address: "",
    role: "",
    gender: "",
    fhirID: "",
  });

  const navigation = useNavigation();

  const updateUserDetails = (fieldName, value) => {
    setUser(prevState => ({
      ...prevState,
      [fieldName]: value
    }));
  };

  const [showModal, setShowModal] = useState(false);

  function onSignUpPress()  {
    console.log(user);
    createUserWithEmailAndPassword(auth,user.email, user.password)
      .then(() => {
        console.log("success");
        console.log(user.name);
      }).catch(() => {
        const errorMessage = error.message;
        console.log(errorMessage);
      })
      ;
  };

  return (
    <View style={styles.container}>
      
      <Text style={styles.signupText}>Sign Up</Text>
      
      <ProfilePicUpload image={user.avatar} showModal={showModal} setShowModal={setShowModal}/>

      <View style={styles.inputContainer}>

        <NameEntry updateUserDetails={updateUserDetails}/>

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
          autoCapitalize="none"
        />
        <SignUpDetailEntry 
          value={user.address}
          fieldName="address"
          ioniconName="map"
          placeholder="Address"
          updateUserDetails={updateUserDetails}
        />
        <SignUpDetailEntry 
          value={user.fhirID}
          fieldName="fhirID"
          ioniconName="map"
          placeholder="FHIR ID"
          updateUserDetails={updateUserDetails}
        />
        {/* <DateEntry updateUserDetails={updateUserDetails} user={user}/> */}
        <RoleGenderEntry user={user} updateUserDetails={updateUserDetails}/>

        <View style={styles.buttonContainer}>
          <TouchableOpacity onPress = {() => handleSignUp({user, navigation})}
            style={styles.signupButton}>
            <Text style={styles.signupButtonText}>Sign Up</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.backContainer}>
          <Text style={styles.backDescriptionText}>Back to Login?</Text>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Text style={styles.backButton}>Login</Text>
          </TouchableOpacity>
        </View>
      </View>



        
      {showModal && <UploadPictureModal showModal={showModal} updateUserDetails={updateUserDetails} setShowModal={setShowModal}/>}
    
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

  buttonContainer: {
    width: "100%",
    alignItems: "stretch",
    marginTop: 5,
    flexDirection: "column",
    justifyContent: "flex-start",
  },

  signupButton: {
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    borderRadius: 15,
    height: 40,
    backgroundColor: "hsl(216,0%,0%)",
    marginTop: 25,
  },

  backContainer: {
    marginTop: 25,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },

  backDescriptionText: {
    color: "#000",
    fontSize: 14,
    fontWeight: "500",
    marginRight: 15,
  },

  signupButtonText: {
    fontSize: 14,
    fontWeight: "700",
    alignSelf: "center",
    justifyContent: "center",
    color: "#fff",
  },

  backButton: {
    color: "#088AE8",
    fontWeight: "800",
  },

  
  
})