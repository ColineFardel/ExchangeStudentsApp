import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import theme from '../../constants/theme';
import { Button } from 'react-native-elements';
import { Image } from 'react-native';
import { Linking } from 'react-native';
import { TouchableOpacity } from 'react-native';

export default function DetailsScreen({ navigation, route }) {

    const item = route.params;

    //const { item, backButton, navigation } = props

    const uri = 'https://exchangestudentsapp-fardel.herokuapp.com/img/' + item.imgId;

    const openWhatsApp = () => {
        Linking.openURL('whatsapp://send?text=' + 'Hello, I have seen your post on the exchange students app and I am interested! :)' + '&phone=' + item.phoneNumber)
    }

    return (
        <View style={styles.container}>
            <View style={styles.imageContainer}>
                <TouchableOpacity
                    onPress={() => { navigation.navigate('Images', item.imgId) }}>
                    <Image style={styles.image} source={{ uri: uri }} />
                </TouchableOpacity>

            </View>
            <View style={styles.detailsContainer}>
                <View style={styles.titleContainer}>
                    <Icon name={"chevron-left"}
                        size={30}
                        color="black"
                        onPress={()=> navigation.goBack()} />
                    <Text style={styles.bigTitle}>{item.name}</Text>
                </View>
                <View style={styles.textContainer}>
                    <Text style={styles.title}>Description</Text>
                    <Text style={styles.text}>{item.description}</Text>
                    <Text style={styles.title}>Location</Text>
                    <Text style={styles.text}>{item.location}</Text>
                    {item.price && (
                        <View>
                            <Text style={styles.title}>Price</Text>
                            <Text style={styles.text}>{item.price} €</Text>
                        </View>
                    )}
                </View>
                <View style={styles.buttonContainer}>
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
        justifyContent: 'center',
        flex: 1
    },
    button: {
        backgroundColor: 'red',
        borderRadius: theme.borderRadius.button,
        width: '50%',
        margin: 20
    },
    bigTitle: {
        fontSize: theme.fontSizes.screenTitle,
        fontFamily: theme.fonts.bold,
        color: theme.colors.red,
        marginLeft: 25
    },
    title: {
        fontSize: theme.fontSizes.cardTitle,
        fontFamily: theme.fonts.bold,
        color: theme.colors.red,
        marginBottom: 10
    },
    text: {
        fontSize: theme.fontSizes.cardText,
        fontFamily: theme.fonts.regular,
        marginBottom: 30
    },
    image: {
        width: '100%',
        height: 240,
        marginBottom: -10
    },
    imageContainer: {
        width: '100%',
        flex: 1
    },
    detailsContainer: {
        backgroundColor: 'white',
        borderTopStartRadius: 30,
        width: '100%',
        flex: 3,
        borderColor: theme.colors.lightRed,
        borderLeftWidth: 1,
        borderTopWidth: 1
    },
    titleContainer: {
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        marginLeft: 15,
        flex: 1
    },
    textContainer: {
        width: '100%',
        marginLeft: 15,
        justifyContent: 'flex-start',
        flex: 5
    },
    buttonContainer: {
        width: '100%',
        alignItems: 'flex-end',
        justifyContent: 'center',
        flex: 1
    }

});