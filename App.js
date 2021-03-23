import React from 'react';
import { StyleSheet, Text } from 'react-native';
import DrawerNavigation from './navigation/DrawerNavigation';
import { NavigationContainer } from '@react-navigation/native';
import { Provider } from 'react-redux';
import { useFonts } from 'expo-font';
import configureStore from './redux/store';
import * as firebase from 'firebase';

const store = configureStore();

export default function App() {

  /**
   * Firebase configuration
   */
  var firebaseConfig = {
    apiKey: "AIzaSyB8rMsENjRdLYGxRHhTi0YHSEuSLuMi2JQ",
    authDomain: "exchangestudentschats.firebaseapp.com",
    databaseURL: "https://exchangestudentschats-default-rtdb.firebaseio.com",
    projectId: "exchangestudentschats",
    storageBucket: "exchangestudentschats.appspot.com",
    messagingSenderId: "485986349293",
    appId: "1:485986349293:web:10ab319e0c231f69e81ce4"

  };



  if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
  } else {
    firebase.app(); // if already initialized, use that one
  }

  //Loading the fonts
  const [loaded] = useFonts({
    Montserrat: require('./assets/myfonts/Montserrat-Regular.ttf'),
    MontserratBold: require('./assets/myfonts/Montserrat-Bold.ttf'),
  });

  if (!loaded) {
    return (
      <Text>Loading...</Text>
    )
  }
  else {
    return (
      <Provider store={store}>
        <NavigationContainer>
          <DrawerNavigation />
        </NavigationContainer>
      </Provider>
    )
  }


}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
