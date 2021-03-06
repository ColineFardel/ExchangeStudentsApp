import { ADD_OFFER, ADD_REQUEST, GET_OFFERS, GET_REQUESTS, DELETE_REQUEST, DELETE_OFFER, MODIFY_OFFER, MODIFY_REQUEST, SET_VISIBLE_FALSE, GET_REQUESTS_LOCATION, GET_OFFERS_LOCATION } from '../actions/types';

const initialState = {
    requests: [],
    requestLoaded: false,
    requestsLoc: [],
    offers: [],
    offerLoaded: false,
    offersLoc: [],
    snackBarVisible: false,
    snackBarMessage: ''
}

const marketReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_REQUESTS:
            return { ...state, requests: action.payload, requestLoaded: true };
        case ADD_REQUEST:
            return { ...state, requestLoaded: false, snackBarVisible: true, snackBarMessage: 'The request has successfully been added' }
        case DELETE_REQUEST:
            return { ...state, requestLoaded: false, snackBarVisible: true, snackBarMessage: 'The request has successfully been deleted' }
        case GET_REQUESTS_LOCATION:
            return { ...state, requestsLoc: action.payload }

        case GET_OFFERS:
            return { ...state, offers: action.payload, offerLoaded: true };
        case ADD_OFFER:
            return { ...state, offerLoaded: false, snackBarVisible: true, snackBarMessage: 'The offer has successfully been added' }
        case DELETE_OFFER:
            return { ...state, offerLoaded: false, snackBarVisible: true, snackBarMessage: 'The offer has successfully been deleted' }
        case GET_OFFERS_LOCATION:
            return { ...state, offersLoc: action.payload }


        case SET_VISIBLE_FALSE:
            return { ...state, snackBarVisible: false }
        default:
            return state;
    }
}

export default marketReducer;