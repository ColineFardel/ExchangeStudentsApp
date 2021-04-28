import axios from 'axios';
import { ADD_OFFER, ADD_REQUEST, DELETE_OFFER, DELETE_REQUEST, GET_OFFERS, GET_OFFERS_LOCATION, GET_REQUESTS, GET_REQUESTS_LOCATION, SET_VISIBLE_FALSE } from './types';

export const getRequests = (token) => {
    try {
        return async dispatch => {
            const response = await axios.get('https://exchangestudentsapp-fardel.herokuapp.com/requests', { headers: { 'Authorization': `Bearer ${token}` } });
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

export const addRequest = (request, token) => {
    try {
        return async dispatch => {
            await axios.post('https://exchangestudentsapp-fardel.herokuapp.com/addrequest', request, { headers: { 'Authorization': `Bearer ${token}` } })
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

export const deleteRequest = (index, token) => {
    let url = 'https://exchangestudentsapp-fardel.herokuapp.com/request/' + index;
    try {
        return async dispatch => {
            await axios.delete(url, { headers: { 'Authorization': `Bearer ${token}` } })
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

export const getRequestsLoc = (token) => {
    try {
        return async dispatch => {
            const response = await axios.get('https://exchangestudentsapp-fardel.herokuapp.com/requestsloc', { headers: { 'Authorization': `Bearer ${token}` } });
            if (response.data) {
                dispatch({
                    type: GET_REQUESTS_LOCATION,
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

export const getOffers = (token) => {
    try {
        return async dispatch => {
            const response = await axios.get('https://exchangestudentsapp-fardel.herokuapp.com/offers', { headers: { 'Authorization': `Bearer ${token}` } });
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

export const addOffer = (offer, token) => {
    try {
        return async dispatch => {
            await axios.post('https://exchangestudentsapp-fardel.herokuapp.com/addoffer', offer, { headers: { 'Authorization': `Bearer ${token}` } })
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

export const deleteOffer = (index, token) => {
    let url = 'https://exchangestudentsapp-fardel.herokuapp.com/offer/' + index;
    try {
        return async dispatch => {
            await axios.delete(url, { headers: { 'Authorization': `Bearer ${token}` } })
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

export const getOffersLoc = (token) => {
    try {
        return async dispatch => {
            const response = await axios.get('https://exchangestudentsapp-fardel.herokuapp.com/offersloc', { headers: { 'Authorization': `Bearer ${token}` } });
            if (response.data) {
                dispatch({
                    type: GET_OFFERS_LOCATION,
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

export const setVisibleFalse = () => dispatch => {
    dispatch({
        type: SET_VISIBLE_FALSE
    })
};