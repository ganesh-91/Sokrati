import { createStore, combineReducers } from 'redux';
import recipeReducer from '../reducers/recipeReducer';
import groceryReducer from '../reducers/groceryReducer';

// const store = createStore(recipeReducer);

const rootReducer = combineReducers({
    groceryReducer,
    recipeReducer
})

const store = createStore(rootReducer)

export default store;