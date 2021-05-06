import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, Linking } from 'react-native';
import theme from '../../constants/theme';
import { Input, Button } from 'react-native-elements';
import { useSelector, useDispatch } from 'react-redux';
import { login, signup, setVisibleFalse, getUser } from '../../redux/actions/authentication';
import { Alert } from 'react-native';

export default function LoginScreen({ navigation }) {

    //Constants for snack bar
    const visible = useSelector(state => state.authReducer.snackBarVisible);
    const message = useSelector(state => state.authReducer.snackBarMessage);
    const removeSnackBar = () => dispatch(setVisibleFalse());

    //Constants to login
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const token = useSelector(state => state.authReducer.token);
    const dispatch = useDispatch();
    const userLogin = (username, password) => dispatch(login(username, password));
    const getCurrentUser = (username, token) => dispatch(getUser(username, token));

    useEffect(() => {
        if (token && username)
            getCurrentUser(username, token);
    }, [token])

    const authWithLogin = () => {
        if (username && password)
            userLogin(username, password);
        else
            Alert.alert('You forgot a field', 'Please enter your username and your password');
    }

    return (
        <View style={styles.container}>
            <View style={{ flex: 1, margin: 30 }}>
                <Text style={styles.title}>Welcome to the exchange students app!</Text>
            </View>
            <View style={{ flex: 8, paddingBottom: 40, justifyContent: 'space-between', width: '100%', backgroundColor: theme.colors.cyan, borderTopRightRadius: theme.borderRadius.screen, borderTopLeftRadius: theme.borderRadius.screen, paddingTop: 30, padding: 10 }}>
                <View style={{ alignItems: 'center' }}>
                    <Input
                        placeholder="Username"
                        style={{
                            borderWidth: 0,
                            borderRadius: 10,
                            width: '90%',
                            backgroundColor: 'white'
                        }}
                        inputStyle={styles.inputStyle}
                        placeholderTextColor={theme.colors.lightGrey}
                        inputContainerStyle={{ borderBottomWidth: 0 }}
                        onChangeText={value => setUsername(value)}
                        multiline={true}
                        autoFocus={true}
                    />
                    <Input
                        placeholder="Password"
                        style={{
                            borderWidth: 0,
                            borderRadius: 10,
                            width: '90%',
                            backgroundColor: 'white'
                        }}
                        inputStyle={styles.inputStyle}
                        placeholderTextColor={theme.colors.lightGrey}
                        inputContainerStyle={{ borderBottomWidth: 0 }}
                        onChangeText={value => setPassword(value)}
                        autoFocus={true}
                        secureTextEntry={true}
                    />
                    <Button
                        raised={true}
                        buttonStyle={styles.loginButton}
                        titleStyle={styles.loginButtonText}
                        onPress={() => authWithLogin()}
                        containerStyle={{ width: '50%' }}
                        title="LOGIN" />
                </View>
                <View style={{ alignItems: 'center' }}>
                    <Button
                        raised={true}
                        buttonStyle={styles.signupButton}
                        titleStyle={styles.signupButtonText}
                        onPress={() => navigation.navigate('Signup')}
                        containerStyle={{ width: '50%' }}
                        title="SIGNUP" />
                </View>
            </View>
            <AppSnackBar
                visible={visible}
                onDismiss={() => removeSnackBar()}
                message={message}
                color={theme.colors.blue}
            />
            <StatusBar style="auto" />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 30,
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
    },
    title: {
        fontSize: theme.fontSizes.screenTitle,
        fontFamily: theme.fonts.bold,
        textAlign: 'center'
    },
    text: {
        marginBottom: 10,
        marginTop: 10,
        fontSize: theme.fontSizes.buttonText,
        fontFamily: theme.fonts.regular
    },
    inputStyle: {
        color: 'black',
        fontFamily: theme.fonts.bold,
        padding: 10,
        margin: 10,
        fontSize: theme.fontSizes.cardTitle,
    },
    loginButton: {
        backgroundColor: 'white',
        borderRadius: theme.borderRadius.button,
    },
    loginButtonText: {
        color: theme.colors.cyan,
        fontFamily: theme.fonts.bold,
        fontSize: theme.fontSizes.buttonText
    },
    signupButton: {
        backgroundColor: theme.colors.cyan,
        borderRadius: theme.borderRadius.button,
        borderWidth: 1,
        borderColor: 'white'
    },
    signupButtonText: {
        color: 'white',
        fontFamily: theme.fonts.bold,
        fontSize: theme.fontSizes.buttonText,
        width: '70%'
    }

});
