import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Image, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import theme from '../../constants/theme';
import { Button } from 'react-native-elements';

export default function TipDetailsScreen({ navigation, route }) {

    const tip = route.params;

    return (
        <View style={styles.container}>
            <View style={styles.imageContainer}>
                <TouchableOpacity
                //onPress={() => { navigation.navigate('Images', item.imgId) }}
                >
                    {/* <Image style={styles.image} source={{ uri: uri }} /> */}
                    <Image style={styles.image} source={require('../../assets/defaultTip.png')} />
                </TouchableOpacity>

            </View>
            <View style={styles.detailsContainer}>
                <View style={styles.titleContainer}>
                    <Icon name={"chevron-left"}
                        size={20}
                        color="black"
                        onPress={() => navigation.goBack()} />
                    <Text style={styles.bigTitle} multiline={true}>{tip.name}</Text>
                </View>
                <View style={styles.textContainer}>
                    <Text style={styles.title}>Description</Text>
                    <Text style={styles.text}>{tip.description}</Text>
                    {tip.location && (
                        <View>
                            <Text style={styles.title}>Location</Text>
                            <Text style={styles.text}>{tip.location}</Text>
                        </View>
                    )}
                    <Text style={styles.title}>Tag</Text>
                    <Text style={styles.text}>{tip.tag}</Text>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center',
    },
    bigTitle: {
        fontSize: theme.fontSizes.screenTitle,
        fontFamily: theme.fonts.bold,
        color: theme.colors.purple,
        marginLeft: 25,
        marginRight: 25,
    },
    title: {
        fontSize: theme.fontSizes.cardTitle,
        fontFamily: theme.fonts.bold,
        color: theme.colors.purple,
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
        borderColor: theme.colors.lightPurple,
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
    }
});
