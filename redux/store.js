import { createStore, combineReducers, applyMiddleware } from 'redux';
import faqReducer from './reducers/faqReducer';
import thunk from 'redux-thunk';
import marketReducer from './reducers/marketReducer';
import forumReducer from './reducers/forumReducer';

const rootReducer = combineReducers({
    faqReducer: faqReducer,
    marketReducer: marketReducer,
    forumReducer: forumReducer
})

const configureStore = () => createStore(rootReducer, applyMiddleware(thunk));

export default configureStore;