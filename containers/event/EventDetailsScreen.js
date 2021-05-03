import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { StyleSheet, View, ScrollView, Text } from 'react-native';
import { deleteTopic, getTopics, setVisibleFalse } from '../../redux/actions/forum';
import { useDispatch, useSelector } from 'react-redux';
import theme from '../../constants/theme';
import Foot from '../../components/foot';
import AppSnackBar from '../../components/snackbar';
import Loading from '../../components/loading';
import AppListItem from '../../components/listItem';
import Icon from 'react-native-vector-icons/FontAwesome';

export default function EventDetailsScreen({ navigation, route }) {

    const event = route.params;

    return (
        <View style={styles.container}>
            <View style={styles.titleContainer}>

                <Icon name={"chevron-left"}
                    size={20}
                    color="black"
                    onPress={() => navigation.goBack()} />
                <Text style={styles.bigTitle}>{event.name}</Text>
            </View>
            <View style={styles.detailsContainer}>
                <Text style={styles.title}>Description</Text>
                <Text style={styles.text}>{event.description}</Text>
                <Text style={styles.title}>Location</Text>
                <Text style={styles.text}>{event.location}</Text>
                <Text style={styles.title}>Time</Text>
                <Text style={styles.text}>{event.time}</Text>
                <Text style={styles.title}>Date</Text>
                <Text style={styles.text}>{event.date}</Text>
                <Text style={styles.title}>Organizer</Text>
                <Text style={styles.text}>{event.user.username}</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        alignItems: 'center',
        width: '100%',
    },
    titleContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        margin: 25,
        marginBottom: 0
    },
    detailsContainer: {
        flex: 8,
        backgroundColor: theme.colors.pink,
        width: '100%',
        borderTopStartRadius: 30,
        borderTopEndRadius: 30,
        padding: 25
    },
    title: {
        fontSize: theme.fontSizes.cardTitle,
        fontFamily: theme.fonts.bold,
        color: 'white',
        marginBottom: 10,
    },
    text: {
        fontSize: theme.fontSizes.cardText,
        fontFamily: theme.fonts.regular,
        marginBottom: 30,
        color: 'white'
    },
    bigTitle: {
        fontSize: theme.fontSizes.screenTitle,
        fontFamily: theme.fonts.bold,
        color: theme.colors.pink,
        marginLeft: 25,
        width: '90%',
    },
});
