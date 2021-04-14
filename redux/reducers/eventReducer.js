import { GET_EVENTS, ADD_EVENT, DELETE_EVENT, SET_VISIBLE_FALSE } from '../actions/types';

const initialState = {
    events: [],
    eventLoaded: false,
    snackBarVisible: false,
    snackBarMessage: ''
}

const eventReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_EVENTS:
            return { ...state, events: action.payload, eventLoaded: true };
        case ADD_EVENT:
            return { ...state, eventLoaded: false, snackBarVisible: true, snackBarMessage: 'The event has successfully been added' };
        case DELETE_EVENT:
            return { ...state, eventLoaded: false, snackBarVisible: true, snackBarMessage: 'The event has successfully been deleted' };

        case SET_VISIBLE_FALSE:
            return { ...state, snackBarVisible: false }
        default:
            return state;
    }
}

export default eventReducer;