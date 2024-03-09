import { View, Text, ActivityIndicator, FlatList, StyleSheet } from 'react-native'
import React, { useEffect, useState, useRef, useMemo } from 'react'
import { fetchPatientData } from '../routers/fhirRequest';
import { MedicalInformation } from '../components';
import BottomSheet from '@gorhom/bottom-sheet'


export const UserProfile = () => {
  const panelRef = useRef(null);
  const snapPoints = useMemo(() => ['10%', '50%', '70%'], []);


  return(
    <View style={styles.container}>
      <Text style={styles.text}>Some Profile Detail </Text>
      <Text style={styles.text}>Some Profile Detail </Text>
      <Text style={styles.text}>Some Profile Detail </Text>

      <BottomSheet 
        index={0} 
        snapPoints={snapPoints}
        backgroundStyle={{ backgroundColor: '#ADB2AF'}} //FF6969 ADB2AF
        handleIndicatorStyle={{backgroundColor:'#FFF'}}
        
      >
        <Text style={styles.medicalInfoTitle}>Medical Details</Text>
        <View style = {styles.medicalInfoContainer}>
          <MedicalInformation patientID={ 39254 }/>

        </View>
        
      </BottomSheet>
      

    </View>

    // <View style={styles.medicalInfoContainer}>
    //   <Text style={styles.medicalInfoTitle}>Medical Details</Text>
    //   <MedicalInformation patientID={ 39254 }/>
    // </View>


  )
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#DCE1DE",
    // justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 100,
  },

  text: {
    marginBottom:50,
  },

  medicalInfoContainer:{
    width: '100%',
    backgroundColor: '#DCE1DE',
    // borderColor: 'red',
    // borderWidth: 1,

  },


  medicalInfoTitle: {
    // marginTop: 20,
    fontWeight: '800',
    fontSize: 30,
    color: 'black',
    alignSelf: 'center',
    paddingBottom: 20,
  },

})