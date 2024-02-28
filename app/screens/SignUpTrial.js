import { View, Text, StyleSheet, TouchableOpacity, Image, TextInput, Pressable, Platform } from 'react-native';
import React, { useState } from 'react';
import StylesGeneral from '../../styles/StylesGeneral';
import { Ionicons } from "@expo/vector-icons";
import { Dropdown } from 'react-native-element-dropdown';
import DateTimePicker from "@react-native-community/datetimepicker"
import { colors } from '../../styles/colors';


export default SignUpTrial = ({navigation}) => {
  const [user, setUser] = useState({
    avatar: null,
    firstName:"",
    lastName:"",
    email:"",
    password:"",
    address:"",
    role:"",
    gender:"", 
    dob:new Date(),
  })

  const [showDatePicker, setShowDatePicker]=  useState(false);

  const toggleDatepicker = () => {
    setShowDatePicker(!showDatePicker)
  }

  const onDateChange = ( { type }, selectedDate) => {
    if (type == "set") {
      const currentDate = selectedDate;
      setShowDatePicker(currentDate);

      if (Platform.OS === "android") {
        toggleDatepicker();
        setUser(prevState => ({...prevState, dob:currentDate.toDateString()}));
      }

    } else {
      toggleDatepicker();
    }
  }

  const confirmIOSDate = () => {
    setUser(prevState => ({...prevState, dob:user.dob.toDateString()}));
    toggleDatepicker;
  }

  const [roleFocus, setRoleFocus] = useState(false);
  const [genderFocus, setGenderFocus] = useState(false);

  const [dob, setDOB] = useState({
    day: '1',
    month: '1',
    year:'2000',
  })

  const updateDOB = () => {
    setUser(prevState => ({
      ...prevState, 
      dob:new Date(
        parseInt(dob.year, 10), 
        parseInt(dob.month, 10) - 1, // Subtract 1 to adjust for JavaScript's 0-indexed months
        parseInt(dob.day, 10)
      )
    }));

  }

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
    <View style={styles.container}>
      <Text style = {styles.signupText}>Sign Up</Text>
      
      <TouchableOpacity style = {styles.avatarPlaceholder}>
        <Image source={{uri: user.avatar}} style={styles.avatar}/>
        <Ionicons
          name="add"
          size={40}
          color={'#000000'}
        ></Ionicons>
      </TouchableOpacity>

      <View style={styles.inputContainer}>
      
        <View style={styles.nameContainer}>

          <Ionicons
            name="person"
            size={20}
            color={colors.textfieldIcon}
            style={styles.textFieldIcon}
          />

          <View style={styles.nameWithoutIconContainer}>
            <View style = {styles.nameFieldContainer}>
              <TextInput 
                style = {styles.textFieldContainer} 
                placeholder="First Name" 
                onChangeText={(newText)=> {
                  setUser(prevState => ({...prevState, firstName:newText}));
                }}
              />
            </View>
            <View style = {styles.nameFieldContainer}>
              <TextInput 
                style = {styles.textFieldContainer} 
                placeholder="Last Name" 
                onChangeText={(newText)=> {
                  setUser(prevState => ({...prevState, lastName:newText}));
                }}
              />
            </View>
          </View>

        </View>

        
        <View style = {styles.inputSubContainer}>
          <Ionicons
            name="mail"
            size={20}
            color={colors.textfieldIcon}
            style={styles.textFieldIcon}
          />
          <TextInput 
            style = {styles.textFieldContainer} 
            placeholder="Email" 
            autoCapitalize='none'
            onChangeText={(newText)=> {
              setUser(prevState => ({...prevState, email:newText}));
            }}
          />
        </View>

        <View style = {styles.inputSubContainer}>
          <Ionicons
            // name="lock-closed"
            name="key"
            size={20}
            color={colors.textfieldIcon}
            style={styles.textFieldIcon}
          />
          <TextInput 
            style = {styles.textFieldContainer} 
            placeholder="Password" 
            secureTextEntry
            onChangeText={(newText)=> {
              setUser(prevState => ({...prevState, password:newText}));
            }}
          />
        </View>

        <View style = {styles.inputSubContainer}>
          <Ionicons
            name='map'
            size={20}
            color={colors.textfieldIcon}
            style={styles.textFieldIcon}
          />
          <TextInput 
            style = {styles.textFieldContainer} 
            placeholder="Address" 
            
            value={user.dob}
            mode="date"
            
            onChangeText={(newText)=> {
              setUser(prevState => ({...prevState, address:newText}));
            }}
          />
        </View>

        {/* <View style = {styles.dateContainer}>
          <Ionicons
            name='calendar'
            size={20}
            color={colors.textfieldIcon}
            style={styles.textFieldIcon}
          />

        </View> */}

          <View style={styles.dateContainer}>

            <Ionicons
              name="calendar"
              size={20}
              color={colors.textfieldIcon}
              style={styles.textFieldIcon}
            />

            <View style={styles.dateWithoutIconContainer}>
              <View style = {styles.dateFieldContainer}>


                
                {showDatePicker && (
                  <DateTimePicker
                    mode = "date"
                    display="spinner"
                    value = { user.dob }
                    onChange= { onDateChange }
                    style={styles.datePicker}
                  />
                )}

                {showDatePicker && Platform.OS==="ios" && (
                  <View
                      style={styles.datePickerButtonsContainer}
                  >
                    <TouchableOpacity 
                      style = {styles.datePickerButton}
                      onPress={toggleDatepicker}
                    >
                      <Text style={styles.dateButtonText}>Cancel</Text>
                    </TouchableOpacity>
                    <TouchableOpacity 
                      style = {styles.datePickerButton}
                      onPress={confirmIOSDate}
                    >
                      <Text style={styles.dateButtonText}>OK</Text>
                    </TouchableOpacity>
                  </View>

                )}


                {!showDatePicker && (
                  <Pressable onPress={toggleDatepicker}>
                    <TextInput 
                      style = {styles.textFieldContainer} 
                      placeholder="Date of Birth" 
                      value= { user.dob }
                      editable={ false }
                      onPressIn={toggleDatepicker}
                      onChangeText={(newText)=> {
                        setDOB(prevState => ({...prevState, day:newText}));
                        updateDOB();
                      }}
                    />
                  </Pressable>  

                )}
              </View>
              {/* <View style = {styles.dateFieldContainer}>
                <TextInput 
                  style = {styles.textFieldContainer} 
                  placeholder="Month" 
                  onChangeText={(newText)=> {
                    setDOB(prevState => ({...prevState, month:newText}));
                    updateDOB();
                  }}
                />
              </View>
              <View style = {styles.dateFieldContainer}>
                <TextInput 
                  style = {styles.textFieldContainer} 
                  placeholder="Year" 
                  onChangeText={(newText)=> {
                    setDOB(prevState => ({...prevState, year:newText}));
                    updateDOB();

                  }}
                />
              </View> */}
            </View>

          </View>

        <View style={styles.genderNRoleContainer}>
         <Ionicons
            name='bag'
            size={20}
            color={colors.textfieldIcon}
            style={styles.textFieldIcon}
          />
          <View style = {styles.roleContainer}>
            {/* <View style = {styles.inputSubContainer}> */}
              
              <Dropdown
                style={[styles.dropdown, roleFocus && { borderColor: 'blue' }]}
                placeholderStyle={styles.placeholderStyle}
                selectedTextStyle={styles.selectedTextStyle}
                itemTextStyle= {styles.dropdownTextStyle}

                data={roles}

                maxHeight={200}
                labelField="label"
                valueField="value"
                placeholder={!roleFocus ? 'Role' : '...'}              

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

          <View style = {styles.genderContainer}>
            <View style = {styles.inputSubContainer}>
              <Ionicons
                name='male-female'
                size={20}
                color={colors.textfieldIcon}
                style={styles.textFieldIcon}
              />
              <Dropdown
                style={[styles.dropdown, genderFocus && { borderColor: 'blue' }]}
                placeholderStyle={styles.placeholderStyle}
                selectedTextStyle={styles.selectedTextStyle}
                itemTextStyle= {styles.dropdownTextStyle}

                data={genders}
                maxHeight={200}
                labelField="label"
                valueField="value"
                placeholder={!genderFocus ? 'Gender' : '...'}



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

          </View>

        </View>


        <View style={styles.buttonContainer}>

          <TouchableOpacity style={styles.backButton2} onPress={()=>navigation.goBack()}>
              <Ionicons
                name='arrow-back'
                color={'#fff'}
                size={30}
                alignSelf='center'
                justifyContent='center'
                marginTop={5}
              />
              {/* <Text style={styles.backButtonIcon}>{'<'}</Text> */}
          </TouchableOpacity>

          <TouchableOpacity style = {styles.signupButton} onPress={() => {
            console.log(user.firstName)
            console.log(user.lastName)
            console.log(user.email)
            console.log(user.password)
            console.log(user.address)
            console.log(user.dob)
            console.log(user.role)
            console.log(user.gender)
            
          }}>
            <Text style={styles.signupButtonText}>Sign Up</Text>
          </TouchableOpacity>

          {/* <View style={styles.backContainer}>
            <Text style={styles.backDescriptionText}>Back to Login?</Text>
            <TouchableOpacity onPress={()=>navigation.goBack()}>
              <Text style={styles.backButton}>Login</Text>
            </TouchableOpacity>

          </View> */}

        </View>

      </View>
      


    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    flex: 1,
    backgroundColor: colors.background,
    justifyContent: 'flex-start',
    // justifyContent:'center',
    paddingTop: 100,
    // paddingTop: 80,
    alignItems: 'center',
    paddingHorizontal:20,
  },

  avatarPlaceholder:{
    width:200,
    height:200,
    borderRadius:100,
    borderColor: colors.placeholderText,
    borderWidth: 0.5,
    backgroundColor: '#fff',
    marginTop: 15,
    justifyContent: "center",
    alignItems: 'center',
    marginBottom: 40,
  },

  avatar: {
    position: 'absolute',
    width:200,
    height:200,
    borderRadius:100,

  },

  signupText: {
    textAlign: 'center',
    // paddingLeft: 30,
    marginBottom: 20,
    fontWeight: '800',
    fontSize: 25,
    
  },

  inputContainer:{ // This is the container for all input fields
    width: '70%',
    alignItems: 'stretch',
  },

  inputSubContainer:{ // This will be the container wrapping the textinput component and icon
    width: '100%',
    alignItems: 'stretch',
    flexDirection: 'row',
    marginBottom: 15,
    justifyContent:'flex-end',
    // borderColor: 'red',
    // borderWidth: 1,
  },

  textFieldIcon: { // Styling the icon for the text field
    marginTop: 5,
    marginRight: 10,

    // borderColor:'red',
    // borderWidth: 1,
  },

  textFieldContainer: { // This is for text input components
    // width: '100%',
    // flex: 1,
    height: 30,
    backgroundColor:'#fff',
    color: colors.textDark,
    width: '100%',
    
    fontSize: 14,
      
    paddingLeft: 15,

    borderRadius: 15,
    borderWidth: 0,
    borderColor: colors.textfieldBorder,
  },

 

  nameContainer:{
    width: '100%',
    height: 30,
    alignItems: 'stretch',
    justifyContent: 'flex-end',
    flexDirection: 'row',
    marginBottom: 15,
    

    // borderColor:'red',
    // borderWidth: 1,
  },

  nameWithoutIconContainer:{
    width: '100%',

    flexDirection: 'row',
    justifyContent:'space-between',
    // justifyContent:'flex-end',
    alignItems: 'stretch',

    // borderColor:'blue',
    // borderWidth: 1,

  },

  nameFieldContainer:{
    width:'48%',
    alignItems:'stretch',
    // marginRight:10,
    // borderColor:'green',
    // borderWidth: 1,
  },

  dateContainer:{
    width: '100%',
    height: 30,
    alignItems: 'stretch',
    justifyContent: 'flex-end',
    flexDirection: 'row',
    marginBottom: 15,
    

    // borderColor:'red',
    // borderWidth: 1,
  },

  dateWithoutIconContainer:{
    width: '100%',

    flexDirection: 'row',
    justifyContent:'space-between',
    // justifyContent:'flex-end',
    alignItems: 'stretch', 

    // borderColor:'blue',
    // borderWidth: 1,

  },

  dateFieldContainer:{
    width:'100%',
    alignItems:'stretch',
    // marginRight:10,
    // borderColor:'green',
    // borderWidth: 1,
  },

  datePicker:{
    height: 120,
    marginTop: -10,
    backgroundColor: '#fff',
  },

  dateButtons:{
    flexDirection: 'row',
    justifyContent: 'space-around',
  },

  datePickerButtonsContainer:{
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 40,
  },

  datePickerButton:{
    borderRadius: 15,
    height: 30,
    width: 60,
    backgroundColor: '#fff',
    borderWidth: 0.5,
    borderColor: '#000',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',

  },

  dateButtonText: {
    fontSize: 12,
  },

  genderNRoleContainer:{
    alignItems: 'stretch',
    justifyContent: 'flex-end',
    // justifyContent: 'space-between',
    flexDirection: 'row',
    width:'100%',

    // borderColor:'green',
    // borderWidth: 3,
  },

  roleContainer:{
    width:'45%',
    // flex:1,
    flexDirection: 'row',
    alignItems:'stretch',
    // marginRight: 10,


    // borderColor:'red',
    // borderWidth: 1,
  },

  genderContainer:{
    width:'55%',
    // flex: 1,
    paddingLeft: 20,
    flexDirection: 'row',
    alignItems:'stretch',


    // borderColor:'blue',
    // borderWidth: 1,
  },

  dropdown:{
    flex: 1,
    // width: '100%',
    height: 30,
    borderRadius: 15,
    paddingLeft: 15,
    justifyContent: 'center',
    alignItems:'stretch',
    backgroundColor: '#fff',
  },

  placeholderStyle: {
    fontSize: 14,
    color: '#BDBDBD',
  },
  
  selectedTextStyle: {
    fontSize: 14,

  },

  dropdownTextStyle:{
    fontSize: 14,
  },

  buttonContainer: {
    width: '100%',
    alignItems:'stretch',
    marginTop: 5,
    flexDirection: 'row',
    justifyContent:'flex-start',

  },

  signupButton: {
    alignItems: 'center',
    justifyContent: 'center',
    
    // width: '100%',
    flex: 1,
    borderRadius: 15,
    height: 40,
    // backgroundColor: colors.buttonColor,
    // backgroundColor: '#8f91a2',
    backgroundColor: 'hsl(216,0%,0%)',
    // backgroundColor: 'hsl(216,48.6%,0%)',

    marginBottom: 15,
  },

  signupButtonText:{
    fontSize: 14,
    fontWeight: '700',
    alignSelf: 'center',
    justifyContent:'center',
    color: '#fff',
    // color: 'hsl(216,48.6%,55%)',
  },

  backContainer: {
    flexDirection:'row',
    alignItems: 'center',
    justifyContent: 'center',
  },

  backDescriptionText: {
    color: '#000',
    fontSize: 14,
    marginRight: 5,
    fontWeight: '500',
    marginRight: 15,
  },

  backButton: {
    color: '#088AE8',
    // fontSize: 16,
    fontWeight: '800',
  },
  
  backButton2:{
    color:'#222222',
    width: 40,
    marginRight: 5,
    borderRadius: 15,
    height: 40,
    // backgroundColor: '#94B0DA',
    // backgroundColor: 'hsl(216,48.6%,0%)',
    backgroundColor: 'hsl(216,0%,35%)',
    // backgroundColor: '#DCEDFF',
  },

  backButtonIcon: {

  },


  

  

});



