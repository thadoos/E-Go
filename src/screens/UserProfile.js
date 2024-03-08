import { View, Text, ActivityIndicator, FlatList, StyleSheet } from 'react-native'
import React, { useEffect, useState } from 'react'
import { fetchPatientData } from '../routers/fhirRequest';
import { MedicalInformation } from '../components';

export const UserProfile = () => {
  return(
    <View style={styles.container}>
      <Text style={styles.text}>Something </Text>
      <Text style={styles.text}>Something </Text>
      <Text style={styles.text}>Something </Text>
      <Text style={styles.text}>Something </Text>
      <Text style={styles.text}>Something </Text>
      <Text style={styles.text}>Something </Text>
      <Text style={styles.text}>Something </Text>

      {/* <View style={ styles.medicalInfoContainer }> */}
      <MedicalInformation patientID={ 39254 }/>
      {/* </View> */}


    </View>


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

})