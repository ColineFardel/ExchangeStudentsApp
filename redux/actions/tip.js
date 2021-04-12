import axios from 'axios';
import { ADD_TIP, GET_TIPS, DELETE_TIP, SET_VISIBLE_FALSE } from './types';

export const getTips = () => {
    try {
        return async dispatch => {
            const response = await axios.get('https://exchangestudentsapp-fardel.herokuapp.com/tips');
            if (response.data) {
                response.data.sort((a, b) => {
                    if (a.tag < b.tag)
                        return -1;
                    if (a.tag > b.tag)
                        return 1;
                    if (a.tag === null)
                        return 1;
                    if (b.tag === null)
                        return -1;
                    return 0;
                });
                dispatch({
                    type: GET_TIPS,
                    payload: response.data
                });
            } else {
                console.log('Unable to fetch data from the API BASE URL!');
            }
        };
    } catch (error) {
        console.log(error);
    }
};

export const addTip = (tip) => {
    try {
        return async dispatch => {
            await axios.post('https://exchangestudentsapp-fardel.herokuapp.com/addtip', tip)
                .then(response => {
                    dispatch({
                        type: ADD_TIP,
                        payload: tip
                    });
                });
        };
    } catch (error) {
        console.log(error);
    }
};

export const addTipWithImg = (tip) => {
    try {
        return async dispatch => {
            await axios.post('https://exchangestudentsapp-fardel.herokuapp.com/addtipwithimg', tip)
                .then(response => {
                    dispatch({
                        type: ADD_TIP,
                        payload: tip
                    });
                });
        };
    } catch (error) {
        console.log(error);
    }
};

export const deleteTip = (index) => {
    let url = 'https://exchangestudentsapp-fardel.herokuapp.com/tip/' + index;
    try {
        return async dispatch => {
            await axios.delete(url)
                .then(response => {
                    dispatch({
                        type: DELETE_TIP,
                        payload: index
                    });
                });
        };
    } catch (error) {
        console.log(error);
    }
};

export const setVisibleFalse = () => dispatch => {
    dispatch({
        type: SET_VISIBLE_FALSE
    })
};