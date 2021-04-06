import { createStore, combineReducers, applyMiddleware } from 'redux';
import faqReducer from './reducers/faqReducer';
import thunk from 'redux-thunk';
import marketReducer from './reducers/marketReducer';
import forumReducer from './reducers/forumReducer';
import courseReducer from './reducers/courseReducer';
import tipReducer from './reducers/tipReducer';

const rootReducer = combineReducers({
    faqReducer: faqReducer,
    marketReducer: marketReducer,
    forumReducer: forumReducer,
    courseReducer: courseReducer,
    tipReducer: tipReducer,
})

const configureStore = () => createStore(rootReducer, applyMiddleware(thunk));

export default configureStore;