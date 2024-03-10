import React, { useEffect, useState } from 'react';
import { View, FlatList, TouchableOpacity, Text } from 'react-native'
import { StyleSheet } from 'react-native-web';
import { Ionicons } from '@expo/vector-icons';
import { MedicalBottomSheet } from '../../components/Medical';
import { getDatabase, ref, get } from "firebase/database";

export const ViewCases = () => {
  const [casualties, setCasualties] = useState([]);
  // const patientID = "39254" // This should be somehow set to the casualty's patientID
  const [patientID, setPatientID] = useState(39254);
  const fetchCasualties = async () => {
    const db = getDatabase();
    const casualtiesRef = ref(db, 'casualties');
    const snapshot = await get(casualtiesRef);
    if (snapshot.exists()) {
      setCasualties(Object.values(snapshot.val()));
    } else {
      console.log("No data available");
    }
  };

  useEffect(() => {
    fetchCasualties();
  }, []);

  const [showMedical, setShowMedical] = useState(false);
  const [snapPoint ,setSnapPoint] = useState(0);
  return (
    <View style={styles.container}>
      {/* Map Goes Here */}

      <TouchableOpacity style={styles.refreshButton} onPress={fetchCasualties}>
        <Ionicons name="refresh" size={24} color="black" />
      </TouchableOpacity>

      <FlatList
        data={casualties}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity 
            style={styles.caseContainer}
            onPress={() => {
              console.log(item.fhirID);
              setPatientID(item.fhirID);
              setShowMedical(true);
              setSnapPoint(0);
            }}
          >
            <Text style={styles.caseLabel}>Description:</Text>
            <Text style={styles.caseDescription}>{item.description}</Text>
            <Text style={styles.caseLabel}>Location:</Text>
            <Text style={styles.caseLocation}>{item?.location?.address}</Text>
            <Text style={styles.caseLabel}>Symptoms:</Text>
            <Text style={styles.caseSymptoms}>{item.symptoms}</Text>
          </TouchableOpacity>

        
        )}
      />
      {showMedical && <MedicalBottomSheet patientID = {patientID} setSnapPoint={snapPoint}/>}

      
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#DCE1DE",
    alignItems: "center",
  },
  refreshButton: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#f2f2f2',
    margin: 10,
  },
  caseContainer: {
    backgroundColor: '#f2f2f2',
    padding: 10,
    marginVertical: 5,
    borderRadius: 10,
  },
  caseName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  caseLabel: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  caseLocation: {
    fontSize: 14,
  },
  caseDescription: {
    fontSize: 16,
  },
  caseSymptoms: {
    fontSize: 14,
  },
})