import axios from 'axios';
import { GET_COURSES, ADD_COURSE, GET_CHATS, ADD_CHAT, SET_VISIBLE_FALSE, DELETE_COURSE, GET_UNIVERSITIES, MODIFY_COURSE, GET_USER_CHATS } from './types';
import moment from "moment";

export const getCourses = (token) => {
    try {
        return async dispatch => {
            const response = await axios.get('https://exchangestudentsapp-fardel.herokuapp.com/courses', { headers: { 'Authorization': `Bearer ${token}` } });
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

export const addCourse = (course, token) => {
    try {
        return async dispatch => {
            await axios.post('https://exchangestudentsapp-fardel.herokuapp.com/addcourse', course, { headers: { 'Authorization': `Bearer ${token}` } })
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

export const getUserChats = (user, token) => {
    try {
        return async dispatch => {
            const response = await axios.post('https://exchangestudentsapp-fardel.herokuapp.com/userChats', user, { headers: { 'Authorization': `Bearer ${token}` } });
            if (response.data) {
                dispatch({
                    type: GET_USER_CHATS,
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

export const getChats = (courseId, token) => {
    try {
        return async dispatch => {
            const response = await axios.get('https://exchangestudentsapp-fardel.herokuapp.com/chatByDate/course/' + courseId, { headers: { 'Authorization': `Bearer ${token}` } });
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

export const addChat = (chat, token) => {
    try {
        return async dispatch => {
            await axios.post('https://exchangestudentsapp-fardel.herokuapp.com/addchat', chat, { headers: { 'Authorization': `Bearer ${token}` } })
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

export const deleteCourse = (index, token) => {
    let url = 'https://exchangestudentsapp-fardel.herokuapp.com/course/' + index;
    try {
        return async dispatch => {
            await axios.delete(url, { headers: { 'Authorization': `Bearer ${token}` } })
                .then(response => {
                    dispatch({
                        type: DELETE_COURSE,
                        payload: index
                    });
                });
        };
    } catch (error) {
        console.log(error);
    }
};

export const modifyCourse = (course, token) => {
    let url = 'https://exchangestudentsapp-fardel.herokuapp.com/course/' + course.id;
    try {
        return async dispatch => {
            await axios.put(url, course, { headers: { 'Authorization': `Bearer ${token}` } })
                .then(response => {
                    dispatch({
                        type: MODIFY_COURSE,
                        payload: course
                    });
                });
        };
    } catch (error) {
        console.log(error);
    }
};

export const getUniversities = (token) => {
    try {
        return async dispatch => {
            const response = await axios.get('https://exchangestudentsapp-fardel.herokuapp.com/universities', { headers: { 'Authorization': `Bearer ${token}` } });
            if (response.data) {
                dispatch({
                    type: GET_UNIVERSITIES,
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

export const setVisibleFalse = () => dispatch => {
    dispatch({
        type: SET_VISIBLE_FALSE
    })
};