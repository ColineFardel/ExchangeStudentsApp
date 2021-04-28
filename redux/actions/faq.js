import axios from 'axios';
import { ADD_FAQ, DELETE_FAQ, GET_FAQS, MODIFY_FAQ, SET_VISIBLE_FALSE } from './types';

export const addFaq = (faq, token) => {
    try {
        return async dispatch => {
            await axios.post('https://exchangestudentsapp-fardel.herokuapp.com/addfaq', faq, { headers: { 'Authorization': `Bearer ${token}` } })
                .then(response => {
                    dispatch({
                        type: ADD_FAQ,
                        payload: faq
                    });
                });
        };
    } catch (error) {
        console.log(error);
    }
};

export const getFAQs = (token) => {
    try {
        return async dispatch => {
            const response = await axios.get('https://exchangestudentsapp-fardel.herokuapp.com/faqs', { headers: { 'Authorization': `Bearer ${token}` } });
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
                    type: GET_FAQS,
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

export const modifyFaq = (faq, token) => {
    let url = 'https://exchangestudentsapp-fardel.herokuapp.com/faq/' + faq.id;
    try {
        return async dispatch => {
            await axios.put(url, faq, { headers: { 'Authorization': `Bearer ${token}` } })
                .then(response => {
                    dispatch({
                        type: MODIFY_FAQ,
                        payload: faq
                    });
                });
        };
    } catch (error) {
        console.log(error);
    }
};

export const deleteFaq = (index, token) => {
    let url = 'https://exchangestudentsapp-fardel.herokuapp.com/faq/' + index;
    try {
        return async dispatch => {
            await axios.delete(url, { headers: { 'Authorization': `Bearer ${token}` } })
                .then(response => {
                    dispatch({
                        type: DELETE_FAQ,
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