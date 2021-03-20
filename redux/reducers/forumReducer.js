import { GET_TOPICS, ADD_TOPIC, GET_CHATS, ADD_CHAT, DELETE_TOPIC, SET_VISIBLE_FALSE } from '../actions/types';

const initialState = {
    topics: [],
    topicLoaded: false,
    chats: [],
    chatLoaded: false,
    userChats: [],
    snackBarVisible: false,
    snackBarMessage: ''
}

const forumReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_TOPICS:
            return { ...state, topics: action.payload, topicLoaded: true };
        case ADD_TOPIC:
            return { ...state, topicLoaded: false, snackBarVisible: true, snackBarMessage: 'The topic has successfully been added' };
        case DELETE_TOPIC:
            return { ...state, topicLoaded: false, snackBarVisible: true, snackBarMessage: 'The topic has successfully been deleted' };

        case GET_CHATS:
            return { ...state, chats: action.payload, chatLoaded: true };
        case ADD_CHAT:
            return { ...state, chatLoaded: false, userChats: [...state.userChats, action.payload] };

        case SET_VISIBLE_FALSE:
            return { ...state, snackBarVisible: false }
        default:
            return state;
    }
}

export default forumReducer;