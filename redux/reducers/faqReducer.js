import { ADD_FAQ, DELETE_FAQ, GET_FAQS, MODIFY_FAQ, SET_VISIBLE_FALSE } from '../actions/types';

const initialState = {
    faqs: [],
    faqLoaded: false,
    snackBarVisible: false,
    snackBarMessage: ''
}

const faqReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_FAQ:
            return { ...state, faqLoaded: false, snackBarVisible: true, snackBarMessage: 'The question has successfully been added' };
        case GET_FAQS:
            return { ...state, faqs: action.payload, faqLoaded: true };
        case MODIFY_FAQ:
            return { ...state, faqLoaded: false, snackBarVisible: true, snackBarMessage: 'The question has successfully been modified' };
        case DELETE_FAQ:
            return { ...state, faqLoaded: false, snackBarVisible: true, snackBarMessage: 'The question has successfully been deleted' };

        case SET_VISIBLE_FALSE:
            return { ...state, snackBarVisible: false }
        default:
            return state;
    }
}

export default faqReducer;