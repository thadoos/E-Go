import { StyleSheet, Text, View, TextInput } from 'react-native'
import React from 'react'
import { Ionicons } from "@expo/vector-icons";
import { colors } from "../styles/colors";


export const SignUpDetailEntry = ({
  ioniconName,
  fieldName,
  value,
  placeholder,
  secureTextEntry,
  autoCapitalize,
  updateUserDetails,
  keyboardType,
}) => {

  return (
    <View style={styles.inputSubContainer}>
      <Ionicons
        name={ioniconName}
        size={20}
        color={colors.textfieldIcon}
        style={styles.textFieldIcon}
      />
      <TextInput
        style={styles.textFieldContainer}
        placeholder={placeholder}
        autoCapitalize={autoCapitalize}
        secureTextEntry={secureTextEntry}
        onChangeText={(newText) => updateUserDetails(fieldName, newText)}
        value={value}
        keyboardType={keyboardType}
      />
      
    </View>
  );
}



const styles = StyleSheet.create({
  inputSubContainer: {
    // This will be the container wrapping the textinput component and icon
    width: "100%",
    alignItems: "stretch",
    flexDirection: "row",
    marginBottom: 15,
    justifyContent: "flex-end",
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