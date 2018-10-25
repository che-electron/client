import Workspace from "../models/Workspace"

import { Dispatch } from "redux"

import { IState } from '../reducers/Sidebar';

import IWorkspace from '../models/Workspace';


export enum ActionTypes {
    TOGGLE_SIDEBAR = '[sidebar] TOGGLE_SIDEBAR',
    FETCH_WORKSPACES = '[sidebar_wksps] FETCH_WORKSPACES',
    REQUEST_WORKSPACES = '[sidebar_wksps] REQUEST_WORKSPACES',
    RECEIVE_WORKSPACES = '[sidebar_wksps] RECEIVE_WORKSPACES'

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

export interface IFetchWorkpsacesAction {
    type : ActionTypes.FETCH_WORKSPACES,
    payload : {
        wkspsIsFetching : boolean,
        wkspsFetchError : boolean,
        workspaces : Workspace[]
    }
}

export interface IRequestWorkpsacesAction {
    type : ActionTypes.REQUEST_WORKSPACES,
    payload : {
        workspaces : Workspace[]
    }
}

export interface IReceiveWorkpsacesAction {
    type : ActionTypes.RECEIVE_WORKSPACES,
    payload : {
        workspaces : Workspace[]
    }
}

/*
    Functions which are going to be used by the Actions
*/

/*
    Actions as funcitons
*/


export function toggleSidebar(){
    return {
        type : ActionTypes.TOGGLE_SIDEBAR
    }
}

function shouldFetchWorkspaces(state : IState ){
    if (!state.workspaces){
        return true
    }
    return false
}

function requestWorkspaces(){
    return {
        type: ActionTypes.REQUEST_WORKSPACES
    }
}

function receiveWorkspaces(Workspaces : IWorkspace[]){
    return {
        payload : {
            workspaces : Workspaces
        },
        type: ActionTypes.RECEIVE_WORKSPACES,
    }
}

function makeRequestWorkspaces(){
    return ( dispatch : Dispatch )=> {
        dispatch(requestWorkspaces())
        fetch("https://che.openshift.io/api/workspace?token="+localStorage.OSIOAuthToken).then((response) => {
            return response.json()
        }).then(data => {     
            const workspaces : Workspace[] = [] 
            data.map((workspace:any,index:number)=>{
                const wksp : Workspace = {
                    id : workspace.id,
                    name : workspace.config.name,
                    status : workspace.status,
                    url : workspace.links.ide,
                }
                workspaces[index] = wksp
            })
            return workspaces
        }).then((workspaces) => {
            dispatch(receiveWorkspaces(workspaces))
        })
    }
}

export function fetchWorkspaces(){
    return (dispatch : Dispatch<any>, getState : any)=>{
        if (shouldFetchWorkspaces(getState())){
            return dispatch(makeRequestWorkspaces())
        } else {
            return 
        }
    }
}


export type Action = IToggleSidebarAction | IFetchWorkpsacesAction | IRequestWorkpsacesAction | IReceiveWorkpsacesAction