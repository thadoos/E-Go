import { StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'
import { Ionicons } from "@expo/vector-icons";

export const SignupIcon = ( {logoName, color} ) => {
  return (
    <TouchableOpacity style={styles.iconTouchable}>
      <Ionicons 
        name={ logoName }//"logo-google"
        size={30} 
        color={color}>
      </Ionicons>
    </TouchableOpacity>
  )
};


const styles = StyleSheet.create({
  iconTouchable:{
    marginHorizontal: 20,
  }

})