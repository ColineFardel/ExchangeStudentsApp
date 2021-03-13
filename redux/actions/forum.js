import axios from 'axios';
import { GET_TOPICS, ADD_TOPIC } from './types';

export const getTopics = () => {
    try {
        return async dispatch => {
            const response = await axios.get('https://exchangestudentsapp-fardel.herokuapp.com/topic');
            if (response.data) {
                dispatch({
                    type: GET_TOPICS,
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

export const addTopic = (topic) => {
    try {
        return async dispatch => {
            await axios.post('https://exchangestudentsapp-fardel.herokuapp.com/addtopic', topic)
                .then(response => {
                    dispatch({
                        type: ADD_TOPIC,
                        payload: topic
                    });
                });
        };
    } catch (error) {
        console.log(error);
    }
};