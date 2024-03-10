import { MedicalInformation } from './MedicalInformation';
import BottomSheet from '@gorhom/bottom-sheet';
import { fetchPatientData } from '../../routers/fhirRequest';
import { View, Text, ActivityIndicator, FlatList, StyleSheet } from 'react-native'
import React, { useEffect, useState, useRef, useMemo } from 'react'

export const MedicalBottomSheet = ({patientID, setSnapPoint}) => {
  const snapPoints = useMemo(() => [25, 75, '20%','35%','50%', '75%', '100%'], []);
  const bottomSheetRef = useRef(null);


  
  useEffect(() => {

    bottomSheetRef.current?.snapToIndex(setSnapPoint);

  }, [setSnapPoint]);
  console.log(bottomSheetRef)

  return(
    
      <BottomSheet 
        index={1} 
        snapPoints={snapPoints}
        backgroundStyle={{ backgroundColor: '#ADB2AF'}} //FF6969 ADB2AF
        handleIndicatorStyle={{backgroundColor:'#FFF'}}
        ref={bottomSheetRef}
        
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
    zIndex: 1,
  },

  text: {
    marginBottom:50,
  },

  medicalInfoContainer:{
    width: '100%',
    backgroundColor: '#DCE1DE',
    flex: 1,

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