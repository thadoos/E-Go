import { StyleSheet, Text, View, Image, TouchableOpacity, ScrollView, FlatList } from 'react-native'
import React from 'react'

export const CasualtyPicker = () => {
  return (
    <View style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        backgroundColor={"#DCE1DE"}
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
      >


      </ScrollView>

      <TouchableOpacity style={styles.anonymousButton}>

      </TouchableOpacity>

    </View>
  )
};

const userEntry = () => {
  

};



const styles = StyleSheet.create({
  container:{
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',

  },

  anonymousButton:{

  },

  scrollView:{
    width: '70%',
    height: 300,
  },

  scrollContent:{
    justifyContent: 'flex-start',
  },

})