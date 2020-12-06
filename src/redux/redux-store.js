import { reducer as formReducer } from 'redux-form'
import { applyMiddleware, compose, createStore, combineReducers } from "redux";
import usersReducer from "./users-reducer";
import thunkMiddleware from 'redux-thunk'




let reducers = combineReducers({
    users: usersReducer,
    form: formReducer,
})
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducers, composeEnhancers(applyMiddleware(thunkMiddleware)));
//@ts-ignore
window.__store__ = store;

export default store;