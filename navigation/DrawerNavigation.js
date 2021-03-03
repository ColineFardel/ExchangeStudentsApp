import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { FAQStackNavigation, MarketStackNavigation } from './StackNavigation';
import { DrawerContent } from './DrawerContent';
import MarketScreen from '../components/MarketScreen';

export default function DrawerNavigation() {
    const Drawer = createDrawerNavigator();

    return (
        <Drawer.Navigator initialRouteName="FAQ" drawerContent={props => <DrawerContent {...props}/>}>
            <Drawer.Screen name="FAQ" component={FAQStackNavigation} />
            <Drawer.Screen name="Market" component={MarketScreen} />
        </Drawer.Navigator>
    );
}