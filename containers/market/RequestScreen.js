import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, ScrollView, TextInput } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { deleteRequest, getRequests, setVisibleFalse } from '../../redux/actions/market';
import { useDispatch, useSelector } from 'react-redux';
import theme from '../../constants/theme';
import Card from '../../components/card';
import { Snackbar } from 'react-native-paper';


export default function RequestScreen({ navigation }) {

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
        <Card
          key={request.id}
          onPressAction={() => navigation.navigate("RequestDetails", request)}
          onLongPressAction={() => removeRequest(request.id)}
          title={request.name}
          subtitle={request.description}
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

        <Snackbar
          visible={visible}
          onDismiss={() => removeSnackBar()}
          duration={2000}
        >{message}</Snackbar>

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
      <View style={styles.container}>
        <Text>Loading...</Text>
        <Text>Please wait</Text>
      </View>
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
