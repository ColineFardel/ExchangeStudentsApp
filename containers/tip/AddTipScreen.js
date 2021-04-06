import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, View, Text, Alert } from 'react-native';
import AppInput from '../../components/input';
import { addTip } from '../../redux/actions/tip';
import { useDispatch } from 'react-redux';
import theme from '../../constants/theme';
import { Button } from 'react-native-elements';

export default function AddTipScreen({ navigation }) {
    //Constants
    const [tip, setTip] = useState('');
    const dispatch = useDispatch();
    const saveTip = (tip) => dispatch(addTip(tip));

    const saveTheTip = () => {
        let canBeSaved = true;

        if (!tip.name) {
            Alert.alert('Fill every fields', 'You must enter the name of the tip');
            canBeSaved = false;
        }
        if (!tip.description) {
            Alert.alert('Fill every fields', 'You must enter the description of the tip');
            canBeSaved = false;
        }
        if (!tip.tag) {
            Alert.alert('Fill every fields', 'You must enter the tag of the tip');
            canBeSaved = false;
        }

        if (canBeSaved) {
            saveTip(tip);
            navigation.goBack();
        }
    }

    return (
        <View style={styles.container}>
            <View style={styles.inputContainer}>
                <Text style={styles.title}>Create your own tip</Text>
                <AppInput
                    placeholder="Type the name of the tip"
                    color={theme.colors.lightPurple}
                    action={value => setTip({ ...tip, name: value })}
                />
                <AppInput
                    placeholder="Type the description of the tip"
                    color={theme.colors.lightPurple}
                    action={value => setTip({ ...tip, description: value })}
                />
                <AppInput
                    placeholder="Type the tag of the tip"
                    color={theme.colors.lightPurple}
                    action={value => setTip({ ...tip, tag: value })}
                />
                <AppInput
                    placeholder="Type the location of the tip"
                    color={theme.colors.lightPurple}
                    action={value => setTip({ ...tip, location: value })}
                />
            </View>

            <View style={styles.buttonContainer}>
                <Button
                    buttonStyle={styles.sendButton}
                    titleStyle={styles.sendButtonText}
                    onPress={() => saveTheTip()}
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
        justifyContent: 'flex-start',
        width: '100%',
    },
    title: {
        fontFamily: theme.fonts.bold,
        fontSize: theme.fontSizes.screenTitle,
        color: theme.colors.purple,
        marginTop: 15,
        marginBottom: 20,
        textAlign: 'center'
    },
    sendButton: {
        backgroundColor: 'white',
        borderWidth: 1,
        borderColor: theme.colors.purple,
        borderRadius: theme.borderRadius.button,
    },
    sendButtonText: {
        color: theme.colors.purple,
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
