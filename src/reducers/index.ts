import { combineReducers } from "redux"

import * as Dashboard from './Dashboard'
import * as Login from './Login';


export interface IState {
    dashboard : Dashboard.IStateDashboard,
    login : Login.IStateLogin,
}

export const initialState: IState = {
    dashboard: Dashboard.initialState,
    login: Login.initialState,
}

export const reducer = combineReducers<IState>({
    dashboard : Dashboard.dashboardReducer,
    login: Login.loginReducer,
})