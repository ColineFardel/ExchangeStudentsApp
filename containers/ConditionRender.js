import React, { useState, useEffect } from 'react';
import DrawerNavigation from '../navigation/DrawerNavigation';
import { NavigationContainer } from '@react-navigation/native';
import { AuthStackNavigation } from '../navigation/StackNavigation';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useSelector, useDispatch } from 'react-redux';
import { login } from '../redux/actions/authentication';

export default function ConditionRender() {
    const user = useSelector(state => state.authReducer.user);
    const dispatch = useDispatch();
    const userLogin = (username, password) => dispatch(login(username, password));
    const token = useSelector(state => state.authReducer.token);

    useEffect(() => {
        getData();
    }, [])

    //Get user from storage and login
    const getData = async () => {
        try {
            const jsonValue = await AsyncStorage.getItem('user');
            const user = JSON.parse(jsonValue);
            if (user.username)
                userLogin(user.username, user.password);
            return jsonValue != null ? JSON.parse(jsonValue) : null;
        } catch (e) {
            console.log(e);
        }
    }

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