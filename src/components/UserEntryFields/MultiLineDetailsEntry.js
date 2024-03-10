import { StyleSheet, Text, View, TextInput } from 'react-native'
import React from 'react'

export const MultiLineDetailsEntry = ({titleText, lineNumber, text, setText}) => {
  return (
    <>
      <Text style={styles.title}>{titleText}</Text>
      <TextInput
        multiline={true}
        numberOfLines={lineNumber}
        style={styles.lineEntry}
        value={text}
        onChangeText={setText}
        blurOnSubmit={true}

      />
    </>
  )
}

const styles = StyleSheet.create({
  title: { 
    alignSelf: 'center',
    marginTop: "5%", 
    fontSize: 16, 
    fontWeight: "900",
    marginBottom: 10,
  },
  lineEntry: {
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 10,
    width: 300,
    height: 70,
    alignSelf: 'center',
    paddingHorizontal: 15,
    paddingTop: 10,
  },
})