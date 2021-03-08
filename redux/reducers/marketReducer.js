import { ADD_OFFER, ADD_REQUEST, GET_OFFERS, GET_REQUESTS } from '../actions/types';

const initialState = {
    requests: [],
    requestLoaded: false,
    offers: [],
    offerLoaded: false
}

const marketReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_REQUESTS:
            return { ...state, requests: action.payload, requestLoaded: true };
        case ADD_REQUEST:
            return { ...state, requestLoaded: false }
        case GET_OFFERS:
            return { ...state, offers: action.payload, offerLoaded: true };
        case ADD_OFFER:
            return { ...state, offerLoaded: false }
        default:
            return state;
    }
}

export default marketReducer;