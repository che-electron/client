import { IState, reducer } from '../reducers'

import { applyMiddleware, createStore } from 'redux'
import logger from 'redux-logger'

const middlewares = applyMiddleware(logger)

const store = createStore<IState, any, {}, {}>(reducer, middlewares)

export default store