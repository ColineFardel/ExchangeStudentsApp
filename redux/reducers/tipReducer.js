import { ADD_TIP, GET_TIPS, DELETE_TIP, SET_VISIBLE_FALSE } from '../actions/types';

const initialState = {
    tips: [],
    tipLoaded: false,
    snackBarVisible: false,
    snackBarMessage: ''
}

const tipReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_TIP:
            return { ...state, tipLoaded: false, snackBarVisible: true, snackBarMessage: 'The tip has successfully been added' };
        case GET_TIPS:
            return { ...state, tips: action.payload, tipLoaded: true };
        case DELETE_TIP:
            return { ...state, tipLoaded: false, snackBarVisible: true, snackBarMessage: 'The tip has successfully been deleted' };

        case SET_VISIBLE_FALSE:
            return { ...state, snackBarVisible: false }
        default:
            return state;
    }
}

export default tipReducer;