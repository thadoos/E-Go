import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import React from 'react';

export const SignButton = ({text, borderStyle, textStyle, navigationTarget}) => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity style={styles[`${borderStyle}`]} 
      onPress={() => {
     //   onButtonPress();
        navigation.navigate(navigationTarget);}}>
      <Text style={styles[`${textStyle}`]}>{text}</Text>
    </TouchableOpacity>
  );
};


const styles = StyleSheet.create({
    buttonContainer: {
        width: '75%',
        backgroundColor: '#000',
        paddingVertical: 15,
        borderRadius: 20,
        alignItems: 'center', 
        justifyContent: 'center', 
      },
      buttonText: {
        textAlign: 'center',
        color: '#FFF',
        fontWeight: '700',
      },
      signUpButton: {
        color: '#088AE8',
        fontWeight: '800',
      }
})