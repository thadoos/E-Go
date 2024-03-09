import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import { Ionicons } from "@expo/vector-icons";
import { colors } from "../styles/colors";

export const ProfilePicUpload = ({image, showModal, setShowModal}) => {
  

  return (
    <TouchableOpacity 
      style={styles.avatarPlaceholder}
      onPress={() => {
        setShowModal(!showModal);
      }}  
    >
      
      {image ?
        <Image source={{ uri: image }} style={styles.avatar} /> :
        <Ionicons name="add" size={40} color={"#000000"}/>
      }
      {/* <Ionicons name="add" size={40} color={"#000000"}></Ionicons> */}
    </TouchableOpacity>
  )
}



const styles = StyleSheet.create({
  avatarPlaceholder: {
    width: 200,
    aspectRatio: 1,
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
    aspectRatio: 1,
    borderRadius: 100,
  },


})