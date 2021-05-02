import { LOGIN, LOGOFF, SIGNUP, GET_USER, SET_VISIBLE_FALSE } from '../actions/types';

const initialState = {
    user: {},
    token: '',
    snackBarVisible: false,
    snackBarMessage: '',
}

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOGIN:
            return { ...state, token: action.payload, snackBarMessage: action.message, snackBarVisible: true };
        case LOGOFF:
            return { ...state, token: action.payload, snackBarMessage: 'You have successfully logged off', snackBarVisible: true };
        case SIGNUP:
            return { ...state, snackBarMessage: action.message, snackBarVisible: true };
        case GET_USER:
            return { ...state, user: action.payload }
        case SET_VISIBLE_FALSE:
            return { ...state, snackBarVisible: false }
        default:
            return state;
    }
}

export default authReducer;