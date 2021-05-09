import { LOGIN, LOGOFF, SIGNUP, GET_USER, SET_VISIBLE_FALSE, GET_USER_OBJECTS, LOADING_LOGIN } from '../actions/types';

const initialState = {
    user: {},
    token: '',
    snackBarVisible: false,
    snackBarMessage: '',
    userCredentials: {},
    userObjects: {},
    loaded: false
}

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOGIN:
            return { ...state, token: action.payload, snackBarMessage: action.message, snackBarVisible: true, userCredentials: action.user, loaded: true };
        case LOGOFF:
            return { ...state, token: action.payload, snackBarMessage: 'You have successfully logged off', snackBarVisible: true };
        case SIGNUP:
            return { ...state, snackBarMessage: action.message, snackBarVisible: true };
        case GET_USER:
            return { ...state, user: action.payload }
        case GET_USER_OBJECTS:
            return { ...state, userObjects: action.payload }
        case SET_VISIBLE_FALSE:
            return { ...state, snackBarVisible: false }
        case LOADING_LOGIN:
            return { ...state, loaded: false }
        default:
            return state;
    }
}

export default authReducer;