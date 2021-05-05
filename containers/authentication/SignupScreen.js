import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, View, Text, Switch } from 'react-native';
import theme from '../../constants/theme';
import { Input, Button } from 'react-native-elements';
import { useSelector, useDispatch } from 'react-redux';
import { signup, setVisibleFalse } from '../../redux/actions/authentication';
import AppSnackBar from '../../components/snackbar';

export default function SignupScreen({ navigation }) {

    //Constants for snack bar
    const visible = useSelector(state => state.authReducer.snackBarVisible);
    const message = useSelector(state => state.authReducer.snackBarMessage);
    const removeSnackBar = () => dispatch(setVisibleFalse());

    //Constants to signup
    const [newUser, setNewUser] = useState('');
    const [isAdmin, setIsAdmin] = useState(false);
    const dispatch = useDispatch();
    const userSignup = (u) => dispatch(signup(u));

    const authWithSignup = () => {
        let role = "USER";
        if (isAdmin)
            role = "ADMIN";
        userSignup({ ...newUser, 'role': role });
        if (message !== "The email or username is already used")
            navigation.goBack();
    }

    return (
        <View style={styles.container}>
            <View style={{ flex: 1, margin: 30 }}>
                <Text style={styles.title}>Welcome to the exchange students app!</Text>
            </View>
            <View style={{ flex: 8, paddingBottom: 40, justifyContent: 'space-between', width: '100%', backgroundColor: theme.colors.cyan, borderTopRightRadius: theme.borderRadius.screen, borderTopLeftRadius: theme.borderRadius.screen, paddingTop: 30, padding: 10 }}>
                <View style={{ alignItems: 'center' }}>
                    <Input
                        placeholder="Email"
                        style={{
                            borderWidth: 0,
                            borderRadius: 10,
                            width: '90%',
                            backgroundColor: 'white'
                        }}
                        inputStyle={styles.inputStyle}
                        placeholderTextColor={theme.colors.lightGrey}
                        inputContainerStyle={{ borderBottomWidth: 0 }}
                        onChangeText={value => setNewUser({ ...newUser, 'email': value })}
                        multiline={true}
                        autoFocus={true}
                        keyboardType='email-address'
                    />
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
                        onChangeText={value => setNewUser({ ...newUser, 'username': value })}
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
                        onChangeText={value => setNewUser({ ...newUser, 'passwordHash': value })}
                        autoFocus={true}
                        secureTextEntry={true}
                    />
                    <Input
                        placeholder="Phone number"
                        style={{
                            borderWidth: 0,
                            borderRadius: 10,
                            width: '90%',
                            backgroundColor: 'white'
                        }}
                        inputStyle={styles.inputStyle}
                        placeholderTextColor={theme.colors.lightGrey}
                        inputContainerStyle={{ borderBottomWidth: 0 }}
                        onChangeText={value => setNewUser({ ...newUser, 'phoneNumber': value })}
                        multiline={true}
                        autoFocus={true}
                        keyboardType='phone-pad'
                    />
                    <View style={{ flexDirection: 'row', marginTop: -5, marginBottom: 15 }}>
                        <Text style={styles.text}>Tutor</Text>
                        <Switch
                            trackColor={{ false: theme.colors.lightGrey, true: theme.colors.lightBlue }}
                            thumbColor={isAdmin ? theme.colors.blue : theme.colors.grey}
                            ios_backgroundColor="#3e3e3e"
                            onValueChange={() => setIsAdmin(!isAdmin)}
                            value={isAdmin} />
                    </View>
                    <Button
                        raised={true}
                        buttonStyle={styles.signupButton}
                        titleStyle={styles.signupButtonText}
                        onPress={() => authWithSignup()}
                        containerStyle={{ width: '50%' }}
                        title="SIGNUP" />
                </View>
                <View style={{ alignItems: 'center' }}>
                    <Button
                        raised={true}
                        buttonStyle={styles.loginButton}
                        titleStyle={styles.loginButtonText}
                        onPress={() => navigation.navigate('Login')}
                        containerStyle={{ width: '50%' }}
                        title="LOGIN" />
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
        marginTop: 30,
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
        fontFamily: theme.fonts.regular,
        color: 'white'
    },
    inputStyle: {
        color: 'black',
        fontFamily: theme.fonts.bold,
        padding: 10,
        margin: 10,
        fontSize: theme.fontSizes.cardTitle,
    },
    signupButton: {
        backgroundColor: 'white',
        borderRadius: theme.borderRadius.button,
    },
    signupButtonText: {
        color: theme.colors.cyan,
        fontFamily: theme.fonts.bold,
        fontSize: theme.fontSizes.buttonText
    },
    loginButton: {
        backgroundColor: theme.colors.cyan,
        borderRadius: theme.borderRadius.button,
        borderWidth: 1,
        borderColor: 'white'
    },
    loginButtonText: {
        color: 'white',
        fontFamily: theme.fonts.bold,
        fontSize: theme.fontSizes.buttonText,
        width: '70%'
    }

});
