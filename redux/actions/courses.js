import axios from 'axios';
import { GET_COURSES, ADD_COURSE } from './types';
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