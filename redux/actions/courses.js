import axios from 'axios';
import { GET_COURSES, ADD_COURSE, GET_CHATS, ADD_CHAT } from './types';
import moment from "moment";

export const getCourses = () => {
    try {
        return async dispatch => {
            const response = await axios.get('https://exchangestudentsapp-fardel.herokuapp.com/course');
            if (response.data) {
                dispatch({
                    type: GET_COURSES,
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

export const addCourse = (course) => {
    try {
        return async dispatch => {
            await axios.post('https://exchangestudentsapp-fardel.herokuapp.com/addcourse', course)
                .then(response => {
                    dispatch({
                        type: ADD_COURSE,
                        payload: course
                    });
                });
        };
    } catch (error) {
        console.log(error);
    }
};

export const getChats = (courseId) => {
    try {
        return async dispatch => {
            const response = await axios.get('https://exchangestudentsapp-fardel.herokuapp.com/chatByDate/course/' + courseId);
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