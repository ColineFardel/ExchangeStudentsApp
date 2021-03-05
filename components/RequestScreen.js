import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Button, Image, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';


export default function RequestScreen({ navigation }) {

  const [requests, setRequests] = useState([]);

  useEffect(() => {
    getRequests();
  }, [])

  const getRequests = () => {
    fetch('https://exchangestudentsapp-fardel.herokuapp.com/allimg')
      .then(response => {
        //console.log(response);
        //console.log(response);
        //setRequests(response);
        // response.map((request, index) => {
        //   console.log(request);
        // })
      })
  }

  const showRequests = () => {
    
    return (
      <Image style={{ width: 140, height: 140 }} source={{ uri: 'https://exchangestudentsapp-fardel.herokuapp.com/img/7' }} />
    )
    // requests.map((request) => {
    //   return (
    //     <Text>Prout</Text>
    //   )
    // })
  }




  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <ScrollView style={{ width: '100%' }}>
          {showRequests()}
        </ScrollView>
      </View>

      <View style={styles.foot}>
        <View style={{ flex: 4, alignItems: "center", justifyContent: "center" }}>
          <Text style={styles.text}>You want to post a request?</Text>
          <Text style={styles.text}>No problem! Create one here</Text>
        </View>
        <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
          <Icon.Button name="plus-circle"
            size={50}
            color="white"
            backgroundColor="red"
            onPress={() => { navigation.navigate('AddRequest') }} />
        </View>
      </View>


      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {
    flex: 10,
    width: '100%',
  },
  foot: {
    backgroundColor: 'red',
    width: '100%',
    flexDirection: 'row',
    minHeight: 50,
  },
  text: {
    fontFamily: 'MontserratBold',
    fontSize: 16,
    color: 'white',
  },
});
