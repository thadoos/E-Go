import { View, Text } from 'react-native'
import React from 'react'

const fhirRequest = () => {
  
};

export const fetchPatientData = async ({ patientID }) => {

  console.log("Fetching Info")
  // const response = await fetch(`https://hapi.fhir.org/baseR4/Patient/${patientID}/`);
  // const response = await fetch(`https://hapi.fhir.org/baseR4/Condition?patient=39254`);
  const response = await fetch(`https://hapi.fhir.org/baseR4/Condition?patient=${patientID}`);

  const data = await response.json();

  // console.log(data)
  return data;

}
