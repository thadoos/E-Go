import { View, Text, StyleSheet, TouchableOpacity, Image, TextInput } from 'react-native';
import React, { useState } from 'react';
import StylesGeneral from '../styles/StylesGeneral';
import { Ionicons } from "@expo/vector-icons";
import { Picker } from '@react-native-picker/picker';
import { Dropdown } from 'react-native-element-dropdown';

export default SignUpPage = () => {
  const [user, setUser] = useState({
    avatar:null,
    firstName:"",
    lastName:"",
    email:"",
    password:"",
    address:"",
    role:"",
    gender:"",
    dob:"",
  });

  const [roleFocus, setRoleFocus] = useState(false);
  const [genderFocus, setGenderFocus] = useState(false);

  const roles = [
    { label:'Doctor', value:'Doctor' },
    { label:'Paramedic', value:'Paramedic' },
    { label:'Civilian', value:'Civilian' },
  ];

  const genders = [
    {label: 'Male', value: 'Male'},
    {label: 'Female', value: 'Female'},
    {label: 'Other', value: 'Other'},

  ]


  return (
    <View style = {styles.container}>
      <TouchableOpacity style={ styles.avatarPlaceHolder }>
        <Image source={{ uri:user.avatar }} style={ styles.avatar } />
        <Ionicons
          name="add"
          size={40}
          color={'#000000'}
          // style={{marginTop:6, marginLeft: 2}}
        ></Ionicons>
      </TouchableOpacity>

      <View style={styles.inputContainer}>
        
        <View style={styles.nameContainer}>
          <View style={styles.nameSubContainer}>
            <Text style={styles.inputLabel}>First Name</Text>
            <TextInput
            style={styles.input}
            keyboardType='default'
          />
          </View>
          <View style={styles.nameSubContainer}>
            <Text style={styles.inputLabel}>Last Name</Text>
            <TextInput
            style={styles.input}
            keyboardType='default'
          />
          </View>
        </View>
        
        <View style={styles.indivInputContainer}>
          <Text style={styles.inputLabel}>Email</Text>
          <TextInput
            style={styles.input}
            keyboardType='email-address'
            autoCapitalize='none'
          />
        </View>

        <View style={styles.indivInputContainer}>
          <Text style={styles.inputLabel}>Password</Text>
          <TextInput
            style={styles.input}
            keyboardType='default'
            secureTextEntry
          />
        </View>

        <View style={styles.indivInputContainer}>
          <Text style={styles.inputLabel}>Address</Text>
          <TextInput
            style={styles.input}
            keyboardType='default'
          />
        </View>
        

        <View style={styles.roleAndGenderContainer}>

          <View style={styles.roleContainer}>
            <Text style={styles.inputLabel}>Role</Text>
            <Dropdown
              style={[styles.dropdown, roleFocus && { borderColor: 'blue' }]}
              placeholderStyle={styles.placeholderStyle}
              selectedTextStyle={styles.selectedTextStyle}

              data={roles}

              maxHeight={200}
              labelField="label"
              valueField="value"
              placeholder={!roleFocus ? 'Select Role' : '...'}              

              value={user.role}
              onFocus={() => setRoleFocus(true)}
              onBlur={() => setRoleFocus(false)}
              onChange={item => {
                setUser(prevState => ({...prevState, role:item.value}));
                // setValue(item.value);
                setRoleFocus(false);
              }}
            />
          </View>
         
          <View style={styles.genderContainer}>
            <Text style={styles.inputLabel}>Gender</Text>
            <Dropdown
              style={[styles.dropdown, genderFocus && { borderColor: 'blue' }]}
              placeholderStyle={styles.placeholderStyle}
              selectedTextStyle={styles.selectedTextStyle}

              data={genders}

              maxHeight={200}
              labelField="label"
              valueField="value"
              placeholder={!genderFocus ? 'Select Gender' : '...'}

              value={user.gender}
              onFocus={() => setGenderFocus(true)}
              onBlur={() => setGenderFocus(false)}
              onChange={item => {
                setUser(prevState => ({...prevState, gender:item.value}));
                // setValue(item.value);
                setGenderFocus(false);
              }}
            />
          </View>
          
          {/* <TextInput
            placeholder="Gender"
            style={styles.genderInput}
            keyboardType='default'
          /> */}

        </View>
      </View>

      

    </View>
  )
}


const styles = StyleSheet.create({
  container: {
    width: '100%',
    flex: 1,
    backgroundColor: '#FFF',
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingHorizontal:20,
},

  avatarPlaceHolder:{
    width:200,
    height:200,
    borderRadius:100,
    backgroundColor: '#ffffff',
    marginTop: 48,
    justifyContent: "center",
    alignItems: 'center',
    marginBottom: 24,
  },

  avatar: {
    position: 'absolute',
    backgroundColor: '#fff',
    width:200,
    height:200,
    borderRadius:100,
    borderColor: 'black', 
    borderWidth: 0,
  },

  inputContainer:{
    width: '80%',
    alignItems: 'stretch',
  },

  nameContainer:{
    width: '100%',
    alignItems: 'stretch',
    justifyContent: 'space-between',
    flexDirection: 'row',
  },

  nameSubContainer:{
    width:'48%',
    marginBottom: 15,
    alignItems:'stretch',
  },

  indivInputContainer: {
    width:'100%',
    marginBottom: 15,
    alignItems:'stretch',
  },

  inputLabel:{
    width:'100%',
    fontSize: 14,
    color: '#BBB',
    paddingLeft: 0,
    
  },

  input:{
    width: '100%',
    height: 30,
    backgroundColor:'#fff',
    color: '#000',
    
    fontSize: 12,
    paddingLeft: 5,


    borderBottomWidth: 1,
    borderColor: '#888888',

  },

  roleAndGenderContainer:{
    alignItems: 'stretch',
    justifyContent: 'space-between',
    flexDirection: 'row',
    
    // borderColor: 'blue',
    // borderWidth: 2,

  },

  roleContainer: {
    width:'50%',

    alignItems:'stretch',
  },

  genderContainer: {
    width:'45%',
    alignItems:'stretch',
  },
  
  dropdown: {
    height: 30,
    borderColor: 'gray',
    borderBottomWidth: 1,
    paddingLeft: 5,
    justifyContent: 'flex-start',
    alignItems:'stretch',
  },

  label: {
    position:'absolute',
    backgroundColor:'#fff',
    left: 22,
    top: 8,
    zIndex: 999,
    paddingHorizontal: 8,
    fontSize: 14,
    
  },
  
  placeholderStyle: {
    fontSize: 12,
    color: '#BDBDBD',
  },
  
  selectedTextStyle: {
    fontSize: 12,
  },

  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
})