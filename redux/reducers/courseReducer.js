import { GET_COURSES, ADD_COURSE, GET_CHATS, ADD_CHAT } from '../actions/types';

const initialState = {
    courses: [],
    courseLoaded: false,
    chats: [],
    chatLoaded: false,
    userChats: [],
    snackBarVisible: false,
    snackBarMessage: ''
}

const courseReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_COURSES:
            return { ...state, courses: action.payload, courseLoaded: true };
        case ADD_COURSE:
            return { ...state, courseLoaded: false, snackBarVisible: true, snackBarMessage: 'The course has successfully been added' };

        case GET_CHATS:
            return { ...state, chats: action.payload, chatLoaded: true };
        case ADD_CHAT:
            return { ...state, chatLoaded: false, userChats: [...state.userChats, action.payload] };

        default:
            return state;
    }
}

export default courseReducer;