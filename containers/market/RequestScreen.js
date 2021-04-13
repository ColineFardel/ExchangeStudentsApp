import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { StyleSheet, View, ScrollView } from 'react-native';
import { deleteRequest, getRequests, setVisibleFalse } from '../../redux/actions/market';
import { useDispatch, useSelector } from 'react-redux';
import theme from '../../constants/theme';
import Loading from '../../components/loading';

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
  const visible = useSelector(state => state.marketReducer.snackBarVisible);
  const message = useSelector(state => state.marketReducer.snackBarMessage);
  const requests = useSelector(state => state.marketReducer.requests);
  const requestLoaded = useSelector(state => state.marketReducer.requestLoaded);
  const [requestsFiltered, setRequestsFiltered] = useState([]);
  const [search, setSearch] = useState('');
  const [searchOpen, setSearchOpen] = useState(false);
  const dispatch = useDispatch();
  const removeSnackBar = () => dispatch(setVisibleFalse());
  const fetchRequests = () => dispatch(getRequests());
  const removeRequest = (index) => dispatch(deleteRequest(index));

  //Search bar function
  const updateSearch = (text) => {
    setSearch(text);
    setRequestsFiltered(requests.filter((item) => item.name.toLowerCase().includes(text.toLowerCase())));
  }

  useEffect(() => {
    fetchRequests();
    setRequestsFiltered(requests);
  }, [!requestLoaded])

  //Show the list of requests
  const showRequests = () => {
    return requestsFiltered.map((request, index) => {
      let uri = 'https://exchangestudentsapp-fardel.herokuapp.com/img/' + request.imgId;
      return (
        <AppListItem
          key={index}
          color={theme.colors.lightRed}
          onPressAction={() => navigation.navigate("RequestDetails", request)}
          onLongPressAction={() => removeRequest(request.id)}
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
        <View style={styles.content}>
          <ScrollView style={{ width: '100%' }}>
            {showRequests()}
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
