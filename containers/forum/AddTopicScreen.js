import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Button } from 'react-native-elements';
import AppInput from '../../components/input';
import { addTopic } from '../../redux/actions/forum';
import { useDispatch } from 'react-redux';
import theme from '../../constants/theme';
import { Alert } from 'react-native';

export default function AddTopicScreen({ route, navigation }) {

    //Constants
    const [topic, setTopic] = useState('');
    const dispatch = useDispatch();
    const saveTopic = (topic) => dispatch(addTopic(topic));

    const saveTheTopic = () => {
        if (topic.trim()) {
            console.log(topic);
            saveTopic({ name: topic });
            navigation.goBack();
        }
        else {
            Alert.alert('You forgot a field', 'Please enter a name for the topic');
        }

    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Create your own topic</Text>
            <AppInput
                placeholder="Type the name of the topic"
                color={theme.colors.lightOrange}
                action={value => setTopic(value)}
            />
            <View style={styles.buttonContainer}>
                <Button
                    buttonStyle={styles.cancelButton}
                    titleStyle={{ color: 'white', fontFamily: theme.fonts.bold, fontSize: theme.fontSizes.buttonText }}
                    onPress={() => navigation.goBack()}
                    title="CANCEL" />
                <Button
                    buttonStyle={styles.sendButton}
                    titleStyle={{ color: theme.colors.orange, fontFamily: theme.fonts.bold, fontSize: theme.fontSizes.buttonText }}
                    onPress={() => saveTheTopic()}
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
        fontFamily: theme.fonts.bold,
        fontSize: theme.fontSizes.screenTitle,
        color: theme.colors.orange,
    },
    cancelButton: {
        backgroundColor: 'red',
        borderRadius: 10
    },
    sendButton: {
        backgroundColor: 'white',
        borderWidth: 1,
        borderColor: theme.colors.orange,
        borderRadius: theme.borderRadius.card
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '90%'
    },
});
