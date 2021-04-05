import axios from 'axios';
import { ADD_OFFER, ADD_REQUEST, DELETE_OFFER, DELETE_REQUEST, GET_OFFERS, GET_REQUESTS, SET_VISIBLE_FALSE } from './types';


export const getRequests = () => {
    try {
        return async dispatch => {
            const response = await axios.get('https://exchangestudentsapp-fardel.herokuapp.com/requests');
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

export const addRequest = (request) => {
    try {
        return async dispatch => {
            await axios.post('https://exchangestudentsapp-fardel.herokuapp.com/addrequest', request)
                .then(response => {
                    dispatch({
                        type: ADD_REQUEST,
                        payload: request
                    });
                });
        };
    } catch (error) {
        console.log(error);
    }
};

export const deleteRequest = (index) => {
    let url = 'https://exchangestudentsapp-fardel.herokuapp.com/request/' + index;
    try {
        return async dispatch => {
            await axios.delete(url)
                .then(response => {
                    dispatch({
                        type: DELETE_REQUEST,
                        payload: index
                    });
                });
        };
    } catch (error) {
        console.log(error);
    }
};

export const getOffers = () => {
    try {
        return async dispatch => {
            const response = await axios.get('https://exchangestudentsapp-fardel.herokuapp.com/offers');
            if (response.data) {
                dispatch({
                    type: GET_OFFERS,
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

export const addOffer = (offer) => {
    try {
        return async dispatch => {
            await axios.post('https://exchangestudentsapp-fardel.herokuapp.com/addoffer', offer)
                .then(response => {
                    dispatch({
                        type: ADD_OFFER,
                        payload: offer
                    });
                });
        };
    } catch (error) {
        console.log(error);
    }
};

export const deleteOffer = (index) => {
    let url = 'https://exchangestudentsapp-fardel.herokuapp.com/offer/' + index;
    try {
        return async dispatch => {
            await axios.delete(url)
                .then(response => {
                    dispatch({
                        type: DELETE_OFFER,
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