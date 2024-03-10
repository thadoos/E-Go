import { StyleSheet, Text, View, ScrollView, FlatList, Image, TouchableOpacity } from 'react-native'
import React from 'react'

import { BlurView } from 'expo-blur';
import { Ionicons } from "@expo/vector-icons";

const CasualtyList = ({setShowCasualtyModal, setfhirID, setCasualtyImage}) => {

  const handlePress = (fhirID, casualtyImage) => {
    console.log(fhirID);
    console.log(casualtyImage);
    setfhirID(fhirID);
    setCasualtyImage(casualtyImage);
    setShowCasualtyModal(false);
  };
  const casualtyData = [
    {
      name: "Mo Mo",
      imageName: require("../../../assets/UserPics/mohamed.jpeg"),
      fhirID: "32954"
    },
    {
      name: "Lace Gree",
      imageName: require("../../../assets/UserPics/lace gree.jpeg"),
      fhirID: "1203"
    },
    {
      name: "Leclan Doo",
      imageName: require("../../../assets/UserPics/declan.jpeg"),
      fhirID: "1202"
    },
  ];

  return (
    <BlurView
      style={styles.modalOverallContainer}
      blurType="light"
      blurAmount={10}
      reducedTransparencyFallbackColor="white"
    >
      <View style={styles.modalContainer}>
        <Text style={styles.title}>Pick Casualty</Text>
        <FlatList
          showsVerticalScrollIndicator={false}
          data = { casualtyData }
          style = {styles.flatList}
          keyExtractor={(item) => item.name}
          renderItem={({item}) => (
            // <View style={styles.imageContainer}>
              <TouchableOpacity
                style={styles.imageButton}
                onPress={()=>handlePress(item.fhirID, item.imageName)}
              >
                <Image source={item.imageName} style={styles.image} />


              </TouchableOpacity>
            // </View>

          )}
        />

        <TouchableOpacity
          style={styles.unknownButton}
          onPress={()=>handlePress(null,null)}
        >
          <Text style={styles.unknownText}>User not Here</Text>
        </TouchableOpacity>

        {/* Put a close modal button here */}
        <TouchableOpacity 
          style={styles.closeButton}
          onPress={() => setShowCasualtyModal(false)}
        >
          <Ionicons
            name="close-sharp"
            size={30}
            color='#ffffff'
            style={{alignSelf:'center', marginVertical: 15}}
          />
        </TouchableOpacity>

      </View>
      

    </BlurView>
  )
}

export default CasualtyList

const styles = StyleSheet.create({
  modalOverallContainer:{
    flex: 1,
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 1,
  },
  modalContainer:{
    width: '80%',
    height: '90%',
    alignItems: 'center',
    alignSelf:'center',
    backgroundColor: '#666666',
    paddingTop: 15,
    borderRadius: 25,
    zIndex: 1,
  },
 
  flatList:{
    alignSelf: 'center',
    marginTop: 25,
    flex: 1
  },
  imageButton:{
    width: 100,
    aspectRatio: 1,
    borderRadius: 50,
    borderWidth:0.5,
    borderColor: '#DDDDDD',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 2,
    marginBottom: 15,
    overflow: 'hidden',

  },
  title:{
    fontWeight: '800',
    fontSize: 24,
  },
  image:{
    // flex: 1
    width: '100%',
    height: '100%',
  },
  unknownButton:{
    width: '60%',
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
    borderRadius: 10,
    marginTop: 20,
  },
  unknownText:{
    fontWeight: '600',
    fontSize: 15,
  },

})