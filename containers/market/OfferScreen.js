import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Button, Image, ScrollView, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { getOffers } from '../../redux/actions/market';
import { useDispatch, useSelector } from 'react-redux';

import theme from '../../constants/theme';
import Card from '../../components/card';

export default function OfferScreen({navigation}) {

  //Constants
  const offers = useSelector(state => state.marketReducer.offers);
  const offerLoaded = useSelector(state => state.marketReducer.offerLoaded);
  const dispatch = useDispatch();
  const fetchOffers = () => dispatch(getOffers());

  useEffect(() => {
    fetchOffers();
  }, [!offerLoaded])

  const showOffers = () => {
    return offers.map((offer) => {
      let uri = 'https://exchangestudentsapp-fardel.herokuapp.com/img/' + offer.imgId;
      return (

        <Card
          key={offer.id}
          action={() => navigation.navigate("OfferDetails", offer)}
          title={offer.name}
          subtitle={offer.price}
          uri={uri}
        />
      )
    })
  }
  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <ScrollView style={{ width: '100%' }}>
          {showOffers()}
        </ScrollView>
      </View>

      <View style={styles.foot}>
        <View style={{ flex: 4, alignItems: "center", justifyContent: "center" }}>
          <Text style={styles.text}>You want to post an offer?</Text>
          <Text style={styles.text}>No problem! Create one here</Text>
        </View>
        <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
          <Icon.Button name="plus-circle"
            size={50}
            color="white"
            backgroundColor={theme.colors.red}
            onPress={() => { navigation.navigate('AddOffer') }} />
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
