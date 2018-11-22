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
    currentServer : "",
    currentWorkspacePerServer : {},    
    servers : {},
    sidebarIsActive : true,    
}


export function dashboardReducer(state: IStateDashboard = initialState, action: Action){
    switch(action.type){
        case ActionTypes.TOGGLE_SIDEBAR: {
            return Object.assign({}, state, {
                sidebarIsActive : !state.sidebarIsActive
            })
        }

        case ActionTypes.TOGGLE_IDE_LOGIN: {
            return Object.assign({}, state, {
                IDELoginIsActive : !state.IDELoginIsActive
            })
        }

        case ActionTypes.POPULATE_SERVERS: {
            return Object.assign({}, state, {
                servers : action.payload.servers
            })
        }

        case ActionTypes.SET_CURRENT_SERVER: {
            return Object.assign({}, state, {
                currentServer : action.payload.currentServer
            })
        }

        case ActionTypes.SET_CURRENT_WORKSPACEPERSERVER: {
            return Object.assign({}, state, {
                
            })
        }

        case ActionTypes.REQUEST_WORKSPACES :{
            const serversState = state.servers
            serversState[action.payload.server].fetchingWorkspaces = action.payload.fetchingWorkspaces

            return Object.assign({}, state, {
                servers : serversState
            })
        }

        case ActionTypes.RECEIVE_WORKSPACES : {

            const serversState = state.servers
            serversState[action.payload.server].fetchingWorkspaces = action.payload.fetchingWorkspaces
            serversState[action.payload.server].workspaces = action.payload.workspaces

            return Object.assign({}, state, {
                servers : serversState
            })
        }

        case ActionTypes.REQUEST_WORKSPACES_FAILED : {
            const serversState = state.servers
            serversState[action.payload.server].fetchingWorkspaces = action.payload.fetchingWorkspaces
            serversState[action.payload.server].fetchError = action.payload.error

            return Object.assign({}, state, {
                servers : serversState
            })
        }

        default : {
            return state
        }
    }
}