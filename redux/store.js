import { createStore, combineReducers, applyMiddleware } from 'redux';
import faqReducer from './reducers/faqReducer';
import thunk from 'redux-thunk';

const rootReducer = combineReducers({
    faqReducer: faqReducer
})

const configureStore = () => createStore(rootReducer, applyMiddleware(thunk));

export default configureStore;