import { GET_TOPICS, ADD_TOPIC } from '../actions/types';

const initialState = {
    topics: [],
    topicLoaded: false
}

const forumReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_TOPICS:
            return { ...state, topics: action.payload, topicLoaded: true };
        case ADD_TOPIC:
            return { ...state, topicLoaded: false }
        default:
            return state;
    }
}

export default forumReducer;