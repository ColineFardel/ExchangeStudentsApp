import { LOGIN, LOGOFF, SIGNUP } from '../actions/types';

const initialState = {
    user: {},
    token: ''
}

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOGIN:
            return { ...state, token: action.payload };
        case LOGOFF:
            return { ...state };
        case SIGNUP:
            return { ...state, user: action.payload };
        default:
            return state;
    }
}

export default authReducer;