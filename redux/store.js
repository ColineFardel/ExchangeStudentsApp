import { createStore, combineReducers, applyMiddleware } from 'redux';
import faqReducer from './reducers/faqReducer';
import thunk from 'redux-thunk';
import marketReducer from './reducers/marketReducer';

const rootReducer = combineReducers({
    faqReducer: faqReducer,
    marketReducer : marketReducer
})

const configureStore = () => createStore(rootReducer, applyMiddleware(thunk));

export default configureStore;