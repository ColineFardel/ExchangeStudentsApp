import { ADD_FAQ, GET_FAQS } from '../actions/types';

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
        default:
            return state;
    }
}

export default faqReducer;