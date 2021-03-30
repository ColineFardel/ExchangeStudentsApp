import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, Text, View, Alert } from 'react-native';
import { Button } from 'react-native-elements';
import AppInput from '../../components/input';
import { addTopic } from '../../redux/actions/forum';
import { useDispatch } from 'react-redux';
import theme from '../../constants/theme';

export default function AddTopicScreen({ route, navigation }) {

    //Constants
    const [topic, setTopic] = useState('');
    const dispatch = useDispatch();
    const saveTopic = (topic) => dispatch(addTopic(topic));

    const saveTheTopic = () => {
        if (topic.trim()) {
            saveTopic({ name: topic });
            navigation.goBack();
        }
        else {
            Alert.alert('You forgot a field', 'Please enter a name for the topic');
        }
    }

    return (
        <View style={styles.container}>
            <View style={styles.inputContainer}>
                <Text style={styles.title}>Create your own topic</Text>
                <AppInput
                    placeholder="Type the name of the topic"
                    color={theme.colors.lightOrange}
                    action={value => setTopic(value)}
                />
            </View>

            <View style={styles.buttonContainer}>
                <Button
                    buttonStyle={styles.sendButton}
                    titleStyle={styles.sendButtonText}
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
        justifyContent: 'space-between',
    },
    title: {
        fontFamily: theme.fonts.bold,
        fontSize: theme.fontSizes.screenTitle,
        color: theme.colors.orange,
        marginTop: 15,
        marginBottom: 20
    },
    sendButton: {
        backgroundColor: 'white',
        borderWidth: 1,
        borderColor: theme.colors.orange,
        borderRadius: theme.borderRadius.button
    },
    sendButtonText: {
        color: theme.colors.orange,
        fontFamily: theme.fonts.bold,
        fontSize: theme.fontSizes.buttonText,
        width: '70%'
    },
    buttonContainer: {
        alignItems: 'center',
        width: '90%',
        marginBottom: 15
    },
    inputContainer: {
        alignItems: 'center',
        width: '100%'
    }
});
