import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { Button } from 'react-native-elements';
import AppInput from '../../components/input';
import { addCourse } from '../../redux/actions/courses';
import { useDispatch } from 'react-redux';
import theme from '../../constants/theme';

export default function AddCourseScreen({ navigation }) {

    //Constants
    const [course, setCourse] = useState('');
    const dispatch = useDispatch();
    const addNewCourse = (course) => dispatch(addCourse(course));

    const saveCourse = () => {
        let canBeSaved = true;
        if (!course.name) {
            Alert.alert('Fill every fields', 'You must enter the name of the course');
            canBeSaved = false;
        }
        if (!course.teacher) {
            Alert.alert('Fill every fields', 'You must enter the name of the teacher');
            canBeSaved = false;
        }
        if (!course.university) {
            Alert.alert('Fill every fields', 'You must enter the name of the university');
            canBeSaved = false;
        }

        if (canBeSaved) {
            addNewCourse(course);
            navigation.goBack();
        }

    }

    return (
        <View style={styles.container}>
            <View style={styles.inputContainer}>
                <Text style={styles.title}>Enter the course information</Text>
                <AppInput
                    placeholder="Type the name of the course here"
                    color={theme.colors.lightBlue}
                    action={value => setCourse({ ...course, name: value })}
                />
                <AppInput
                    placeholder="Type the name of the teacher here"
                    color={theme.colors.lightBlue}
                    action={value => setCourse({ ...course, teacher: value })}
                />
                <AppInput
                    placeholder="Type the university here"
                    color={theme.colors.lightBlue}
                    action={value => setCourse({ ...course, university: value })}
                />
            </View>

            <View style={styles.buttonContainer}>
                <Button
                    buttonStyle={styles.sendButton}
                    titleStyle={styles.sendButtonText}
                    onPress={() => saveCourse()}
                    title="SEND" />
            </View>
            <StatusBar style="auto" />
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    title: {
        fontFamily: theme.fonts.bold,
        fontSize: theme.fontSizes.screenTitle,
        color: theme.colors.blue,
        marginTop: 15,
        marginBottom: 20,
        textAlign: 'center'
    },
    sendButton: {
        backgroundColor: 'white',
        borderWidth: 1,
        borderColor: theme.colors.blue,
        borderRadius: theme.borderRadius.button,
    },
    sendButtonText: {
        color: theme.colors.blue,
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
