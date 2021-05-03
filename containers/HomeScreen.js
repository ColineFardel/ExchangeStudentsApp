import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, Linking } from 'react-native';
import theme from '../constants/theme';
import { useSelector, useDispatch } from 'react-redux';
import { login, signup, setVisibleFalse, getUser } from '../redux/actions/authentication';

export default function HomeScreen() {

    const user = useSelector(state => state.authReducer.userCredentials);
    const token = useSelector(state => state.authReducer.token);
    const dispatch = useDispatch();
    const getCurrentUser = (username, token) => dispatch(getUser(username, token));

    useEffect(() => {
        getCurrentUser(user.username, token);
    }, [])

    return (
        <View style={styles.container}>
            <View style={{ flex: 1, margin: 30 }}>
                <Text style={styles.title}>Welcome to the exchange students app</Text>
            </View>
            <View style={{ flex: 8, margin: 10 }}>
                <Text style={styles.text}>Fow now only the FAQ and the Market are available</Text>
                <Text style={styles.text}>Play with it and give me a feedback here :)</Text>
                <Text style={{ color: 'blue', fontSize: 20, fontFamily: theme.fonts.regular, textAlign: 'center' }}
                    onPress={() => Linking.openURL('https://forms.gle/aLEb6ay5rJwNnVXZ7')}>
                    Give feedback</Text>

                <Text style={styles.text}>N.B. if you press a long time on an FAQ, you will be able to delete or modify it and if you do the same on a request or an offer it will delete it</Text>
            </View>
            <StatusBar style="auto" />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
    },
    title: {
        fontSize: theme.fontSizes.screenTitle,
        fontFamily: theme.fonts.bold,
        textAlign: 'center'
    },
    text: {
        marginBottom: 10,
        marginTop: 10,
        fontSize: theme.fontSizes.buttonText,
        fontFamily: theme.fonts.regular
    }
});
