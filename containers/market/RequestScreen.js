import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { StyleSheet, View, ScrollView } from 'react-native';
import { deleteRequest, getRequests, getRequestsLoc, setVisibleFalse } from '../../redux/actions/market';
import { useDispatch, useSelector } from 'react-redux';
import theme from '../../constants/theme';
import Loading from '../../components/loading';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Button, Slider } from 'react-native-elements';
import FilterButton from '../../components/filterButton';

export default function RequestScreen({ navigation }) {

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
  const token = useSelector(state => state.authReducer.token);
  const visible = useSelector(state => state.marketReducer.snackBarVisible);
  const message = useSelector(state => state.marketReducer.snackBarMessage);
  const requests = useSelector(state => state.marketReducer.requests);
  const requestsLoc = useSelector(state => state.marketReducer.requestsLoc);
  const requestLoaded = useSelector(state => state.marketReducer.requestLoaded);
  const [requestsFiltered, setRequestsFiltered] = useState([]);
  const [search, setSearch] = useState('');
  const [searchOpen, setSearchOpen] = useState(false);
  const [showFilter, setShowFilter] = useState(false);
  const [locationsSelected, setLocationsSelected] = useState([]);
  const dispatch = useDispatch();
  const removeSnackBar = () => dispatch(setVisibleFalse());
  const fetchRequests = (token) => dispatch(getRequests(token));
  const fetchRequestsLoc = (token) => dispatch(getRequestsLoc(token));
  const removeRequest = (index, token) => dispatch(deleteRequest(index, token));

  //Search bar function
  const updateSearch = (text) => {
    filterRequests(text, locationsSelected);
  }

  useEffect(() => {
    fetchRequests(token);
    fetchRequestsLoc(token);
    setRequestsFiltered(requests);
  }, [!requestLoaded])

  //Filter the list of requests
  const filterRequests = (name, location) => {
    setSearch(name);
    let temp = JSON.parse(JSON.stringify(requests));
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
    setRequestsFiltered(temp);
  }

  const locationFiltering = (location) => {
    let temp = JSON.parse(JSON.stringify(locationsSelected));
    if (temp.includes(location)) {
      let index = temp.indexOf(location);
      temp.splice(index, 1);
      setLocationsSelected(temp);
      filterRequests(search, temp);
    }
    else {
      setLocationsSelected([...locationsSelected, location]);
      filterRequests(search, [...temp, location]);
    }

  }

  //Show the list of requests
  const showRequests = () => {
    return requestsFiltered.map((request, index) => {
      let uri = 'https://exchangestudentsapp-fardel.herokuapp.com/img/' + request.imgId;
      return (
        <AppListItem
          key={index}
          color={theme.colors.lightRed}
          onPressAction={() => navigation.navigate("RequestDetails", request)}
          onLongPressAction={() => removeRequest(request.id, token)}
          title={request.name}
          subtitle={request.description}
          secondsubtitle={request.location}
          uri={uri}
        />
      )
    })
  }

  if (requestLoaded) {
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
                  {requestsLoc.map((loc, index) => {
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
            </View>
            <View>
              <Icon
                name='times'
                size={30}
                color='red'
                onPress={() => { setShowFilter(false); setLocationsSelected([]); filterRequests('', []); }}
              />
            </View>
          </View>
        }
        <ScrollView style={{ width: '100%' }}>
          {showRequests()}
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
          textTop="You want to post an request?"
          textBottom="No problem! Create one here"
          iconAction={() => { navigation.navigate('AddRequest') }}
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
    paddingTop: 15
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
