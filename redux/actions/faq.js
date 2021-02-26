import axios from 'axios';
import { ADD_FAQ, GET_FAQS } from './types';

export const addFaq = (faq) => {
    try {
        return async dispatch => {
            await axios.post('https://exchangestudentsapp-fardel.herokuapp.com/addfaq', faq)
                .then(response => {
                    console.log(response);
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

export const getFAQs = () => {
    try {
        return async dispatch => {
            const response = await axios.get('https://exchangestudentsapp-fardel.herokuapp.com/faq');
            if (response.data) {
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