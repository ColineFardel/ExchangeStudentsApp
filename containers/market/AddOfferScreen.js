import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, Alert, ScrollView } from 'react-native';
import { Input, Button } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import * as ImagePicker from 'expo-image-picker';
import theme from '../../constants/theme';
import AppInput from '../../components/input';
import { addOffer } from '../../redux/actions/market';
import { useDispatch } from 'react-redux';

export default function AddOfferScreen({ route, navigation }) {

    //Constants
    const [photo, setPhoto] = useState(null);
    const [name, setName] = useState('');
    const [desc, setDesc] = useState('');
    const [location, setLocation] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [price, setPrice] = useState('');
    const dispatch = useDispatch();
    const addTheOffer = (offer) => dispatch(addOffer(offer));

    const selectPicture = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            quality: 1,
            fileName: true,
        });

        if (!result.cancelled) {
            setPhoto({
                name: result.fileName ||
                    result.uri.substr(result.uri.lastIndexOf('/') + 1),
                uri: result.uri,
                type: 'image/png'
            });
        }
    }

    const saveOffer = () => {
        if (!name.trim()) {
            Alert.alert('Fill every fields', 'You must enter the name of your request');
            canBeSaved = false;
        }
        if (!desc.trim()) {
            Alert.alert('Fill every fields', 'You must enter a description for your request');
            canBeSaved = false;
        }
        if (!phoneNumber.trim()) {
            Alert.alert('Fill every fields', 'You must enter your phone number');
            canBeSaved = false;
        }
        if (!location.trim()) {
            Alert.alert('Fill every fields', 'You must enter your location');
            canBeSaved = false;
        }
        if (!photo) {
            Alert.alert('Fill every fields', 'You must upload an image of your request');
            canBeSaved = false;
        }
        if (!price.trim()) {
            Alert.alert('Fill every fields', 'You must enter a price event if it is 0');
            canBeSaved = false;
        }

        if (canBeSaved) {
            const data = new FormData();
            data.append('file', { name: photo.name, type: photo.type, uri: photo.uri });
            data.append('name', name);
            data.append('desc', desc);
            data.append('location', location);
            data.append('phoneNumber', phoneNumber);
            data.append('price', price);

            addTheOffer(data);
            navigation.goBack();
        }
    }

    return (
        <View style={styles.container}>
            <View style={{ flex: 1, justifyContent: 'center' }}>
                <Text style={styles.title}>Add your request</Text>
            </View>
            <View style={{ flex: 5, width: '100%', justifyContent: 'flex-start', alignItems: 'center' }}>
                <ScrollView style={{ width: '100%' }}>
                    <AppInput
                        placeholder="Type the name of your offer"
                        color={theme.colors.lightRed}
                        action={value => setName(value)}
                    />
                    <AppInput
                        placeholder="Type the description of your offer"
                        color={theme.colors.lightRed}
                        action={value => setDesc(value)}
                    />
                    <AppInput
                        placeholder="Type your location"
                        color={theme.colors.lightRed}
                        action={value => setLocation(value)}
                    />
                    <AppInput
                        placeholder="Type your phone number"
                        color={theme.colors.lightRed}
                        action={value => setPhoneNumber(value)}
                        keyboardType={'phone-pad'}
                    />
                    <AppInput
                        placeholder="Type the price of your offer"
                        color={theme.colors.lightRed}
                        action={value => setPrice(value)}
                        keyboardType={'numeric'}
                    />
                    <TouchableOpacity
                        onPress={() => { selectPicture() }}
                        style={{
                            width: "100%", alignItems: 'center',
                        }}
                    >
                        <View style={styles.card}>
                            <Text style={styles.cardTitle}>Upload a picture</Text>
                        </View>

                    </TouchableOpacity>

                    {photo && (
                        <Image
                            source={{ uri: photo.uri }}
                            style={{ width: '100%', height: 500 }}
                        />
                    )}
                </ScrollView>
            </View>


            <View style={styles.buttonContainer}>
                <Button
                    buttonStyle={styles.cancelButton}
                    titleStyle={{ color: 'white', fontFamily: 'MontserratBold', fontSize: 24 }}
                    onPress={() => navigation.goBack()}
                    title="CANCEL" />
                <Button
                    buttonStyle={styles.sendButton}
                    titleStyle={{ color: 'red', fontFamily: 'MontserratBold', fontSize: 24 }}
                    onPress={() => saveOffer()}
                    title="CREATE" />
            </View>

            <StatusBar style="auto" />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'space-around',
    },
    title: {
        fontFamily: theme.fonts.bold,
        fontSize: theme.fontSizes.screenTitle,
        color: theme.colors.red,
    },
    cancelButton: {
        backgroundColor: 'red',
        borderRadius: 10
    },
    sendButton: {
        backgroundColor: 'white',
        borderWidth: 1,
        borderColor: 'red',
        borderRadius: 10
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '90%',
        flex: 1
    },
    card: {
        backgroundColor: theme.colors.lightRed,
        borderRadius: 10,
        width: '90%',
        padding: 10,
        margin: 10,
    },
    cardTitle: {
        maxWidth: '90%',
        fontFamily: theme.fonts.bold,
        fontSize: theme.fontSizes.cardTitle,
        color: theme.colors.grey
    }
});
