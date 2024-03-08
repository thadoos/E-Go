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
        backgroundStyle={{ backgroundColor: '#FF6969'}}
        handleIndicatorStyle={{backgroundColor:'#FFF'}}
        
      >
        <Text style={styles.medicalInfoTitle}>Medical Details</Text>
        <MedicalInformation patientID={ 39254 }/>
        
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

  medicalInfoContainer: {
    flex: 1,
    backgroundColor: "#FF6969",
    // backgroundColor: "#FFD8CC",
    // backgroundColor: "#F39F5A",
    alignItems: "center",
    width: '100%',
    borderTopStartRadius: 55,
    borderTopEndRadius: 55,
  },


  medicalInfoTitle: {
    // marginTop: 20,
    fontWeight: '800',
    fontSize: 30,
    color: 'black',
    alignSelf: 'center',
  },

})