import { StyleSheet, Text, View, TextInput } from 'react-native'
import React, { useState } from 'react'
import { Ionicons } from "@expo/vector-icons";
import { colors } from "../styles/colors";
import DatePicker from "react-native-date-picker";

export const DateEntry = ({
  user,
  updateUserDetails,
}) => {
  const [openDate, setOpenDate] = useState(false);
  return (
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
            updateUserDetails("dob", date);
          }}
          onCancel={() => setOpenDate(false)}
        />
      )}
    </View>
  )
}


const styles = StyleSheet.create({
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

  textFieldIcon: {
    // Styling the icon for the text field
    marginRight: 10,
    alignSelf: 'center',
  },
})