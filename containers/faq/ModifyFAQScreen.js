import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Input, Button } from 'react-native-elements';
import { deleteFaq, modifyFaq } from '../../redux/actions/faq';
import { useDispatch, useSelector } from 'react-redux';
import theme from '../../constants/theme';
import Icon from 'react-native-vector-icons/FontAwesome';

export default function ModifyFAQScreen({ navigation, route }) {

    //Constants
    const token = useSelector(state => state.authReducer.token);
    const faq = route.params;
    const dispatch = useDispatch();
    const modifyFAQ = (faq, token) => dispatch(modifyFaq(faq, token));
    const deleteFAQ = (index, token) => dispatch(deleteFaq(index, token));
    const [answer, setAnswer] = useState(faq.answer);
    const [tag, setTag] = useState(faq.tag);
    let tagPlaceholder = '';
    if (faq.tag)
        tagPlaceholder = faq.tag.substring(1);

    //Delete an FAQ
    const handleDelete = () => {
        deleteFAQ(faq.id, token);
        navigation.goBack();
    }

    //Modify an FAQ
    const handleModify = () => {
        let newFaq = {
            answer: answer.trim() ? answer : faq.answer,
            tag: tag.trim() ? tag : faq.tag,
            id: faq.id
        }
        modifyFAQ(newFaq, token);
        navigation.goBack();
    }

    const updateTag = (value) => {
        let tag = '';
        if (value.charAt(0) !== '#') {
            tag = '#' + value;
            setTag(tag);
        }
        else setTag(value);
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
                    placeholder={tagPlaceholder}
                    inputStyle={styles.inputSyle}
                    placeholderTextColor='grey'
                    inputContainerStyle={styles.inputContainer}
                    onChangeText={value => updateTag(value)}
                    multiline={true}
                    autoFocus={true}
                    leftIcon={<Icon name='hashtag'
                        size={20}
                        color={theme.colors.lightGreen} />}
                />
            </View>

            <View style={styles.buttonContainer}>
                <Button
                    raised={true}
                    buttonStyle={styles.deleteButton}
                    titleStyle={styles.deleteButtonText}
                    onPress={() => handleDelete()}
                    title="DELETE" />
                <Button
                    raised={true}
                    buttonStyle={styles.saveButton}
                    titleStyle={styles.saveButtonText}
                    onPress={() => handleModify()}
                    title="SAVE" />
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
