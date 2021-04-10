import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { StyleSheet, View, ScrollView } from 'react-native';
import { deleteOffer, getOffers, setVisibleFalse } from '../../redux/actions/market';
import { useDispatch, useSelector } from 'react-redux';
import theme from '../../constants/theme';
import AppSnackBar from '../../components/snackbar';
import Loading from '../../components/loading';
import Search from '../../components/search';
import AppListItem from '../../components/listItem';

export default function OfferScreen({ navigation }) {

  //Header for search bar
  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Search
          searchOpen={searchOpen}
          color={theme.colors.red}
          onPress={() => { setSearchOpen(!searchOpen); updateSearch(''); }}
          onChangeText={text => updateSearch(text)}
          search={search}
        />
      )
    })
  })

  //Constants
  const visible = useSelector(state => state.marketReducer.snackBarVisible);
  const message = useSelector(state => state.marketReducer.snackBarMessage);
  const offers = useSelector(state => state.marketReducer.offers);
  const offerLoaded = useSelector(state => state.marketReducer.offerLoaded);
  const [offersFiltered, setOffersFiltered] = useState([]);
  const [search, setSearch] = useState('');
  const [searchOpen, setSearchOpen] = useState(false);
  const dispatch = useDispatch();
  const removeSnackBar = () => dispatch(setVisibleFalse());
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
  }

  //Show the list of offers
  const showOffers = () => {
    return offersFiltered.map((offer, index) => {
      let uri = 'https://exchangestudentsapp-fardel.herokuapp.com/img/' + offer.imgId;
      return (
        <AppListItem
          key={index}
          onPressAction={() => navigation.navigate("OfferDetails", offer)}
          onLongPressAction={() => deleteAnOffer(offer.id)}
          title={offer.name}
          subtitle={offer.price + '€'}
          uri={uri}
          color={theme.colors.lightRed}
        />
      )
    })
  }

  if (offerLoaded) {
    return (
      <View style={styles.container}>
        <View style={styles.content}>
          <ScrollView style={{ width: '100%' }}>
            {showOffers()}
          </ScrollView>
        </View>
        <AppSnackBar
          visible={visible}
          onDismiss={() => removeSnackBar()}
          message={message}
          color={theme.colors.red}
        />
        <Foot
          color={theme.colors.red}
          icon="plus-circle"
          textTop="You want to post an offer?"
          textBottom="No problem! Create one here"
          iconAction={() => { navigation.navigate('AddOffer') }}
        />
        <StatusBar style="auto" />
      </View>
    );
  }
  else {
    return (
      <Loading />
    )
  }
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
});
