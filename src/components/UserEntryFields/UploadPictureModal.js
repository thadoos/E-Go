import { StyleSheet, Text, View, TouchableOpacity, Modal } from 'react-native'
import React, { useState } from 'react'
import { Ionicons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker"
import { BlurView } from 'expo-blur';

export const UploadPictureModal = ({updateUserDetails, showModal, setShowModal}) => {

  const uploadImage = async(mode) => {
    try {
      result = {};
      if (mode === "gallery"){
        await ImagePicker.
        requestMediaLibraryPermissionsAsync();
        result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.Images,
          allowsEditing: true,
          aspect: [1,1],
          quality: 1,
        });
      } else{
        await ImagePicker.
        requestCameraPermissionsAsync();
        result = await ImagePicker.
        launchCameraAsync({
          cameraType: ImagePicker.CameraType.front,
          allowsEditing: true,
          aspect: [1,1],
          quality: 1,
        });
  
      }
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
      setShowModal(false);
      updateUserDetails("avatar", image);
      // sendToBackend();
      
    } catch(error) {
      throw error;
    }
  }

  return (
      <BlurView
        style={styles.modalOverallContainer}
        blurType="light"
        blurAmount={10}
        reducedTransparencyFallbackColor="white"
      >
        <View style={styles.modalContainer}>
          <Text style={styles.modalHeader}>Upload Profile Picture</Text>
          <View style={styles.buttonContainer}>
            <TouchableOpacity 
              style={styles.buttonTouchable} 
              onPress={() => uploadImage()}
            >
              <Ionicons
                name="camera"
                size={40}
                color="#fff"
                
              />
            </TouchableOpacity>
            <TouchableOpacity 
              style={styles.buttonTouchable} 
              onPress={() => uploadImage("gallery")}
            >
              <Ionicons
                name="image"
                size={40}
                color="#fff"
                
              />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.buttonTouchable} 
              onPress={() => setShowModal(false)}
            >
              <Ionicons
                name="close-circle"
                size={40}
                color="#fff"
                
              />
            </TouchableOpacity>

          </View>

        </View>
      </BlurView>
    // </View>
    
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
  absolute:{
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },

  modalContainer:{
    width: '70%',
    aspectRatio: 2,
    alignItems: 'center',
    alignSelf:'center',
    backgroundColor: '#333333',
    paddingTop: 15,
    borderRadius: 25,
    zIndex: 1,
    // borderColor: '#AAAAAA',
    // borderWidth: 0.5,
  },
  modalHeader:{
    fontWeight: '800',
    fontSize: 20,
    color:'#fff',
  },

  
  buttonContainer:{
    flex: 1,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf:'center',
  },

  buttonTouchable:{
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: '10%',
  },


})