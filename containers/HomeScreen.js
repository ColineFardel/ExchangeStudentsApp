import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import theme from '../constants/theme';
import { useSelector, useDispatch } from 'react-redux';
import { setVisibleFalse, getUser, getUsersObjects } from '../redux/actions/authentication';
import { ScrollView } from 'react-native-gesture-handler';
import { deleteOffer, deleteRequest } from '../redux/actions/market';
import { deleteEvent } from '../redux/actions/events';
import { deleteTip } from '../redux/actions/tip';
import Icon from 'react-native-vector-icons/FontAwesome';

export default function HomeScreen() {

    //Constants for user
    const userCredentials = useSelector(state => state.authReducer.userCredentials);
    const user = useSelector(state => state.authReducer.user);
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
        getCurrentUserObjects(userCredentials, token);
    }, []);

    const showObjects = () => {
        if (userObjects) {
            return (
                <ScrollView style={{ width: '100%' }}>
                    <Text>Events</Text>
                    { userObjects.events && showEvents()}
                    <Text>Tips</Text>
                    {userObjects.tips && showTips()}
                    <Text>Offers</Text>
                    {userObjects.offers && showOffers()}
                    <Text>Requests</Text>
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
            console.log(item);
            return (
                <AppListItem
                    color={theme.colors.lightPink}
                    title={item.name}
                    subtitle={item.location}
                    secondsubtitle={item.time}
                    //onPressAction={() => { navigation.navigate('EventDetails', item) }}
                    onLongPressAction={() => { deleteOneEvent(item.id, token) }}
                    key={index}
                />
            );
        });
    }
    const showTips = () => {
        return userObjects.tips.map((tip, index) => {
            const uri = 'https://exchangestudentsapp-fardel.herokuapp.com/img/' + tip.imgId;
            if (tip.imgId > 0) {
                return (
                    <AppListItem
                        key={index}
                        //onPressAction={() => { navigation.navigate('TipDetails', tip) }}
                        onLongPressAction={() => { deleteOneTip(tip.id, token) }}
                        title={tip.name}
                        color={theme.colors.lightPurple}
                        subtitle={tip.tag}
                        uri={uri}
                    />


                )
            }
            else {
                return (
                    <AppListItem
                        key={index}
                        //onPressAction={() => { navigation.navigate('TipDetails', tip) }}
                        onLongPressAction={() => { deleteOneTip(tip.id, token) }}
                        title={tip.name}
                        color={theme.colors.lightPurple}
                        subtitle={tip.tag}
                    />
                )
            }
        });
    }
    const showOffers = () => {
        return userObjects.offers.map((offer, index) => {
            let uri = 'https://exchangestudentsapp-fardel.herokuapp.com/img/' + offer.imgId;
            return (
                <AppListItem
                    key={index}
                    //onPressAction={() => navigation.navigate("OfferDetails", offer)}
                    onLongPressAction={() => deleteAnOffer(offer.id, token)}
                    title={offer.name}
                    subtitle={offer.price + '€'}
                    secondsubtitle={offer.location}
                    uri={uri}
                    color={theme.colors.lightRed}
                />
            )
        });
    }
    const showRequests = () => {
        return userObjects.requests.map((request, index) => {
            let uri = 'https://exchangestudentsapp-fardel.herokuapp.com/img/' + request.imgId;
            return (
                <AppListItem
                    key={index}
                    color={theme.colors.lightRed}
                    //onPressAction={() => navigation.navigate("RequestDetails", request)}
                    onLongPressAction={() => removeRequest(request.id, token)}
                    title={request.name}
                    subtitle={request.description}
                    secondsubtitle={request.location}
                    uri={uri}
                />
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
        marginBottom: 10,
        marginTop: 10,
        fontSize: theme.fontSizes.buttonText,
        fontFamily: theme.fonts.regular
    }
});
