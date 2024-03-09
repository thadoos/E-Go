import { MedicalInformation } from './MedicalInformation';
import BottomSheet from '@gorhom/bottom-sheet';
import { fetchPatientData } from '../../routers/fhirRequest';
import { View, Text, ActivityIndicator, FlatList, StyleSheet } from 'react-native'
import React, { useEffect, useState, useRef, useMemo } from 'react'

export const MedicalBottomSheet = ({patientID}) => {
  const snapPoints = useMemo(() => [25, '50%', '64%', '100%'], []);


  return(
    // <View style={styles.container}>
      <BottomSheet 
        index={0} 
        snapPoints={snapPoints}
        backgroundStyle={{ backgroundColor: '#ADB2AF'}} //FF6969 ADB2AF
        handleIndicatorStyle={{backgroundColor:'#FFF'}}
        
      >
        <Text style={styles.medicalInfoTitle}>Medical Details</Text>
        <View style = {styles.medicalInfoContainer}>
          <MedicalInformation patientID={patientID}/>

        </View>
        
      </BottomSheet>

  )
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#DCE1DE",
    alignItems: 'center',
    paddingTop: 100,
  },

  text: {
    marginBottom:50,
  },

  medicalInfoContainer:{
    width: '100%',
    backgroundColor: '#DCE1DE',

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