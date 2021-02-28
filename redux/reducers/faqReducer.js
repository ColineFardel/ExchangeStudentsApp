import { ADD_FAQ, DELETE_FAQ, GET_FAQS, MODIFY_FAQ } from '../actions/types';

const initialState = {
    faqs: [],
    faqLoaded: false,
}

const faqReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_FAQ:
            return { ...state, faqLoaded: false };
        case GET_FAQS:
            return { ...state, faqs: action.payload, faqLoaded: true };
        case MODIFY_FAQ:
            return { ...state, faqLoaded: false };
        case DELETE_FAQ:
            return { ...state, faqLoaded: false };
        default:
            return state;
    }
}

export default faqReducer;