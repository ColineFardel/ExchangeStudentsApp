import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, Linking } from 'react-native';
import theme from '../../constants/theme';
import AppInput from '../../components/input';
import { Input, Button } from 'react-native-elements';
import { useSelector, useDispatch } from 'react-redux';
import { login, signup } from '../../redux/actions/authentication';

export default function SignupScreen({navigation}) {

    const [newUser, setNewUser] = useState('');
    const token = useSelector(state => state.authReducer.token);
    const user = useSelector(state => state.authReducer.user);
    const dispatch = useDispatch();
    const userSignup = (u) => dispatch(signup(u));

    const authWithSignup = () => {
        userSignup(newUser);
        console.log(user);
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
                        onChangeText={value => setNewUser({...newUser, 'email':value})}
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
                        onChangeText={value => setNewUser({...newUser, 'username':value})}
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
                        onChangeText={value => setNewUser({...newUser,'password':value})}
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
                        onChangeText={value => setNewUser({...newUser, 'phoneNumber':value})}
                        multiline={true}
                        autoFocus={true}
                        keyboardType='phone-pad'
                    />
                    <Button
                        raised={true}
                        buttonStyle={styles.loginButton}
                        titleStyle={styles.loginButtonText}
                        onPress={() => authWithSignup()}
                        containerStyle={{ width: '50%' }}
                        title="SIGNUP" />
                </View>


                <View style={{ alignItems: 'center' }}>
                    <Button
                        raised={true}
                        buttonStyle={styles.signupButton}
                        titleStyle={styles.signupButtonText}
                        onPress={() => navigation.navigate('Login')}
                        containerStyle={{ width: '50%' }}
                        title="LOGIN" />
                </View>
            </View>
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
