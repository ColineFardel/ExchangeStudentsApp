import axios from 'axios';
import { LOGIN, SIGNUP, LOGOFF, GET_USER, SET_VISIBLE_FALSE } from './types';

export const login = (username, password) => {
    let user = { 'username': username, 'password': password };
    try {
        return async dispatch => {
            await axios.post('https://exchangestudentsapp-fardel.herokuapp.com/auth/login', user)
                .then(response => {
                    //getUser(username, response.data.token);
                    dispatch({
                        type: LOGIN,
                        payload: response.data.token,
                        message:'Welcome!'
                    });
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
                    console.log(response);
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

export const logoff = () => dispatch => {
    dispatch({
        type: LOGOFF,
        payload: ''
    });
};

export const getUser = (username, token) => {
    try {
        return async dispatch => {
            const response = await axios.get('https://exchangestudentsapp-fardel.herokuapp.com/user', username, { headers: { 'Authorization': `Bearer ${token}` } });
            if (response.data) {
                dispatch({
                    type: GET_USER,
                    payload: response.data
                });
            } else {
                console.log('Unable to fetch data from the API BASE URL!');
            }
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