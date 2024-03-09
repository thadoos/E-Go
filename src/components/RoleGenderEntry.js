import { StyleSheet, Text, View, TextInput } from 'react-native'
import React, { useState } from 'react'
import { Ionicons } from "@expo/vector-icons";
import { colors } from "../styles/colors";
import { Dropdown } from "react-native-element-dropdown";

export const RoleGenderEntry = ({
  user,
  updateUserDetails,
}) => {
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
  return (
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
            updateUserDetails("role", item.value);
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
              updateUserDetails("gender", item.value);
              setGenderFocus(false);
            }}
          />
        </View>
      </View>
    </View>
  )
}


const styles = StyleSheet.create({
  genderNRoleContainer: {
    flexDirection: "row",
    alignItems: "stretch",
    justifyContent: "flex-end",
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

  inputSubContainer: {
    // This will be the container wrapping the textinput component and icon
    width: "100%",
    alignItems: "stretch",
    flexDirection: "row",
    justifyContent: "flex-end",
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

  textFieldIcon: {
    // Styling the icon for the text field
    marginRight: 10,
    alignSelf: 'center',
  },

})