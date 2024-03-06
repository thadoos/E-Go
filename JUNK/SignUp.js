import { View, Text, StyleSheet, TouchableOpacity, Image, TextInput } from 'react-native';
import React, { useState } from 'react';
import StylesGeneral from '../styles/StylesGeneral';
import { Ionicons } from "@expo/vector-icons";
import { Picker } from '@react-native-picker/picker';
import { Dropdown } from 'react-native-element-dropdown';

const SignUp = ({ navigation }) => {
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    role: "",
    avatar: null,
  });

  const [roleFocus, setRoleFocus] = useState(false);
  const [genderFocus, setGenderFocus] = useState(false);

  const roles = [
    { label:'Doctor', value:'Doctor' },
    { label:'Paramedic', value:'Paramedic' },
    { label:'Civilian', value:'Civilian' },
  ];

  const renderLabel = () => {
    if (user.role || roleFocus) {
      return (
        <Text style= {[styles.label, roleFocus && { color: '#888888' }]}>
          Role
        </Text>
      );
    }
    return null;
  };

  



  return (
    <View style = {styles.container}>
      <TouchableOpacity style={ styles.avatarPlaceHolder }>
        <Image source={{ uri:user.avatar }} style={ styles.avatar } />
        <Ionicons
          name="add"
          size={40}
          color={'#000000'}
          style={{marginTop:6, marginLeft: 2}}
        ></Ionicons>
      </TouchableOpacity>

      <View style={styles.inputContainer}>
        <TextInput
          placeholder="First Name"
          style={styles.input}
          keyboardType='default'
        />
        <TextInput
          placeholder="Last Name"
          style={styles.input}
          keyboardType='default'
        />
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
        <TextInput
          placeholder="Address"
          style={styles.input}
          keyboardType='default'
        />

        

        <View style={styles.roleAndGenderContainer}>

          {/* {renderLabel()} */}
          
          <Dropdown
            style={[styles.dropdown, roleFocus && { borderColor: 'blue' }]}
            placeholderStyle={styles.placeholderStyle}
            selectedTextStyle={styles.selectedTextStyle}

            data={roles}

            maxHeight={300}
            labelField="label"
            valueField="value"
            placeholder={!roleFocus ? 'Select Role' : '...'}
            
            // inputSearchStyle={styles.inputSearchStyle}
            // search
            // searchPlaceholder="Search..."
            

            value={user.role}
            onFocus={() => setRoleFocus(true)}
            onBlur={() => setRoleFocus(false)}
            onChange={item => {
              setUser(prevState => ({...prevState, role:item.value}));
              // setValue(item.value);
              setRoleFocus(false);
            }}
          />

          {/* <Picker
            placeholder='Role' 
            mode='dropdown'
            style={ styles.rolePicker }
            itemStyle= { styles.pickerItemStyle }
            selectedValue = { user.role }
            onValueChange={(itemValue, itemIndex) => {
              if(itemValue != ""){
                setUser(prevState => ({ ...prevState, role: itemValue }));
              }
            }}
          >
            <Picker.Item label="Role" value=""/>
            <Picker.Item label="Paramedic" value="Paramedic"/>
            <Picker.Item label="Doctor" value="Doctor"/>
            <Picker.Item label="NA" value="NA"/>
          </Picker> */}

          {/* <TextInput
            placeholder="Role"
            style={styles.roleInput}
            keyboardType='default'
          /> */}
          
          <TextInput
            placeholder="Gender"
            style={styles.genderInput}
            keyboardType='default'
          />

        </View>
      </View>

      

    </View>
  )
}

export default SignUp

const styles = StyleSheet.create({
  container: {
    width: '100%',
    flex: 1,
    // backgroundColor: '#DCE1DE',
    backgroundColor: '#FFF',
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingHorizontal:20,
},

  avatarPlaceHolder:{
    width:200,
    height:200,
    borderRadius:100,
    backgroundColor: '#E1E2E6',
    marginTop: 48,
    justifyContent: "center",
    alignItems: 'center',
    marginBottom: 24,
  },

  avatar: {
    position: 'absolute',
    width:200,
    height:200,
    borderRadius:100,
    borderColor: 'black',
    borderWidth: 1,
  },

  inputContainer:{
    width: '80%',
    alignItems: 'stretch',
  },

  input:{
    width: '100%',
    height: 30,
    backgroundColor:'#fff',
    color: '#000',
    
    fontSize: 16,
      
    marginBottom: 15,
    paddingLeft: 15,

    borderRadius: 15,
    borderWidth: 1,
    borderColor: '#888888',

  },

  roleAndGenderContainer:{
    alignItems: 'stretch',
    justifyContent: 'space-between',
    marginBottom: 15,
    flexDirection: 'row',
    // flex: 1,
  },

  roleInput: {
    width: '53%',
    height: 30,
    backgroundColor:'#fff',
    color: 'red',
    fontSize: 16,
      
    paddingLeft: 15,

    borderRadius: 15,
    borderWidth: 1,
    borderColor: '#888888',
  },

  rolePicker: {
    width: '53%',
    // width: '100%',
    height: 30,
    backgroundColor:'#fff',
    color: 'red',
    fontSize: 12,
      
    paddingLeft: 15,

    borderRadius: 15,
    borderWidth: 1,
    borderColor: '#888888',

  },

  pickerItemStyle: {
    // backgroundColor: 'red',
    fontSize: 12,

  },

  genderInput: {
    width: '43%',
    height: 30,
    backgroundColor:'#fff',
    color: 'red',
    fontSize: 16,
      
    paddingLeft: 15,

    borderRadius: 15,
    borderWidth: 1,
    borderColor: '#888888',

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
  
  dropdown: {
    width: '53%',
    height: 30,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 15,
    paddingHorizontal: 15,
  },
  
  placeholderStyle: {
    fontSize: 16,
    color: '#BDBDBD',
  },
  
  selectedTextStyle: {
    fontSize: 16,
  },

  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
})