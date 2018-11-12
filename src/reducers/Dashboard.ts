import { Action, ActionTypes } from '../actions/Dashboard';
import Workspace from "../models/Workspace";

import Server from "../models/Server";


export interface IStateDashboard {
    // IDE State
    currentServer : string,
    currentWorkspace : string,
    // Servers
    servers : Server[],
    // Workspaces
    workspaces : Workspace[],
    // Sidebar
    sidebarIsActive : boolean,

}

export const initialState : IStateDashboard = {
    currentServer : "",
    currentWorkspace : "",
    servers : [],
    sidebarIsActive : true,    
    workspaces : [],
}


export function dashboardReducer(state: IStateDashboard = initialState, action: Action){
    switch(action.type){
        case ActionTypes.TOGGLE_SIDEBAR: {
            return Object.assign({}, state, {
                sidebarIsActive : !state.sidebarIsActive
            })
        }

        default : {
            return state
        }
    }
}