import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { Ionicons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker"

export const UploadPictureModal = ({updateUserDetails, setShowModal}) => {

  const uploadImage = async() => {
    try {
      await ImagePicker.
      requestCameraPermissionsAsync();
      let result = await ImagePicker.
      launchCameraAsync({
        // camera: 'front',
        cameraType: ImagePicker.CameraType.front,
        allowsEditing: true,
        aspect: [1,1],
        quality: 1,
      });
      if(!result.canceled) {
        await saveImage(result.assets[0].uri);
      }
      setShowModal(false);

    }catch(error){
      alert(error);
      setShowModal(false);
    }
  }
  

  const saveImage = async(image) => {
    try {
      // setImage(image);
      setShowModal(false);
      updateUserDetails("avatar", image);
      
    } catch(error) {
      throw error;
    }
  }

  return (
    <View style={styles.modalOverallContainer}>
      <View style={styles.modalContainer}>
        <Text style={styles.modalHeader}>Upload Profile Picture</Text>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.buttonTouchable}>
            <Ionicons
              name="camera"
              size={20}
              color="#000000"
              onPress={uploadImage}
            />
          </TouchableOpacity>
          <TouchableOpacity style={styles.buttonTouchable}>
            <Ionicons
              name="image"
              size={20}
              color="#000000"
              onPress={uploadImage}
            />
          </TouchableOpacity>
          <TouchableOpacity style={styles.buttonTouchable}>
            <Ionicons
              name="remove-circle"
              size={20}
              color="#000000"
            />
          </TouchableOpacity>

        </View>

      </View>

    </View>
    
  )
}


const styles = StyleSheet.create({
  modalOverallContainer:{
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,

  },

  modalContainer:{
    width: '70%',
    aspectRatio: 2.5,
    alignItems: 'center',
    alignSelf:'center',
    backgroundColor: 'white',
    paddingTop: 15,
    borderRadius: 25,
    zIndex: 1,
  },
  modalHeader:{
    fontWeight: '600',
    fontSize: 15,
  },

  
  buttonContainer:{
    flex: 1,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    alignSelf:'center',
  },

  buttonTouchable:{
    // width: '80%',
    // aspectRatio: 1,


    justifyContent: 'center',
    alignItems: 'center',
  },


})