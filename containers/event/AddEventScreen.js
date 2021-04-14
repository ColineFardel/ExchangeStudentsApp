import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, View, Text, Alert } from 'react-native';
import { useDispatch } from 'react-redux';
import theme from '../../constants/theme';
import { addEvent } from '../../redux/actions/events';
import { Button } from 'react-native-elements';
import DateTimePicker from '@react-native-community/datetimepicker';
import moment from "moment-timezone";
import InputButton from '../../components/inputButton';
import { ScrollView } from 'react-native-gesture-handler';

export default function AddEventScreen({ navigation }) {

    //Constants
    const [newEvent, setEvent] = useState('');
    const dispatch = useDispatch();
    const saveEvent = (event) => dispatch(addEvent(event));
    const [date, setDate] = useState(new Date(moment()));
    const [time, setTime] = useState(new Date(moment()));
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [showTimePicker, setShowTimePicker] = useState(false);

    //Save the topic in the database
    const saveTheEvent = () => {
        let canBeSaved = true;
        if (!newEvent.name) {
            Alert.alert('Fill every fields', "You must enter an event's name");
            canBeSaved = false;
        }
        if (!newEvent.description) {
            Alert.alert('Fill every fields', "You must enter an event's description");
            canBeSaved = false;
        }
        if (!newEvent.location) {
            Alert.alert('Fill every fields', "You must enter an event's location");
            canBeSaved = false;
        }
        if (!newEvent.userName) {
            Alert.alert('Fill every fields', "You must enter the organizer's name");
            canBeSaved = false;
        }
        if (!newEvent.date) {
            Alert.alert('Fill every fields', "You must enter a date");
            canBeSaved = false;
        }
        if (!newEvent.time) {
            Alert.alert('Fill every fields', "You must enter a time");
            canBeSaved = false;
        }

        if (canBeSaved) {
            saveEvent(newEvent);
            navigation.goBack();
        }
    }

    const onDateChange = (event, selectedDate) => {
        let currentDate = selectedDate || date;
        setShowDatePicker(Platform.OS === 'ios');
        setDate(currentDate);
        setEvent({ ...newEvent, date: moment(currentDate).format('L') });
    };
    const onTimeChange = (event, selectedTime) => {
        let currentTime = selectedTime || time;
        setShowTimePicker(Platform.OS === 'ios');
        setTime(currentTime);
        setEvent({ ...newEvent, time: moment(currentTime).format('LT') });
    };

    return (
        <View style={styles.container}>
            <View style={styles.inputContainer}>
                <Text style={styles.title}>Create your own event</Text>
                <ScrollView style={{ width: '100%'}} contentContainerStyle={{alignItems:'center'}}>
                    <AppInput
                        placeholder="Type the event's name"
                        color={theme.colors.lightPink}
                        action={value => setEvent({ ...newEvent, name: value })}
                    />
                    <AppInput
                        placeholder="Type the event's description"
                        color={theme.colors.lightPink}
                        action={value => setEvent({ ...newEvent, description: value })}
                    />
                    <AppInput
                        placeholder="Type the event's location"
                        color={theme.colors.lightPink}
                        action={value => setEvent({ ...newEvent, location: value })}
                    />
                    <AppInput
                        placeholder="Type the organizer's name"
                        color={theme.colors.lightPink}
                        action={value => setEvent({ ...newEvent, userName: value })}
                    />
                    <InputButton
                        color={theme.colors.lightPink}
                        text={moment(date).format('L')}
                        action={() => { setShowDatePicker(true) }}
                        icon="calendar"
                    />
                    <InputButton
                        color={theme.colors.lightPink}
                        text={moment(time).format('LT')}
                        action={() => { setShowTimePicker(true) }}
                        icon="clock-o"
                    />
                </ScrollView>
                {showDatePicker && (
                    <DateTimePicker
                        testID="dateTimePicker"
                        value={date}
                        mode="date"
                        display="default"
                        onChange={onDateChange}
                    />
                )}
                {showTimePicker && (
                    <DateTimePicker
                        testID="dateTimePicker"
                        value={time}
                        mode="time"
                        is24Hour={true}
                        display="default"
                        onChange={onTimeChange}
                    />
                )}
            </View>

            <View style={styles.buttonContainer}>
                <Button
                    raised={true}
                    buttonStyle={styles.sendButton}
                    titleStyle={styles.sendButtonText}
                    onPress={() => saveTheEvent()}
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
        justifyContent: 'space-between',
    },
    title: {
        fontFamily: theme.fonts.bold,
        fontSize: theme.fontSizes.screenTitle,
        color: theme.colors.pink,
        marginTop: 15,
        marginBottom: 20,
        textAlign: 'center'
    },
    sendButton: {
        backgroundColor: 'white',
        borderWidth: 1,
        borderColor: theme.colors.pink,
        borderRadius: theme.borderRadius.button
    },
    sendButtonText: {
        color: theme.colors.pink,
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
        width: '100%',
        marginBottom:35
    }
});
