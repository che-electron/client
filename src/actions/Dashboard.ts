// import { Dispatch } from "redux";

import {  initialState, IStateDashboard, } from '../reducers/Dashboard';

// import Workspace from '../models/Workspace';

import Server from '../models/Server';


export enum ActionTypes {
    /*/ IDE State
    currentServer : string,
    currentWorkspace : string,
    // Servers
    servers : Server[],
    // Workspaces
    workspaces : Workspace[],
    // Sidebar
    sidebarIsActive : boolean,
    /*/

    // Sidebar Action
    TOGGLE_SIDEBAR = '[dashboard_sidebar] TOGGLE_SIDEBAR',
    // Servers Action
    POPULATE_SERVERS = '[dashboard_servers] POPULATE_SERVERS',
    // Fetch Workspaces Actions (parameter : server)
    FETCH_WORKSPACES = '[dashboard_server_workspaces] FETCH_WORKSPACES',
    REQUEST_WORKSPACES = '[dashboard_server_workspaces] REQUEST_WORKSPACES',
    RECEIVE_WORKSPACES = '[dashboard_server_workspaces] RECEIVE_WORKSPACES',
    // Current Server and Workspace selected
    SET_CURRENT_SERVER = '[dashboard_server] SET_CURRENT_SERVER',
    SET_CURRENT_WORKSPACE = '[dashboard_workspace] SET_CURRENT_WORKSPACE',
    // Workspace Agent
}

/*
    Interfaces defining the payload for actions
*/

export interface IToggleSidebarAction {
    type : ActionTypes.TOGGLE_SIDEBAR,
    payload : {
        sidebarIsActive : boolean
    }
}

export interface IPopulateServersAction {
    type : ActionTypes.POPULATE_SERVERS,
    payload : {
        servers : Server[]
    }
}

/*
    Actions as funcitons
*/

export function toggleSidebar( state : IStateDashboard = initialState){
    return {
        type : ActionTypes.TOGGLE_SIDEBAR,
    }
}

export function workspaceStart(state : {}, id : string){
    /*
    checks state : 
        if state.workspaces[id : id] == started :{
            stop
        } else if starting {
            return workspace is starting
        } else if stopping {
            return workspace is stopping
        } else { // stopped
            start
        }
    
    */
}

export type Action = IToggleSidebarAction | IPopulateServersAction 

