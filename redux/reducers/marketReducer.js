import { ADD_OFFER, ADD_REQUEST, GET_OFFERS, GET_REQUESTS, DELETE_REQUEST, DELETE_OFFER, MODIFY_OFFER, MODIFY_REQUEST } from '../actions/types';

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
        case DELETE_REQUEST:
            return { ...state, requestLoaded: false }
            
        case GET_OFFERS:
            return { ...state, offers: action.payload, offerLoaded: true };
        case ADD_OFFER:
            return { ...state, offerLoaded: false }
        case DELETE_OFFER:
            return { ...state, offerLoaded: false }
        default:
            return state;
    }
}

export default marketReducer;