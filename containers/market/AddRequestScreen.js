import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, Alert } from 'react-native';
import { Input, Button } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import * as ImagePicker from 'expo-image-picker';
import theme from '../../constants/theme';

export default function AddRequestScreen({ route, navigation }) {
    const [photo, setPhoto] = useState(null);
    const [name, setName] = useState('');
    const [desc, setDesc] = useState('');
    const [location, setLocation] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');


    // const handleChoosePhoto = () => {
    //   const options = {
    //     noData: true
    //   }
    //   ImagePicker.launchImageLibrary(options, response => {
    //     if (response.uri) {
    //       console.log(response);
    //       setPhoto(response);
    //     }

    //   })
    // }

    const selectPicture = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
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

    const saveRequest = () => {

        if(name != '' || desc != ''|| location != ''|| phoneNumber != ''|| photo){
            const data = new FormData();
            data.append('file', { name: photo.name, type: photo.type, uri: photo.uri });
            data.append('name', name);
            data.append('desc', desc);
            data.append('location', location);
            data.append('phoneNumber', phoneNumber);
    
            fetch('https://exchangestudentsapp-fardel.herokuapp.com/addrequest', {
                method: 'POST',
                headers: { 'Content-type': 'multipart/form-data' },
                body: data
            })
                .then(_ => {
                    console.log('Request saved to database');
                    navigation.goBack();
                })
                .catch(err => console.error(err))
        }
        else{
            Alert.alert('You have to fill every field');
        }

        
    }

    return (
        <View style={styles.container}>

            <Text style={styles.title}>Ask a question</Text>
            <Input
                placeholder="Type the name of your request"
                style={styles.input}
                inputStyle={styles.inputStyle}
                placeholderTextColor='black'
                inputContainerStyle={{ color: 'green', borderBottomWidth: 0 }}
                onChangeText={value => setName(value)}
                multiline={true}
                autoFocus={true}
            />
            <Input
                placeholder="Type the description of your request"
                style={styles.input}
                inputStyle={styles.inputStyle}
                placeholderTextColor='black'
                inputContainerStyle={{ color: 'green', borderBottomWidth: 0 }}
                onChangeText={value => setDesc(value)}
                multiline={true}
                autoFocus={true}
            />
            <Input
                placeholder="Type your location"
                style={styles.input}
                inputStyle={styles.inputStyle}
                placeholderTextColor='black'
                inputContainerStyle={{ color: 'green', borderBottomWidth: 0 }}
                onChangeText={value => setLocation(value)}
                multiline={true}
                autoFocus={true}
            />
            <Input
                placeholder="Type your phone number"
                style={styles.input}
                inputStyle={styles.inputStyle}
                placeholderTextColor='black'
                inputContainerStyle={{ color: 'green', borderBottomWidth: 0 }}
                onChangeText={value => setPhoneNumber(value)}
                multiline={true}
                autoFocus={true}
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
                    style={{ width: 300, height: 300 }}
                />
            )}

            <View style={styles.buttonContainer}>
                <Button
                    buttonStyle={styles.cancelButton}
                    titleStyle={{ color: 'white', fontFamily: 'MontserratBold', fontSize: 24 }}
                    onPress={() => navigation.goBack()}
                    title="CANCEL" />
                <Button
                    buttonStyle={styles.sendButton}
                    titleStyle={{ color: 'red', fontFamily: 'MontserratBold', fontSize: 24 }}
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
        justifyContent: 'space-around',
    },
    title: {
        fontFamily: theme.fonts.bold,
        fontSize: theme.fontSizes.screenTitle,
        color: 'red',
    },
    input: {
        borderWidth: 0,
        borderRadius: 10,
        width: '90%',
        backgroundColor: theme.colors.marketColor,
        opacity: 0.5,
    },
    inputStyle: {
        color: 'black',
        fontFamily: theme.fonts.bold,
        padding: 10,
        margin: 10,
        fontSize:theme.fontSizes.cardTitle,
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
        width: '90%'
    },
    card: {
        backgroundColor: theme.colors.marketColor,
        opacity: 0.5,
        borderRadius: 10,
        width: '90%',
        padding: 10,
        margin: 10,
    },
    cardTitle:{
        maxWidth: '90%', 
        fontFamily: theme.fonts.bold, 
        fontSize: theme.fontSizes.cardTitle, 
        color: "#5F5757"
    }
});
