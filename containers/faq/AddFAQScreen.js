import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, Text, View, Alert } from 'react-native';
import { Button } from 'react-native-elements';
import AppInput from '../../components/input';
import { addFaq } from '../../redux/actions/faq';
import { useDispatch, useSelector } from 'react-redux';
import theme from '../../constants/theme';

export default function AddFAQScreen({ route, navigation }) {

    //Constants
    const token = useSelector(state => state.authReducer.token);
    const [question, setQuestion] = useState('');
    const dispatch = useDispatch();
    const addFAQ = (faq, token) => dispatch(addFaq(faq, token));

    //Save the question in the database
    const saveQuestion = () => {
        if (question) {
            const newQuestion = { question: question, status: 'sent', answer: 'Not answered yet' };
            addFAQ(newQuestion, token);
            navigation.goBack();
        }
        else {
            Alert.alert('You forgot a field', 'Please enter a question');
        }
    }

    return (
        <View style={styles.container}>
            <View style={styles.inputContainer}>
                <Text style={styles.title}>Ask a question</Text>
                <AppInput
                    placeholder="Type your question here"
                    color={theme.colors.lightGreen}
                    action={value => setQuestion(value)}
                />
            </View>

            <View style={styles.buttonContainer}>
                <Button
                    raised={true}
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
        marginTop: 15,
        marginBottom: 20,
        textAlign: 'center'
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
