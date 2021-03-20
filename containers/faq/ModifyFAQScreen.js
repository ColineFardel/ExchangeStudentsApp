import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Input, Button } from 'react-native-elements';
import { deleteFaq, modifyFaq } from '../../redux/actions/faq';
import { useDispatch } from 'react-redux';
import theme from '../../constants/theme';

export default function ModifyFAQScreen({ navigation, route }) {

    //Constants
    const faq = route.params;
    const dispatch = useDispatch();
    const modifyFAQ = (faq) => dispatch(modifyFaq(faq));
    const deleteFAQ = (index) => dispatch(deleteFaq(index));
    const [answer, setAnswer] = useState(faq.answer);
    const [tag, setTag] = useState(faq.tag);

    useEffect(() => {
        setAnswer(faq.answer);
    }, [])

    const handleDelete = () => {
        deleteFAQ(faq.id);
        navigation.goBack();
    }

    const handleModify = () => {
        let newFaq = {
            answer: answer,
            tag: tag,
            id: faq.id
        }
        modifyFAQ(newFaq);
        navigation.goBack();
    }

    return (
        <View style={styles.container}>
            <View style={{ width: '100%', justifyContent: 'center', alignItems: 'center' }}>
                <Text style={styles.questionTitle}>{faq.question}</Text>
                <Input
                    label="Answer"
                    placeholder={faq.answer}
                    inputStyle={styles.inputSyle}
                    placeholderTextColor='grey'
                    inputContainerStyle={styles.inputContainer}
                    onChangeText={value => setAnswer(value)}
                    multiline={true}
                    autoFocus={true}
                />
                <Input
                    label="Tag"
                    placeholder={faq.tag}
                    inputStyle={styles.inputSyle}
                    placeholderTextColor='grey'
                    inputContainerStyle={styles.inputContainer}
                    onChangeText={value => setTag(value)}
                    multiline={true}
                    autoFocus={true}
                />
            </View>

            <View style={styles.buttonContainer}>
                <Button
                    buttonStyle={styles.deleteButton}
                    titleStyle={styles.deleteButtonText}
                    onPress={() => handleDelete()}
                    title="DELETE" />
                <Button
                    buttonStyle={styles.saveButton}
                    titleStyle={styles.saveButtonText}
                    onPress={() => handleModify()}
                    title="SAVE" />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingBottom: 20,
        paddingTop: 20,
    },
    inputContainer: {
        color: theme.colors.green,
        borderBottomWidth: 1,
        borderBottomColor: theme.colors.green,
    },
    questionTitle: {
        fontFamily: theme.fonts.bold,
        color: theme.colors.green,
        fontSize: theme.fontSizes.screenTitle,
        width: '90%',
        marginBottom: 25
    },
    inputSyle: {
        color: theme.colors.green,
        fontFamily: theme.fonts.bold,
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '90%'
    },
    deleteButton: {
        backgroundColor: 'red',
        borderRadius: 10
    },
    saveButton: {
        backgroundColor: 'white',
        borderWidth: 1,
        borderColor: theme.colors.green,
        borderRadius: theme.borderRadius.button
    },
    deleteButtonText: {
        color: 'white',
        fontFamily: theme.fonts.bold,
        fontSize: theme.fontSizes.buttonText
    },
    saveButtonText: {
        color: theme.colors.green,
        fontFamily: theme.fonts.bold,
        fontSize: theme.fontSizes.buttonText
    }
});
