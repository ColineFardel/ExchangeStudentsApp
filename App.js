import React from 'react';
import { StyleSheet, Text } from 'react-native';
import DrawerNavigation from './navigation/DrawerNavigation';
import { NavigationContainer } from '@react-navigation/native';
import { Provider } from 'react-redux';
import { useFonts } from 'expo-font';
import configureStore from './redux/store';

const store = configureStore();

export default function App() {

  //Loading the fonts
  const [loaded] = useFonts({
    Montserrat: require('./assets/myfonts/Montserrat-Regular.ttf'),
    MontserratBold: require('./assets/myfonts/Montserrat-Bold.ttf'),
  });

  if(!loaded){
    return(
      <Text>Loading...</Text>
    )
  }
  else{
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
