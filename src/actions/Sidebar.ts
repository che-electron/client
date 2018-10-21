import Workspace from "../models/Workspace"

export enum ActionTypes {
    TOGGLE_SIDEBAR = '[sidebar] TOGGLE_SIDEBAR',
    FETCH_WORKSPACES = '[sidebar_wksps] FETCH_WORKSPACES'
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

export interface IFetchWorkpsaces {
    type : ActionTypes.FETCH_WORKSPACES,
    payload : {
        workspaces : Workspace[]
    }
}

/*
    Actions as funcitons
*/


export function toggleSidebar(){
    return {
        type : ActionTypes.TOGGLE_SIDEBAR
    }
}

export function fetchWorkspaces(){
    return {
        type : ActionTypes.FETCH_WORKSPACES
    }
}


export type Action = IToggleSidebarAction | IFetchWorkpsaces