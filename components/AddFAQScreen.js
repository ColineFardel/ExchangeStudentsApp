import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { useFonts } from 'expo-font';
import { StyleSheet, Text, View, TextInput } from 'react-native';
import { Input, Button } from 'react-native-elements';

export default function AddFAQScreen({ route, navigation }) {

    const [question, setQuestion] = useState('');

    const [loaded] = useFonts({
        Montserrat: require('../assets/myfonts/Montserrat-Regular.ttf'),
        MontserratBold: require('../assets/myfonts/Montserrat-Bold.ttf'),
    });

    const saveQuestion = () => {
        const url = 'https://exchangestudentsapp-fardel.herokuapp.com/addfaq';
        const newQuestion = {question : question, status:'sent', answer:'Not answered yet'};
        console.log(newQuestion);
        fetch(url, {
            method: 'POST',
            headers: { 'Content-type': 'application/json' },
            body: JSON.stringify(newQuestion)
        })
            .then(_ => {
                console.log("Question added");
                navigation.goBack();
            })
            .catch((error) => {
                Alert.alert('Error', error);
            });
    }

    return (
        <View style={styles.container}>

            <Text style={styles.title}>Ask a question</Text>

            <Input
                placeholder="Type your question here"
                style={styles.input}
                inputStyle={{ color: 'black', fontFamily: 'MontserratBold', padding: 10, margin: 10 }}
                placeholderTextColor='black'
                inputContainerStyle={{ color: 'green', borderBottomWidth: 0 }}
                onChangeText={value => setQuestion(value)}
                multiline={true}
                autoFocus={true}
            />

            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', width: '90%' }}>
                <Button
                    buttonStyle={{ backgroundColor: 'red', borderRadius: 10 }}
                    titleStyle={{ color: 'white', fontFamily: 'MontserratBold', fontSize: 24 }}
                    onPress={() => navigation.goBack()}
                    title="CANCEL" />
                <Button
                    buttonStyle={{ backgroundColor: 'white', borderWidth: 1, borderColor: '#6DD07D', borderRadius: 10 }}
                    titleStyle={{ color: '#6DD07D', fontFamily: 'MontserratBold', fontSize: 24 }}
                    onPress={() => saveQuestion()}
                    title="SEND" />
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
        fontFamily: 'MontserratBold',
        fontSize: 36,
        color: '#6DD07D',
    },
    input: {
        borderWidth: 0,
        borderRadius: 10,
        width: '90%',
        backgroundColor: '#6DD07D',
        opacity: 0.5,
    },
});
