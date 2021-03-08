import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Button, Image, ScrollView, TouchableOpacity, TextInput } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { deleteOffer, getOffers } from '../../redux/actions/market';
import { useDispatch, useSelector } from 'react-redux';
import theme from '../../constants/theme';
import Card from '../../components/card';

export default function OfferScreen({ navigation }) {

  //Header
  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <View style={styles.header}>
          <Icon.Button name={searchOpen ? 'times' : 'search'}
            size={20}
            color="white"
            backgroundColor={theme.colors.red}
            onPress={() => { setSearchOpen(!searchOpen); updateSearch(''); }} />
          {searchOpen && (
            <TextInput
              placeholder="Search..."
              style={styles.searchBar}
              value={search}
              onChangeText={text => updateSearch(text)}
            />
          )}
        </View>
      )
    })
  })

  //Constants
  const offers = useSelector(state => state.marketReducer.offers);
  const offerLoaded = useSelector(state => state.marketReducer.offerLoaded);
  const [offersFiltered, setOffersFiltered] = useState([]);
  const [search, setSearch] = useState('');
  const [searchOpen, setSearchOpen] = useState(false);
  const dispatch = useDispatch();
  const fetchOffers = () => dispatch(getOffers());
  const deleteAnOffer = (index) => dispatch(deleteOffer(index));

  useEffect(() => {
    fetchOffers();
    setOffersFiltered(offers);
  }, [!offerLoaded])

  //Search bar function
  const updateSearch = (text) => {
    setSearch(text);
    setOffersFiltered(offers.filter((item) => item.name.toLowerCase().includes(text.toLowerCase())));
    console.log('updating search');
  }

  const showOffers = () => {
    return offersFiltered.map((offer) => {
      let uri = 'https://exchangestudentsapp-fardel.herokuapp.com/img/' + offer.imgId;
      return (
        <Card
          key={offer.id}
          onPressAction={() => navigation.navigate("OfferDetails", offer)}
          onLongPressAction={() => deleteAnOffer(offer.id)}
          title={offer.name}
          price={offer.price}
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
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  searchBar: {
    backgroundColor: 'white',
    borderRadius: 20,
    paddingLeft: 10,
    paddingRight: 10,
    marginRight: 15
  },
});
