import { StyleSheet, Text, View, TextInput } from 'react-native'
import React from 'react'
import { Ionicons } from "@expo/vector-icons";
import { colors } from "../styles/colors";

export const NameEntry = ({
  updateUserDetails,
}) => {
  return (
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
            onChangeText={(newText) => updateUserDetails("firstName", newText)}
          />
        </View>
        <View style={styles.nameFieldContainer}>
          <TextInput
            style={styles.textFieldContainer}
            placeholder="Last Name"
            onChangeText={(newText) => updateUserDetails("lastName", newText)}
          />
        </View>
      </View>
    </View>
  )
}


const styles = StyleSheet.create({
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