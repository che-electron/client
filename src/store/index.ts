import { IState, reducer } from '../reducers'

import { applyMiddleware, createStore } from "redux";
import logger from "redux-logger";
import thunk from "redux-thunk";

const middlewares = applyMiddleware(logger,thunk)
const store = createStore<IState, any, {}, {}>(reducer, middlewares)

export default store