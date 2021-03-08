import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
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
        const newQuestion = { question: question, status: 'sent', answer: 'Not answered yet' };
        addFAQ(newQuestion);
        navigation.goBack();
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
                    titleStyle={{ color: 'white', fontFamily: theme.fonts.bold, fontSize: theme.fontSizes.buttonText }}
                    onPress={() => navigation.goBack()}
                    title="CANCEL" />
                <Button
                    buttonStyle={styles.sendButton}
                    titleStyle={{ color: theme.colors.green, fontFamily: theme.fonts.bold, fontSize: theme.fontSizes.buttonText }}
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
        fontFamily: theme.fonts.bold,
        fontSize: theme.fontSizes.screenTitle,
        color: theme.colors.green,
    },
    cancelButton: {
        backgroundColor: 'red',
        borderRadius: 10
    },
    sendButton: {
        backgroundColor: 'white',
        borderWidth: 1,
        borderColor: theme.colors.green,
        borderRadius: theme.borderRadius.card
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '90%'
    },
});
