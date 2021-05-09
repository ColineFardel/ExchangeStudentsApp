import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import theme from '../constants/theme';
import { useSelector, useDispatch } from 'react-redux';
import { getUser, getUsersObjects } from '../redux/actions/authentication';
import { ScrollView } from 'react-native-gesture-handler';
import { deleteOffer, deleteRequest } from '../redux/actions/market';
import { deleteEvent } from '../redux/actions/events';
import { deleteTip } from '../redux/actions/tip';
import { useFocusEffect } from '@react-navigation/core';
import Icon from 'react-native-vector-icons/FontAwesome';

export default function HomeScreen({ navigation }) {

    //Constants for user
    const userCredentials = useSelector(state => state.authReducer.userCredentials);
    const token = useSelector(state => state.authReducer.token);
    const userObjects = useSelector(state => state.authReducer.userObjects);
    const dispatch = useDispatch();
    const getCurrentUser = (username, token) => dispatch(getUser(username, token));
    const getCurrentUserObjects = (user, token) => dispatch(getUsersObjects(user, token));

    //Constants to delete objects
    const deleteAnOffer = (index, token) => dispatch(deleteOffer(index, token));
    const removeRequest = (index, token) => dispatch(deleteRequest(index, token));
    const deleteOneTip = (index, token) => dispatch(deleteTip(index, token));
    const deleteOneEvent = (index, token) => dispatch(deleteEvent(index, token));

    useEffect(() => {
        getCurrentUser(userCredentials.username, token);
    }, []);

    useFocusEffect(() => {
        getCurrentUserObjects(userCredentials, token);
    });

    const showObjects = () => {
        if (userObjects) {
            return (
                <ScrollView style={{ width: '100%' }}>
                    <Text style={styles.text}>Events</Text>
                    { userObjects.events && showEvents()}
                    <Text style={styles.text}>Tips</Text>
                    {userObjects.tips && showTips()}
                    <Text style={styles.text}>Offers</Text>
                    {userObjects.offers && showOffers()}
                    <Text style={styles.text}>Requests</Text>
                    {userObjects.requests && showRequests()}
                </ScrollView>
            )
        }
        else {
            return (
                <Text>You have nothing :(</Text>
            )
        }
    }
    const showEvents = () => {
        return userObjects.events.map((item, index) => {
            return (
                <View style={styles.itemContainer} key={index}>
                    <AppListItem
                        color={theme.colors.lightPink}
                        title={item.name}
                        subtitle={item.location}
                        secondsubtitle={item.time}
                        onPressAction={() => { navigation.navigate('EventDetails', item) }}
                        key={index}
                    />
                    <Icon name={"trash"}
                        size={20}
                        color="red"
                        onPress={() => { deleteOneEvent(item.id, token) }} />
                </View>

            );
        });
    }
    const showTips = () => {
        return userObjects.tips.map((tip, index) => {
            const uri = 'https://exchangestudentsapp-fardel.herokuapp.com/img/' + tip.imgId;
            if (tip.imgId > 0) {
                return (
                    <View style={styles.itemContainer} key={index}>
                        <AppListItem
                            key={index}
                            onPressAction={() => { navigation.navigate('TipDetails', tip) }}
                            title={tip.name}
                            color={theme.colors.lightPurple}
                            subtitle={tip.tag}
                            uri={uri}
                        />
                        <Icon name={"trash"}
                            size={20}
                            color="red"
                            onPress={() => { deleteOneTip(tip.id, token) }} />
                    </View>



                )
            }
            else {
                return (
                    <View style={styles.itemContainer} key={index}>
                        <AppListItem
                            key={index}
                            onPressAction={() => { navigation.navigate('TipDetails', tip) }}
                            title={tip.name}
                            color={theme.colors.lightPurple}
                            subtitle={tip.tag}
                        />
                        <Icon name={"trash"}
                            size={20}
                            color="red"
                            onPress={() => { deleteOneTip(tip.id, token) }} />
                    </View>

                )
            }
        });
    }
    const showOffers = () => {
        return userObjects.offers.map((offer, index) => {
            let uri = 'https://exchangestudentsapp-fardel.herokuapp.com/img/' + offer.imgId;
            return (
                <View style={styles.itemContainer} key={index}>
                    <AppListItem
                        key={index}
                        onPressAction={() => navigation.navigate("OfferDetails", offer)}
                        title={offer.name}
                        subtitle={offer.price + '€'}
                        secondsubtitle={offer.location}
                        uri={uri}
                        color={theme.colors.lightRed}
                    />
                    <Icon name={"trash"}
                        size={20}
                        color="red"
                        onPress={() => deleteAnOffer(offer.id, token)} />
                </View>

            )
        });
    }
    const showRequests = () => {
        return userObjects.requests.map((request, index) => {
            let uri = 'https://exchangestudentsapp-fardel.herokuapp.com/img/' + request.imgId;
            return (
                <View style={styles.itemContainer} key={index}>
                    <AppListItem
                        key={index}
                        color={theme.colors.lightRed}
                        onPressAction={() => navigation.navigate("RequestDetails", request)}
                        title={request.name}
                        subtitle={request.description}
                        secondsubtitle={request.location}
                        uri={uri}
                    />
                    <Icon name={"trash"}
                        size={20}
                        color="red"
                        onPress={() => removeRequest(request.id, token)} />
                </View>

            )
        })
    }

    return (
        <View style={styles.container}>
            <View style={{ flex: 1, margin: 30, marginBottom: 10 }}>
                <Text style={styles.title}>Welcome! Here are what you created so far:</Text>
            </View>
            <View style={{ flex: 8, width: '100%' }}>
                {showObjects()}
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
        margin: 10,
        marginTop: 0,
        fontSize: theme.fontSizes.buttonText,
        fontFamily: theme.fonts.regular
    },
    itemContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 20
    }
});
