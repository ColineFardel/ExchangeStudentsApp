import { GET_REQUESTS } from '../actions/types';

const initialState = {
    requests: [],
    requestLoaded: false
}

const marketReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_REQUESTS:
            return { ...state, requests: action.payload, requestLoaded: true };
        default:
            return state;
    }
}

export default marketReducer;