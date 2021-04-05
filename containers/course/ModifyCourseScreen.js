import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Input, Button } from 'react-native-elements';
import { deleteCourse, modifyCourse } from '../../redux/actions/courses';
import { useDispatch } from 'react-redux';
import theme from '../../constants/theme';

export default function ModifyCourseScreen({ navigation, route }) {

    //Constants
    const course = route.params;
    const dispatch = useDispatch();
    const modifyOneCourse = (course) => dispatch(modifyCourse(course));
    const deleteOneCourse = (index) => dispatch(deleteCourse(index));
    const [name, setName] = useState(course.name);
    const [teacher, setTeacher] = useState(course.teacher);
    const [uni, setUni] = useState(course.university);

    const handleDelete = () => {
        deleteOneCourse(course.id);
        navigation.goBack();
    }

    const handleModify = () => {
        let newCourse = {
            name: name.trim() ? name : course.name,
            teacher: teacher.trim() ? teacher : course.teacher,
            university: uni.trim() ? uni : course.university,
            id: course.id
        }
        modifyOneCourse(newCourse);
        navigation.goBack();
    }

    return (
        <View style={styles.container}>
            <View style={{ width: '100%', justifyContent: 'center', alignItems: 'center' }}>
                <Input
                    label="Name"
                    placeholder={course.name}
                    inputStyle={styles.inputSyle}
                    placeholderTextColor='grey'
                    inputContainerStyle={styles.inputContainer}
                    onChangeText={value => setName(value)}
                    multiline={true}
                    autoFocus={true}
                />
                <Input
                    label="Teacher"
                    placeholder={course.teacher}
                    inputStyle={styles.inputSyle}
                    placeholderTextColor='grey'
                    inputContainerStyle={styles.inputContainer}
                    onChangeText={value => setTeacher(value)}
                    multiline={true}
                    autoFocus={true}
                />
                <Input
                    label="University"
                    placeholder={course.university}
                    inputStyle={styles.inputSyle}
                    placeholderTextColor='grey'
                    inputContainerStyle={styles.inputContainer}
                    onChangeText={value => setUni(value)}
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
        borderBottomColor: theme.colors.blue,
    },
    questionTitle: {
        fontFamily: theme.fonts.bold,
        color: theme.colors.blue,
        fontSize: theme.fontSizes.screenTitle,
        width: '90%',
        marginBottom: 25
    },
    inputSyle: {
        color: theme.colors.blue,
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
        borderColor: theme.colors.blue,
        borderRadius: theme.borderRadius.button
    },
    deleteButtonText: {
        color: 'white',
        fontFamily: theme.fonts.bold,
        fontSize: theme.fontSizes.buttonText
    },
    saveButtonText: {
        color: theme.colors.blue,
        fontFamily: theme.fonts.bold,
        fontSize: theme.fontSizes.buttonText
    }
});
