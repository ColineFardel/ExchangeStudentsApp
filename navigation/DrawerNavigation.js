import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { FAQStackNavigation, HomeStackNavigation, ForumStackNavigation, CoursesStackNavigation } from './StackNavigation';
import { DrawerContent } from './DrawerContent';
import MarketScreen from '../containers/market/MarketScreen';
import HomeScreen from '../containers/HomeScreen';

export default function DrawerNavigation() {
    const Drawer = createDrawerNavigator();

    return (
        <Drawer.Navigator initialRouteName="Home" drawerContent={props => <DrawerContent {...props} />}>
            <Drawer.Screen name="Home" component={HomeStackNavigation} />
            <Drawer.Screen name="FAQ" component={FAQStackNavigation} />
            <Drawer.Screen name="Market" component={MarketScreen} />
            <Drawer.Screen name="Forum" component={ForumStackNavigation} />
            <Drawer.Screen name="Courses" component={CoursesStackNavigation} />
        </Drawer.Navigator>
    );
}