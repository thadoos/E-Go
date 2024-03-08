import { View, Text, ActivityIndicator, FlatList } from 'react-native'
import React, { useEffect, useState } from 'react'
import { fetchPatientData } from '../routers/fhirRequest';
import { StyleSheet } from 'react-native-web';

export const UserProfile = () => {
  const [patientData, setPatientData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchPatientRecords = async () => {
      try {
        await fetchPatientData(39254)
        .then(data => {
          setPatientData(data.entry)
        })
      } catch(error) {
        console.error("Failed to fetch patient data: ", error);
      } finally {
        setIsLoading(false);
        console.log(patientData);
      }
    }
    fetchPatientRecords();
  }, []);
  

  if (isLoading) {
    return <ActivityIndicator style = {{alignSelf: "center", justifyContent: "center"}}/>;
  }

  return (
    <View style={styles.container}>
      <Text style={{marginTop:200}}>Hello There </Text>

      <FlatList 
        // style={styles.medicalHistoryList}
        data = { patientData }
        keyExtractor={(item, index) => item.resource?.id || String(index)}
        renderItem={({ item }) => (
          <View style = {styles.recordView}>
            <Text style={styles.recordTitle}>Condition: {item.entry.resource.code}</Text>
            <Text>Recorded Date: {item.entry.onsetDateTime}</Text>
            <Text>Status: {item.entry.resource.clinicalStatus.coding[0].display}</Text>
          </View>
        )}
      />

    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#DCE1DE",
    alignItems: "center",
  },

  detailsContainer: {
    width: "75%",
    backgroundColor: 'green',

  },

  medicalHistoryList:{
    marginTop : 50,
    backgroundColor: 'black',

  },

  recordView:{
    backgroundColor: 'red',
    padding: 20,
    margniTop: 50,
  },

  recordTitle: {
    fontSize: 16,
  },

  

})