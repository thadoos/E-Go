import { View, Text, ActivityIndicator, FlatList, StyleSheet } from 'react-native'
import React, { useEffect, useState } from 'react'
import { fetchPatientData } from '../routers/fhirRequest';


export const MedicalInformation = ({ patientID }) => {
  const [patientData, setPatientData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    console.log("Getting Patient Information")
    const fetchPatientRecords = async ( patientID ) => {
      try {
        await fetchPatientData({ patientID })
        .then(data => {
          setPatientData(data.entry)

        })
      } catch(error) {
        console.error("Failed to fetch patient data: ", error);
      } finally {
        setIsLoading(false);
      }
    }
    fetchPatientRecords();
  }, []);
  

  if (isLoading) {
    return <ActivityIndicator style = {{alignSelf: "center", justifyContent: "center"}}/>;
  }

  return (
    <View style={styles.container}>
      <Text style= { styles.medicalInfoTitle }>Medical History</Text>
      <FlatList 
        data = { patientData }
        style = {styles.medicalList}

        keyExtractor={(item, index) => item.resource?.id || String(index)}
        renderItem={({ item }) => (
          <View style={ styles.medicalEntry }>
            {/* <Text>ID: {item.resource.id}</Text> */}
            <Text style={styles.recordTitle}>Condition: {item.resource.code.coding[0].display}</Text>
            <Text style={styles.recordInfoText}>Status: {item.resource.clinicalStatus?.coding[0].display}</Text>
            <Text style={styles.recordInfoText}>Onset Date Time: {item.resource.onsetDateTime}</Text>

          </View>
        )}

      />



    </View>
  )
}

const styles = StyleSheet.create({
  container: {
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
    marginTop: 20,
    fontWeight: '800',
    fontSize: 30,
    color: 'black',
  },

  medicalList: {
    alignSelf: 'center',
    width: '70%',
    marginTop: 25,
  },

  medicalEntry: {
    alignSelf: 'flex-start',
    marginBottom: 10,
  },

  medicalHistoryList:{
    marginTop : 50,
    backgroundColor: 'black',

  },

  recordTitle: {
    fontSize: 16,
    color: 'black',
  },

  recordInfoText: {
    fontSize: 13,
    color: 'black',
  }

  

})