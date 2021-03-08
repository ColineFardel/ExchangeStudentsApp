import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import theme from '../../constants/theme';
import { Button } from 'react-native-elements';
import { Image } from 'react-native';

export default function RequestDetails({ navigation, route }) {

    React.useLayoutEffect(() => {
        navigation.setOptions({
            tabBarVisible: false
        });
    }, []);

    const request = route.params;

    const openWhatsApp = () => {
        console.log(request);
    }

    const uri = 'https://exchangestudentsapp-fardel.herokuapp.com/img/' + request.imgId;

    return (
        <View style={styles.container}>
            <View style={{ width: '100%' }}>
                <Image style={styles.image} source={{ uri: uri }} />
            </View>
            <View style={{ backgroundColor: 'blue', borderTopStartRadius: theme.borderRadius.card }}>
                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', }}>
                    <Icon name={"chevron-left"}
                        size={30}
                        color="black"
                        onPress={() => navigation.goBack()} />
                    <Text style={styles.bigTitle}>{request.name}</Text>
                </View>
                <View style={{}}>
                    <Text style={styles.title}>Description</Text>
                    <Text style={styles.text}>{request.description}</Text>
                    <Text style={styles.title}>Location</Text>
                    <Text style={styles.text}>{request.location}</Text>
                </View>

                <View>
                    <Button
                        buttonStyle={styles.button}
                        titleStyle={{ color: 'white', fontFamily: 'MontserratBold', fontSize: 24 }}
                        onPress={() => openWhatsApp()}
                        title="Contact the owner" />
                </View>
            </View>

        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        alignItems: 'flex-start',
        justifyContent: 'center'
    },
    button: {
        backgroundColor: 'red',
        borderRadius: 10
    },
    bigTitle: {
        fontSize: theme.fontSizes.screenTitle,
        fontFamily: theme.fonts.bold,
        color: theme.colors.red
    },
    title: {
        fontSize: theme.fontSizes.cardTitle,
        fontFamily: theme.fonts.bold,
        color: theme.colors.red
    },
    text: {
        fontSize: theme.fontSizes.cardText,
        fontFamily: theme.fonts.regular,
    },
    image: {
        width: '100%',
        height: 240,
        padding: -10,
        margin: -10
    },

});