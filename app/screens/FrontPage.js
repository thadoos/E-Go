import { StyleSheet, Text, View, TextInput, TouchableOpacity, Image } from 'react-native';
import React from 'react'
import StylesGeneral from '../../styles/StylesGeneral'


const FrontPage = ({ navigation }) => {
  return (
      <View style={StylesGeneral.container}>
        <Image 
          source ={ require('../../assets/E-GO-Logo.png')}
          style = {styles.logo}
          resizeMode="contain"
        />

        <Text style={styles.tagline}>
          EmergencyGo! {'\n'} Helping whenever, wherever you can.
        </Text>
        
        <View style={styles.inputContainer}>
          <Text style = {styles.loginText}>Login</Text>
          <TextInput
            placeholder="Email"
            style={styles.input}
            keyboardType="email-address"
          />

          <TextInput
            placeholder="Password"
            style={styles.input}
            secureTextEntry
          />
        </View>
        
        <TouchableOpacity style={styles.buttonContainer} onPress={() => navigation.navigate('Log In')}>
          <Text style={styles.buttonText}>Sign In</Text>
        </TouchableOpacity>
        
        <View style={styles.signupTextCont}>
          <Text style={styles.signupText}>Don’t have an account?</Text>
          <TouchableOpacity onPress={() => navigation.navigate('Sign Up')}>
            <Text style={styles.signupButton}> Sign-Up</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
};

export default FrontPage;
    
const styles = StyleSheet.create({
    logo: {
      width: '70%',
      height: '10%',
      marginBottom: 10,
      borderRadius:1,
      borderColor:'red',
    },

    tagline: {
      textAlign: 'center',
      marginBottom: 50,
      // color: 'grey',
      color: 'black',
      width: '60%',
    },
    inputContainer: {
      width: '80%',
      alignItems: 'stretch', 
    },
    loginText: {
      textAlign: 'center',
      marginBottom: 10,
      fontWeight: '800',
      fontSize: 20,
      
      
    },
    input: {
      height: 50,
      alignSelf: 'stretch',
      backgroundColor: '#EFEFEF',
      marginBottom: 10,
      paddingHorizontal: 10,
      borderRadius: 20,
      borderWidth: .5,
      borderColor: 'black',
      textAlign: 'left',
      paddingLeft: 15,
    },
    buttonContainer: {
      width: '80%',
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
    signupTextCont: {
      alignItems: 'flex-end',
      justifyContent: 'center',
      paddingVertical: 16,
      flexDirection: 'row',
    },
    signupText: {
      color: '#000',
      fontSize: 16,
      marginRight: 5,
      fontWeight: '500',
    },
    signupButton: {
      color: '#088AE8',
      // fontSize: 16,
      fontWeight: '800',

    }
});

