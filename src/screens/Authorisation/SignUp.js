import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  TextInput,
} from "react-native";
import React, { useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { Dropdown } from "react-native-element-dropdown";
import DatePicker from "react-native-date-picker";

import { colors } from "../../styles/colors";
import { auth } from "../../firebaseConfig";
import { createUserWithEmailAndPassword } from "firebase/auth";
import firebaseConfig from "../../firebaseConfig";


export const SignUp = ({ navigation }) => {
  const [user, setUser] = useState({
    avatar: null,
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    address: "",
    role: "",
    gender: "",
    dob: null,
  });

  const [openDate, setOpenDate] = useState(false);

  const [roleFocus, setRoleFocus] = useState(false);
  const [genderFocus, setGenderFocus] = useState(false);

  const roles = [
    { label: "Doctor", value: "Doctor" },
    { label: "Paramedic", value: "Paramedic" },
    { label: "Civilian", value: "Civilian" },
  ];

  const genders = [
    { label: "Male", value: "Male" },
    { label: "Female", value: "Female" },
    { label: "Other", value: "Other" },
  ];


  //Buttonfunctions:
  function onSignUpPress()  {
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

      <TouchableOpacity style={styles.avatarPlaceholder}>
        <Image source={{ uri: user.avatar }} style={styles.avatar} />
        <Ionicons name="add" size={40} color={"#000000"}></Ionicons>
      </TouchableOpacity>

      <View style={styles.inputContainer}>
        <View style={styles.nameContainer}>
          <Ionicons
            name="person"
            size={20}
            color={colors.textfieldIcon}
            style={styles.textFieldIcon}
          />

          <View style={styles.nameWithoutIconContainer}>
            <View style={styles.nameFieldContainer}>
              <TextInput
                style={styles.textFieldContainer}
                placeholder="First Name"
                onChangeText={(newText) => {
                  setUser((prevState) => ({
                    ...prevState,
                    firstName: newText,
                  }));
                }}
              />
            </View>
            <View style={styles.nameFieldContainer}>
              <TextInput
                style={styles.textFieldContainer}
                placeholder="Last Name"
                onChangeText={(newText) => {
                  setUser((prevState) => ({ ...prevState, lastName: newText }));
                }}
              />
            </View>
          </View>
        </View>

        <View style={styles.inputSubContainer}>
          <Ionicons
            name="mail"
            size={20}
            color={colors.textfieldIcon}
            style={styles.textFieldIcon}
          />
          <TextInput
            style={styles.textFieldContainer}
            placeholder="Email"
            autoCapitalize="none"
            onChangeText={(newText) => {
              setUser((prevState) => ({ ...prevState, email: newText }));
            }}
          />
        </View>

        <View style={styles.inputSubContainer}>
          <Ionicons
            name="key"
            size={20}
            color={colors.textfieldIcon}
            style={styles.textFieldIcon}
          />
          <TextInput
            style={styles.textFieldContainer}
            placeholder="Password"
            secureTextEntry
            onChangeText={(newText) => {
              setUser((prevState) => ({ ...prevState, password: newText }));
            }}
          />
        </View>

        <View style={styles.inputSubContainer}>
          <Ionicons
            name="map"
            size={20}
            color={colors.textfieldIcon}
            style={styles.textFieldIcon}
          />
          <TextInput
            style={styles.textFieldContainer}
            placeholder="Address"
            value={user.address}
            onChangeText={(newText) => {
              setUser((prevState) => ({ ...prevState, address: newText }));
            }}
          />
        </View>

        <View style={styles.dateContainer}>
          <Ionicons
            name="calendar"
            size={20}
            color={colors.textfieldIcon}
            style={styles.textFieldIcon}
          />

          <TextInput
            style={styles.dateTextField}
            placeholder="Date of Birth"
            // value = { user.dob }
            value={user.dob ? user.dob.toDateString() : ""}
            mode="date"
            editable={true}
            autoFocus={false}
            onFocus={() => setOpenDate(true)}
          />

          {openDate && (
            <DatePicker
              modal
              locale="en"
              mode="date"
              open={openDate}
              date={new Date()}
              onConfirm={(date) => {
                setOpenDate(false);
                setUser((prevState) => ({ ...prevState, dob: date }));
              }}
              onCancel={() => setOpenDate(false)}
            />
          )}
        </View>

        <View style={styles.genderNRoleContainer}>
          <Ionicons
            name="bag"
            size={20}
            color={colors.textfieldIcon}
            style={styles.textFieldIcon}
          />
          <View style={styles.roleContainer}>
            <Dropdown
              style={[styles.dropdown, roleFocus && { borderColor: "blue" }]}
              placeholderStyle={styles.placeholderStyle}
              selectedTextStyle={styles.selectedTextStyle}
              itemTextStyle={styles.dropdownTextStyle}
              data={roles}
              maxHeight={200}
              labelField="label"
              valueField="value"
              placeholder="Role" //{!roleFocus ? "Role" : "..."}
              value={user.role}
              onFocus={() => setRoleFocus(true)}
              onBlur={() => setRoleFocus(false)}
              onChange={(item) => {
                setUser((prevState) => ({ ...prevState, role: item.value }));
                setRoleFocus(false);
              }}
            />
          </View>

          <View style={styles.genderContainer}>
            <View style={styles.inputSubContainer}>
              <Ionicons
                name="male-female"
                size={20}
                color={colors.textfieldIcon}
                style={styles.textFieldIcon}
              />
              <Dropdown
                style={[
                  styles.dropdown,
                  genderFocus && { borderColor: "blue" },
                ]}
                placeholderStyle={styles.placeholderStyle}
                selectedTextStyle={styles.selectedTextStyle}
                itemTextStyle={styles.dropdownTextStyle}
                data={genders}
                maxHeight={200}
                labelField="label"
                valueField="value"
                placeholder="Gender" //{!genderFocus ? "Gender" : "..."}
                value={user.gender}
                onFocus={() => setGenderFocus(true)}
                onBlur={() => setGenderFocus(false)}
                onChange={(item) => {
                  setUser((prevState) => ({
                    ...prevState,
                    gender: item.value,
                  }));
                  setGenderFocus(false);
                }}
              />
            </View>
          </View>
        </View>

        <View style={styles.buttonContainer}>
          <TouchableOpacity onPress = {(onSignUpPress)}
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
    </View>
  );
};

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

  avatarPlaceholder: {
    width: 200,
    height: 200,
    borderRadius: 100,
    borderColor: colors.placeholderText,
    borderWidth: 0.5,
    backgroundColor: "#fff",
    marginTop: 15,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 40,
  },

  avatar: {
    position: "absolute",
    width: 200,
    height: 200,
    borderRadius: 100,
  },

  signupText: {
    textAlign: "center",
    marginBottom: 20,
    fontWeight: "800",
    fontSize: 25,
  },

  inputContainer: {
    // This is the container for all input fields
    width: "70%",
    alignItems: "stretch",
  },

  inputSubContainer: {
    // This will be the container wrapping the textinput component and icon
    width: "100%",
    alignItems: "stretch",
    flexDirection: "row",
    marginBottom: 15,
    justifyContent: "flex-end",
  },

  textFieldIcon: {
    // Styling the icon for the text field
    marginTop: 5,
    marginRight: 10,
  },

  textFieldContainer: {
    // This is for text input components
    height: 30,
    backgroundColor: "#fff",
    color: colors.textDark,
    width: "100%",

    fontSize: 14,

    paddingLeft: 15,

    borderRadius: 15,
    borderWidth: 0,
    borderColor: colors.textfieldBorder,
  },

  nameContainer: {
    width: "100%",
    height: 30,
    alignItems: "stretch",
    justifyContent: "flex-end",
    flexDirection: "row",
    marginBottom: 15,
  },

  nameWithoutIconContainer: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "stretch",
  },

  nameFieldContainer: {
    width: "48%",
    alignItems: "stretch",
  },

  dateContainer: {
    width: "100%",
    height: 30,
    alignItems: "stretch",
    justifyContent: "flex-end",
    flexDirection: "row",
    marginBottom: 15,
  },

  dateTextField: {
    height: 30,
    backgroundColor: "#fff",
    color: colors.textDark,
    width: "100%",

    alignSelf: "flex-start",

    fontSize: 14,
    paddingLeft: 15,

    borderRadius: 15,
    borderWidth: 0,
    borderColor: colors.textfieldBorder,
  },

  genderNRoleContainer: {
    alignItems: "stretch",
    justifyContent: "flex-end",
    flexDirection: "row",
    width: "100%",
  },

  roleContainer: {
    width: "45%",
    flexDirection: "row",
    alignItems: "stretch",
  },

  genderContainer: {
    width: "55%",
    paddingLeft: 20,
    flexDirection: "row",
    alignItems: "stretch",
  },

  dropdown: {
    flex: 1,
    height: 30,
    borderRadius: 15,
    paddingLeft: 15,
    justifyContent: "center",
    alignItems: "stretch",
    backgroundColor: "#fff",
  },

  placeholderStyle: {
    fontSize: 14,
    color: "#BDBDBD",
  },

  selectedTextStyle: {
    fontSize: 14,
  },

  dropdownTextStyle: {
    fontSize: 14,
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
});
