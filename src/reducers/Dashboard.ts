import { Action, ActionTypes } from '../actions/Dashboard';
// import Server from "../models/Server";

export interface IStateDashboard {
    // IDE State
    currentServer : string,
    currentWorkspacePerServer : {},
    IDELoginIsActive : boolean
    // Servers
    servers : {},

    // Sidebar
    sidebarIsActive : boolean,

}

export const initialState : IStateDashboard = {
    IDELoginIsActive : false,
    currentServer : '',
    currentWorkspacePerServer : {},
    servers : {},
    sidebarIsActive : true,
}

export function dashboardReducer(state: IStateDashboard = initialState, action: Action) {
    switch (action.type) {
        case ActionTypes.TOGGLE_SIDEBAR: {
            return { ...state, sidebarIsActive : !state.sidebarIsActive }
        }

        case ActionTypes.TOGGLE_IDE_LOGIN: {
            return { ...state, IDELoginIsActive : !state.IDELoginIsActive }
        }

        case ActionTypes.POPULATE_SERVERS: {
            return { ...state, servers : action.payload.servers }
        }

        case ActionTypes.SET_CURRENT_SERVER: {
            return { ...state, currentServer : action.payload.currentServer }
        }

        case ActionTypes.SET_CURRENT_WORKSPACEPERSERVER : {

            const obj = { ...state.currentWorkspacePerServer }
            obj[state.currentServer] = action.payload.workspace
            global.console.log(obj)

            return { ...state, currentWorkspacePerServer : { ...obj }}
        }

        case ActionTypes.REQUEST_WORKSPACES : {
            const serversState = { ...state.servers }
            serversState[action.payload.server].fetchingWorkspaces = action.payload.fetchingWorkspaces

            return { ...state, servers : { ...serversState }}
        }

        case ActionTypes.RECEIVE_WORKSPACES : {

            const serversState = { ...state.servers }
            serversState[action.payload.server].fetchingWorkspaces = action.payload.fetchingWorkspaces
            serversState[action.payload.server].workspaces = action.payload.workspaces

            return { ...state, servers : { ...serversState }}
        }

        case ActionTypes.REQUEST_WORKSPACES_FAILED : {
            const serversState = { ...state.servers }
            serversState[action.payload.server].fetchingWorkspaces = action.payload.fetchingWorkspaces
            serversState[action.payload.server].fetchError = action.payload.error

            return { ...state, servers : { ...serversState }}
        }

        default : {
            return state
        }
    }
}
