import React from 'react';
import { StyleSheet } from 'react-native';
import DrawerNavigation from './navigation/DrawerNavigation';
import { NavigationContainer } from '@react-navigation/native';
import { Provider } from 'react-redux';
import configureStore from './redux/store';

const store = configureStore();

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <DrawerNavigation />
      </NavigationContainer>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
