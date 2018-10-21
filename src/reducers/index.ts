import { combineReducers } from 'redux';

import * as Login from './Login';
import * as Sidebar from './Sidebar'


export interface IState {
    login : Login.IState,
    sidebar : Sidebar.IState
}

export const initialState: IState = {
    login: Login.initialState,
    sidebar: Sidebar.initialState
}

export const reducer = combineReducers<IState>({
    login: Login.reducer,
    sidebar : Sidebar.reducer
})