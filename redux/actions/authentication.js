import axios from 'axios';
import { LOGIN, SIGNUP, LOGOFF } from './types';

export const login = (username, password) => {
    let user = { 'username': username, 'password': password };
    try {
        return async dispatch => {
            await axios.post('https://exchangestudentsapp-fardel.herokuapp.com/auth/login', user)
                .then(response => {
                    console.log(response.data.token);
                    dispatch({
                        type: LOGIN,
                        payload: response.data.token
                    });
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
                        payload: user
                    });
                });
        };
    } catch (error) {
        console.log(error);
    }
};

export const logoff = () => dispatch => {
    dispatch({
        type: LOGOFF,
        payload: ''
    });
};