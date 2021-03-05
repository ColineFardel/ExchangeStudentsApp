import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Button, Image, ScrollView, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { getRequests } from '../redux/actions/market';
import { useDispatch, useSelector } from 'react-redux';
import theme from '../constants/theme';


export default function RequestScreen({ navigation }) {

  const requests = useSelector(state => state.marketReducer.requests);
  const requestLoaded = useSelector(state => state.marketReducer.requestLoaded);
  const dispatch = useDispatch();
  const fetchRequests = () => dispatch(getRequests());


  useEffect(() => {
    fetchRequests();
  }, [!requestLoaded])

  const showRequests = () => {

    //console.log(requests);

    return requests.map((request, index) => {
      let uri = 'https://exchangestudentsapp-fardel.herokuapp.com/img/' + request.imgId
      return (

        <TouchableOpacity style={{ width: "100%", alignItems: 'center', }}>
          <View style={styles.card}>
            <Image style={styles.image} source={{ uri: uri }} />
            <View style={{margin:10}}>
              <Text style={styles.cardTitle}>{request.name}</Text>
              <Text style={styles.cardText}>{request.description}</Text>
            </View>

          </View>
        </TouchableOpacity>

      )
    })
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
    backgroundColor: theme.colors.red,
    width: '100%',
    flexDirection: 'row',
    minHeight: 50,
  },
  text: {
    fontFamily: theme.fonts.bold,
    fontSize: theme.fontSizes.footText,
    color: 'white',
  },
  card: {
    backgroundColor: theme.colors.lightRed,
    borderRadius: theme.borderRadius.card,
    width: '90%',
    margin: 10,
  },
  image: {
    width: '100%',
    height: 140,
    borderTopLeftRadius: theme.borderRadius.card,
    borderTopRightRadius: theme.borderRadius.card,
  },
  cardTitle: {
    maxWidth: '90%',
    fontFamily: theme.fonts.bold,
    fontSize: theme.fontSizes.cardTitle,
    color: "black"
  },
  cardText: {
    fontFamily: theme.fonts.regular,
    fontSize: theme.fontSizes.cardText,
    color: "black"
  }
});
