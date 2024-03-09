import { StyleSheet, TextInput, View } from "react-native";
import { useState } from "react";

export const DetailsEntry = ({fieldName, keyboardType = "default", secureTextEntry = false, onChangeText}) => {
  const [textEntry, setTextEntry] = useState('');

  const handleTextChange = (text) => {
    setTextEntry(text);
    onChangeText(text);
  };

  return (
    <TextInput
      //TextInput Details
      placeholder={fieldName}
      style={styles.input}
      keyboardType= {keyboardType}
      secureTextEntry = {secureTextEntry}

      //Backend
      onChangeText={handleTextChange} 
      value={textEntry}
    />
  );
};

const styles = StyleSheet.create({
    input: {
        height: 50,
        backgroundColor: '#EFEFEF',
        marginBottom: 10,
        paddingHorizontal: 10,
        borderRadius: 20,
        borderWidth: .5,
        paddingLeft: 15,
      },
      textFieldContainer: { // This is for text input components
        height: 30,
        backgroundColor:'#fff',
        color: '0000',
        width: '100%',
        
        fontSize: 14,
          
        paddingLeft: 15,
    
        borderRadius: 15,
        borderWidth: 0,
        borderColor: '#888888',
      },
});
