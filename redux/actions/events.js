import axios from 'axios';
import { GET_EVENTS, ADD_EVENT, DELETE_EVENT, SET_VISIBLE_FALSE } from './types';
import moment from "moment-timezone";

export const getEvents = (token) => {
    try {
        return async dispatch => {
            const response = await axios.get('https://exchangestudentsapp-fardel.herokuapp.com/eventsByDate', { headers: { 'Authorization': `Bearer ${token}` } });
            if (response.data) {
                response.data.sort((a, b) => {
                    a.data.sort((c, d) => {
                        if (moment(c.time, 'LT') > moment(d.time, 'LT'))
                            return 1;
                        else return -1;
                    });
                    if (a.date > b.date)
                        return 1;
                    else return -1;
                })
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

export const deleteEvent = (index, token) => {
    let url = 'https://exchangestudentsapp-fardel.herokuapp.com/event/' + index;
    try {
        return async dispatch => {
            await axios.delete(url, { headers: { 'Authorization': `Bearer ${token}` } })
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

export const addEvent = (event, token) => {
    try {
        return async dispatch => {
            await axios.post('https://exchangestudentsapp-fardel.herokuapp.com/addevent', event, { headers: { 'Authorization': `Bearer ${token}` } })
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