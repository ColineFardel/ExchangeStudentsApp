import axios from 'axios';
import { GET_EVENTS, ADD_EVENT, DELETE_EVENT, SET_VISIBLE_FALSE } from './types';

export const getEvents = () => {
    try {
        return async dispatch => {
            const response = await axios.get('https://exchangestudentsapp-fardel.herokuapp.com/events');
            if (response.data) {
                dispatch({
                    type: GET_EVENTS,
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

export const deleteEvent = (index) => {
    let url = 'https://exchangestudentsapp-fardel.herokuapp.com/event/' + index;
    try {
        return async dispatch => {
            await axios.delete(url)
                .then(response => {
                    dispatch({
                        type: DELETE_EVENT,
                        payload: index
                    });
                });
        };
    } catch (error) {
        console.log(error);
    }
};

export const addEvent = (event) => {
    try {
        return async dispatch => {
            await axios.post('https://exchangestudentsapp-fardel.herokuapp.com/addevent', event)
                .then(response => {
                    dispatch({
                        type: ADD_EVENT,
                        payload: event
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