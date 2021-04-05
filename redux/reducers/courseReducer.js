import { GET_COURSES, ADD_COURSE, GET_CHATS, ADD_CHAT, SET_VISIBLE_FALSE, DELETE_COURSE, GET_UNIVERSITIES, MODIFY_COURSE } from '../actions/types';

const initialState = {
    courses: [],
    courseLoaded: false,
    chats: [],
    chatLoaded: false,
    userChats: [],
    snackBarVisible: false,
    snackBarMessage: '',
    universities: []
}

const courseReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_COURSES:
            return { ...state, courses: action.payload, courseLoaded: true };
        case ADD_COURSE:
            return { ...state, courseLoaded: false, snackBarVisible: true, snackBarMessage: 'The course has successfully been added' };
        case DELETE_COURSE:
            return { ...state, courseLoaded: false, snackBarVisible: true, snackBarMessage: 'The course has successfully been deleted' };
        case MODIFY_COURSE:
            return { ...state, courseLoaded: false, snackBarVisible: true, snackBarMessage: 'The course has successfully been modified' };

        case GET_CHATS:
            return { ...state, chats: action.payload, chatLoaded: true };
        case ADD_CHAT:
            return { ...state, chatLoaded: false, userChats: [...state.userChats, action.payload] };

        case GET_UNIVERSITIES:
            return { ...state, universities: action.payload };

        case SET_VISIBLE_FALSE:
            return { ...state, snackBarVisible: false }
        default:
            return state;
    }
}

export default courseReducer;