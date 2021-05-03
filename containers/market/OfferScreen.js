import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { StyleSheet, View, ScrollView, Text } from 'react-native';
import { deleteOffer, getOffers, setVisibleFalse, getOffersLoc } from '../../redux/actions/market';
import { useDispatch, useSelector } from 'react-redux';
import theme from '../../constants/theme';
import AppSnackBar from '../../components/snackbar';
import Loading from '../../components/loading';
import Search from '../../components/search';
import AppListItem from '../../components/listItem';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Button, Slider } from 'react-native-elements';
import FilterButton from '../../components/filterButton';

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

  //Constants for Offer
  const dispatch = useDispatch();
  const offers = useSelector(state => state.marketReducer.offers);
  const offersLoc = useSelector(state => state.marketReducer.offersLoc);
  const offerLoaded = useSelector(state => state.marketReducer.offerLoaded);
  const fetchOffers = (token) => dispatch(getOffers(token));
  const fetchOffersLoc = (token) => dispatch(getOffersLoc(token));
  const deleteAnOffer = (index, token) => dispatch(deleteOffer(index, token));

  //Constants for filtering
  const [offersFiltered, setOffersFiltered] = useState([]);
  const [search, setSearch] = useState('');
  const [searchOpen, setSearchOpen] = useState(false);
  const [showFilter, setShowFilter] = useState(false);
  const [locationsSelected, setLocationsSelected] = useState([]);
  const [selectedPrice, setSelectedPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(100);

  //Constants for snack bar
  const visible = useSelector(state => state.marketReducer.snackBarVisible);
  const message = useSelector(state => state.marketReducer.snackBarMessage);
  const removeSnackBar = () => dispatch(setVisibleFalse());

  //Constants for user
  const token = useSelector(state => state.authReducer.token);
  const user = useSelector(state => state.authReducer.user);

  useEffect(() => {
    fetchOffers(token);
    fetchOffersLoc(token);
    setOffersFiltered(offers);
    getMaxPrice();
  }, [!offerLoaded])

  const getMaxPrice = () => {
    let max = '0';
    offers.map((offer) => {
      if (offer.price > max)
        max = offer.price;
    });
    setMaxPrice(max);
    setSelectedPrice(max);
  }
  //Search bar function
  const updateSearch = (text) => {
    filterOffers(text, locationsSelected, selectedPrice);
  }

  //Filter the list of offers
  const filterOffers = (name, location, price) => {
    setSearch(name);
    let temp = JSON.parse(JSON.stringify(offers));
    //Search bar filter
    temp = temp.filter((item) => item.name.toLowerCase().includes(name.toLowerCase()));
    //Location filter
    temp = temp.filter((item) => {
      if (location.length > 0) {
        let containsAtLeastOneLoc = false;
        location.map((loc) => {
          if (item.location.includes(loc))
            containsAtLeastOneLoc = true;
        });
        return containsAtLeastOneLoc;
      }
      else return true;
    });
    //Price filter
    temp = temp.filter((item) => item.price <= price);
    setOffersFiltered(temp);
  }

  const locationFiltering = (location) => {
    let temp = JSON.parse(JSON.stringify(locationsSelected));
    if (temp.includes(location)) {
      let index = temp.indexOf(location);
      temp.splice(index, 1);
      setLocationsSelected(temp);
      filterOffers(search, temp, selectedPrice);
    }
    else {
      setLocationsSelected([...locationsSelected, location]);
      filterOffers(search, [...temp, location], selectedPrice);
    }

  }

  //Show the list of offers
  const showOffers = () => {
    return offersFiltered.map((offer, index) => {
      let uri = 'https://exchangestudentsapp-fardel.herokuapp.com/img/' + offer.imgId;
      return (
        <AppListItem
          key={index}
          onPressAction={() => navigation.navigate("OfferDetails", offer)}
          onLongPressAction={offer.user.id === user.id || user.role === "ADMIN" ? () => deleteAnOffer(offer.id, token) : () => { }}
          title={offer.name}
          subtitle={offer.price + '€'}
          secondsubtitle={offer.location}
          uri={uri}
          color={theme.colors.lightRed}
        />
      )
    })
  }

  if (offerLoaded) {
    return (
      <View style={styles.container}>
        {!showFilter &&
          <Button
            raised={true}
            icon={
              <Icon
                name='filter'
                size={30}
                color={theme.colors.red}
              />}
            title="Filter"
            titleStyle={{ fontFamily: theme.fonts.bold, color: theme.colors.red }}
            buttonStyle={{
              borderColor: theme.colors.red, borderRadius: theme.borderRadius.button, borderWidth: 1
            }}
            type='outline'
            onPress={() => { setShowFilter(true) }}
          />
        }

        {showFilter &&
          <View style={{ alignItems: 'center', flexDirection: 'row' }}>
            <View style={{ width: '90%', alignItems: 'center' }}>
              <View style={{ flexDirection: 'row', alignItems: 'center', width: '90%' }}>
                <ScrollView
                  showsHorizontalScrollIndicator={false}
                  horizontal={true}>
                  {offersLoc.map((loc, index) => {
                    return (
                      <FilterButton
                        key={index}
                        text={loc}
                        color={theme.colors.red}
                        action={() => { locationFiltering(loc) }}
                      />
                    )
                  })}
                </ScrollView>
              </View>
              <View style={{ width: '90%', }}>
                <Slider
                  value={selectedPrice}
                  onValueChange={(value) => { setSelectedPrice(value); filterOffers(search, locationsSelected, value) }}
                  maximumValue={maxPrice}
                  minimumValue={0}
                  step={1}
                  trackStyle={{ height: 10, backgroundColor: 'transparent' }}
                  thumbStyle={{ height: 20, width: 20, backgroundColor: 'transparent' }}
                  thumbProps={{
                    children: (
                      <Icon
                        name="circle"
                        size={20}
                        reverse
                        containerStyle={{ bottom: 20, right: 20 }}
                        color={theme.colors.red}
                      />
                    ),
                  }}
                />
                <Text>Showing offers from 0€ to {selectedPrice}€</Text>
              </View>
            </View>
            <View>
              <Icon
                name='times'
                size={30}
                color='red'
                onPress={() => { setShowFilter(false); setLocationsSelected([]); filterOffers('', [], maxPrice); setSelectedPrice(maxPrice) }}
              />
            </View>
          </View>
        }
        <ScrollView style={{ width: '100%' }}>
          {showOffers()}
        </ScrollView>
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
    paddingTop: 15,
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
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
