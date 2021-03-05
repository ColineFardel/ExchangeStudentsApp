import axios from 'axios';
import { GET_REQUESTS } from './types';


export const getRequests = () => {
    try {
        return async dispatch => {
            const response = await axios.get('https://exchangestudentsapp-fardel.herokuapp.com/request');
            if (response.data) {
                dispatch({
                    type: GET_REQUESTS,
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