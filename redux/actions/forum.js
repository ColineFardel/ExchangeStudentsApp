import axios from 'axios';
import { GET_TOPICS, ADD_TOPIC, ADD_CHAT, GET_CHATS, DELETE_TOPIC, SET_VISIBLE_FALSE } from './types';
import moment from "moment";

export const getTopics = () => {
    try {
        return async dispatch => {
            const response = await axios.get('https://exchangestudentsapp-fardel.herokuapp.com/topics');
            if (response.data) {
                dispatch({
                    type: GET_TOPICS,
                    payload: response.data
                });
            } else {
                console.log('Unable to fetch data from the API BASE URL!');
            }
        };
    } catch (error) {
        console.log(error);
    }
};

export const deleteTopic = (index) => {
    let url = 'https://exchangestudentsapp-fardel.herokuapp.com/topic/' + index;
    try {
        return async dispatch => {
            await axios.delete(url)
                .then(response => {
                    dispatch({
                        type: DELETE_TOPIC,
                        payload: index
                    });
                });
        };
    } catch (error) {
        console.log(error);
    }
};

export const addTopic = (topic) => {
    try {
        return async dispatch => {
            await axios.post('https://exchangestudentsapp-fardel.herokuapp.com/addtopic', topic)
                .then(response => {
                    dispatch({
                        type: ADD_TOPIC,
                        payload: topic
                    });
                });
        };
    } catch (error) {
        console.log(error);
    }
};

export const getChats = (topicId) => {
    try {
        return async dispatch => {
            const response = await axios.get('https://exchangestudentsapp-fardel.herokuapp.com/chatByDate/topic/' + topicId);
            if (response.data) {
                const chats = response.data;
                chats.map((obj) => {
                    obj.data.reverse();
                });
                chats.sort((a, b) => {
                    if (moment(a.date, "LL") < moment(b.date, "LL"))
                        return 1;
                    if (moment(a.date, "LL") > moment(b.date, "LL"))
                        return -1;
                    return 0;
                });
                dispatch({
                    type: GET_CHATS,
                    payload: response.data
                });
            } else {
                console.log('Unable to fetch data from the API BASE URL!');
            }
        };
    } catch (error) {
        console.log(error);
    }
};

export const addChat = (chat) => {
    try {
        return async dispatch => {
            await axios.post('https://exchangestudentsapp-fardel.herokuapp.com/addchat', chat)
                .then(response => {
                    console.log(response.data);
                    dispatch({
                        type: ADD_CHAT,
                        payload: response.data
                    });
                });
        };
    } catch (error) {
        console.log(error);
    }
};

export const setVisibleFalse = () => dispatch => {
    dispatch({
        type: SET_VISIBLE_FALSE
    })
};