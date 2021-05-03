import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, Alert, ScrollView } from 'react-native';
import { Button } from 'react-native-elements';
import * as ImagePicker from 'expo-image-picker';
import theme from '../../constants/theme';
import AppInput from '../../components/input';
import { addRequest } from '../../redux/actions/market';
import { useDispatch, useSelector } from 'react-redux';

export default function AddRequestScreen({ navigation }) {

    //Constants
    const token = useSelector(state => state.authReducer.token);
    const [photo, setPhoto] = useState(null);
    const [name, setName] = useState('');
    const [desc, setDesc] = useState('');
    const [location, setLocation] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const dispatch = useDispatch();
    const addTheRequest = (request, token) => dispatch(addRequest(request, token));
    const user = useSelector(state => state.authReducer.user);

    //Open the user's library to choose a picture
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

    //Open user's camero to take a picture
    const takePicture = async () => {
        let result = await ImagePicker.launchCameraAsync({
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

    //Show alert for user to choose how to add a picture
    const pictureOption = () => {
        Alert.alert('Add a picture', 'Choose which way you would like to add a picture', [
            { text: 'Camera roll', onPress: () => { takePicture() } },
            { text: 'Gallery', onPress: () => { selectPicture() } }
        ]);
    }

    //Save the request in the database
    const saveRequest = () => {
        let canBeSaved = true;

        if (!name) {
            Alert.alert('Fill every fields', 'You must enter the name of your request');
            canBeSaved = false;
        }
        if (!desc) {
            Alert.alert('Fill every fields', 'You must enter a description for your request');
            canBeSaved = false;
        }
        if (!location) {
            Alert.alert('Fill every fields', 'You must enter your location');
            canBeSaved = false;
        }
        if (!photo) {
            Alert.alert('Fill every fields', 'You must upload an image of your request');
            canBeSaved = false;
        }
        console.log(user);

        if (canBeSaved) {
            const data = new FormData();
            data.append('file', { name: photo.name, type: photo.type, uri: photo.uri });
            data.append('name', name);
            data.append('desc', desc);
            data.append('location', location);
            data.append('user', user);

            addTheRequest(data, token);
            navigation.goBack();
        }
    }

    return (
        <View style={styles.container}>
            <View style={styles.inputContainer}>
                <Text style={styles.title}>Enter your request information</Text>
                <ScrollView style={{ width: '100%' }}>
                    <AppInput
                        placeholder="Type the name of your request"
                        color={theme.colors.lightRed}
                        action={value => setName(value)}
                    />
                    <AppInput
                        placeholder="Type the description of your request"
                        color={theme.colors.lightRed}
                        action={value => setDesc(value)}
                    />
                    <AppInput
                        placeholder="Type your location"
                        color={theme.colors.lightRed}
                        action={value => setLocation(value)}
                    />
                    <TouchableOpacity
                        onPress={() => { pictureOption() }}
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
                    raised={true}
                    buttonStyle={styles.createButton}
                    titleStyle={styles.createButtonText}
                    onPress={() => saveRequest()}
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
        justifyContent: 'space-between',
    },
    title: {
        fontFamily: theme.fonts.bold,
        fontSize: theme.fontSizes.screenTitle,
        color: theme.colors.red,
        marginTop: 15,
        marginBottom: 20,
        textAlign: 'center'
    },
    createButton: {
        backgroundColor: 'white',
        borderWidth: 1,
        borderColor: theme.colors.red,
        borderRadius: theme.borderRadius.button
    },
    buttonContainer: {
        alignItems: 'center',
        width: '90%',
        margin: 15,
        flex: 1
    },
    createButtonText: {
        color: theme.colors.red,
        fontFamily: theme.fonts.bold,
        fontSize: theme.fontSizes.buttonText,
        width: '70%'
    },
    card: {
        backgroundColor: theme.colors.lightRed,
        borderRadius: theme.borderRadius.card,
        width: '90%',
        padding: 10,
        margin: 10,
    },
    cardTitle: {
        maxWidth: '90%',
        fontFamily: theme.fonts.bold,
        fontSize: theme.fontSizes.cardTitle,
        color: 'white'
    },
    inputContainer: {
        alignItems: 'center',
        width: '100%',
        flex: 15
    }
});
