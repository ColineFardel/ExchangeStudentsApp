import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, Text, View, Alert } from 'react-native';
import { Button } from 'react-native-elements';
import AppInput from '../../components/input';
import { addFaq } from '../../redux/actions/faq';
import { useDispatch } from 'react-redux';
import theme from '../../constants/theme';

export default function AddFAQScreen({ route, navigation }) {

    //Constants
    const [question, setQuestion] = useState('');
    const dispatch = useDispatch();
    const addFAQ = (faq) => dispatch(addFaq(faq));

    const saveQuestion = () => {
        if (question.trim()) {
            const newQuestion = { question: question, status: 'sent', answer: 'Not answered yet' };
            addFAQ(newQuestion);
            navigation.goBack();
        }
        else {
            Alert.alert('You forgot a field', 'Please enter a question');
        }
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Ask a question</Text>
            <AppInput
                placeholder="Type your question here"
                color={theme.colors.lightGreen}
                action={value => setQuestion(value)}
            />
            <View style={styles.buttonContainer}>
                <Button
                    buttonStyle={styles.cancelButton}
                    titleStyle={styles.cancelButtonText}
                    onPress={() => navigation.goBack()}
                    title="CANCEL" />
                <Button
                    buttonStyle={styles.sendButton}
                    titleStyle={styles.sendButtonText}
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
        justifyContent: 'space-between',
    },
    title: {
        fontFamily: theme.fonts.bold,
        fontSize: theme.fontSizes.screenTitle,
        color: theme.colors.green,
        marginTop: 50
    },
    cancelButton: {
        backgroundColor: 'red',
        borderRadius: theme.borderRadius.button
    },
    sendButton: {
        backgroundColor: 'white',
        borderWidth: 1,
        borderColor: theme.colors.green,
        borderRadius: theme.borderRadius.button
    },
    sendButtonText: {
        color: theme.colors.green,
        fontFamily: theme.fonts.bold,
        fontSize: theme.fontSizes.buttonText
    },
    cancelButtonText: {
        color: 'white',
        fontFamily: theme.fonts.bold,
        fontSize: theme.fontSizes.buttonText
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '90%',
        marginBottom: 15
    },
});
