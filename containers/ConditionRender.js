import React from 'react';
import DrawerNavigation from '../navigation/DrawerNavigation';
import { NavigationContainer } from '@react-navigation/native';
import { AuthStackNavigation } from '../navigation/StackNavigation';
import { useSelector } from 'react-redux';

export default function ConditionRender() {
    const token = useSelector(state => state.authReducer.token);

    if (token) {
        return (
            <NavigationContainer>
                <DrawerNavigation />
            </NavigationContainer>
        )
    }
    else {
        return (
            <NavigationContainer>
                <AuthStackNavigation />
            </NavigationContainer>

        )
    }

}