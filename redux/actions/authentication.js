import axios from 'axios';
import { LOGIN, SIGNUP, LOGOFF, GET_USER, SET_VISIBLE_FALSE } from './types';
import AsyncStorage from '@react-native-async-storage/async-storage';

const storeData = async (user) => {
    try {
        const jsonValue = JSON.stringify(user);
        await AsyncStorage.setItem('user', jsonValue);
        console.log('storing user', user);
    } catch (e) {
        console.log(e);
    }
}

export const login = (username, password) => {
    let user = { 'username': username, 'password': password };
    try {
        return async dispatch => {
            await axios.post('https://exchangestudentsapp-fardel.herokuapp.com/auth/login', user)
                .then(response => {
                    storeData(user);

                    dispatch({
                        type: LOGIN,
                        payload: response.data.token,
                        message: 'Welcome!',
                        user: user
                    });
                    //prout(username, response.data.token);
                })
                .catch(error => {
                    console.log(error);
                    if (error.response.status === 401) {
                        dispatch({
                            type: LOGIN,
                            payload: '',
                            message: 'The email or username is wrong'
                        });
                    }
                });
        };
    } catch (error) {
        console.log(error);
    }
};


export const signup = (user) => {
    try {
        return async dispatch => {
            await axios.post('https://exchangestudentsapp-fardel.herokuapp.com/auth/signup', user)
                .then(response => {
                    dispatch({
                        type: SIGNUP,
                        payload: user,
                        message: 'You have succesfully sign up, now you can login!'
                    });
                })
                .catch(error => {
                    console.log(error);
                    if (error.response.status === 400) {
                        dispatch({
                            type: SIGNUP,
                            payload: user,
                            message: 'The email or username is already used'
                        });
                    }
                });
        };
    } catch (error) {
        console.log(error);
    }
};

const removeValue = async () => {
    try {
        console.log('Removing user from storage');
        await AsyncStorage.removeItem('user');
    } catch (e) {
        console.log(e);
    }

    console.log('Done.')
}

export const logoff = () => dispatch => {
    removeValue();
    dispatch({
        type: LOGOFF,
        payload: ''
    });
};

export const getUser = (username, token) => {
    try {
        return async dispatch => {
            console.log('cacca');
            await axios.post('https://exchangestudentsapp-fardel.herokuapp.com/user', { "username": username }, { headers: { 'Authorization': `Bearer ${token}` } })
                .then(response => {
                    console.log(response.data);
                    dispatch({
                        type: GET_USER,
                        payload: response.data
                    })
                })
        };
    } catch (error) {
        console.log(error);
    }
}

export const setVisibleFalse = () => dispatch => {
    dispatch({
        type: SET_VISIBLE_FALSE
    })
};