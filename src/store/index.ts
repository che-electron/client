import { IState, reducer } from '../reducers'

import { applyMiddleware, createStore } from "redux";
import { composeWithDevTools } from 'redux-devtools-extension';

import logger from "redux-logger";
import thunk from "redux-thunk";

const middlewares = applyMiddleware(thunk,logger)
const store = createStore<IState, any, {}, {}>(reducer, composeWithDevTools(middlewares))

export default store