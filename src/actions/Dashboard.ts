import Workspace from '../models/Workspace';

import Server from '../models/Server';

import { Dispatch } from 'redux';

import MockLocalStorage from '../mocks/MockLocalStorage';

let localStorage : any;

if (!window.localStorage) {
    global.console.log('Local storage doesnt exist');
    localStorage = new MockLocalStorage;
} else {
    localStorage = window.localStorage;
}

export enum ActionTypes {

    // Sidebar Action
    TOGGLE_SIDEBAR = '[dashboard_sidebar] TOGGLE_SIDEBAR',
    // Servers Action
    POPULATE_SERVERS = '[dashboard_servers] POPULATE_SERVERS',
    // Fetch Workspaces Actions (parameter : server)
    FETCH_WORKSPACES = '[dashboard_server_workspaces] FETCH_WORKSPACES',
    REQUEST_WORKSPACES = '[dashboard_server_workspaces] REQUEST_WORKSPACES',
    RECEIVE_WORKSPACES = '[dashboard_server_workspaces] RECEIVE_WORKSPACES',
    REQUEST_WORKSPACES_FAILED = '[dashboard_server_workspaces] REQUEST_WORKSPACES_FAILED',
    // Current Server and Workspace selected
    SET_CURRENT_SERVER = '[dashboard_server] SET_CURRENT_SERVER',
    SET_CURRENT_WORKSPACEPERSERVER = '[dashboard_workspace] SET_CURRENT_WORKSPACEPERSERVER',
    // Workspace Agent

    // IDE Actions
    TOGGLE_IDE_LOGIN = '[dashboard_IDE_login] SERVER_LOGIN'
}

/*
    Interfaces defining the payload for actions
*/

export interface IToggleSidebarAction {
    type : ActionTypes.TOGGLE_SIDEBAR,
}

export interface IToggleIDELoginAction {
    type : ActionTypes.TOGGLE_IDE_LOGIN,
}

export interface IPopulateServersAction {
    type : ActionTypes.POPULATE_SERVERS,
    payload : {
        servers : Server[]
    }
}

export interface ISetCurrentServerAction {
    type : ActionTypes.SET_CURRENT_SERVER,
    payload : {
        currentServer : string
    }
}

export interface ISetCurrentWorkspacePerServerAction {
    type : ActionTypes.SET_CURRENT_WORKSPACEPERSERVER,
    payload : {
        workspace : string // Will container key:value pairs equivalent to server:workspace
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
        server : string,
        fetchingWorkspaces : boolean
    }
}

export interface IReceiveWorkpsacesAction {
    type : ActionTypes.RECEIVE_WORKSPACES,
    payload : {
        server : string,
        fetchingWorkspaces : boolean,
        workspaces : Workspace[]
    }
}

export interface IRequestWorkpsacesFailureAction {
    type : ActionTypes.REQUEST_WORKSPACES_FAILED,
    payload : {
        server : string,
        fetchingWorkspaces : boolean,
        error : string
    }
}

/*
    Actions as funcitons
*/

export function toggleSidebar() {
    return {
        type : ActionTypes.TOGGLE_SIDEBAR,
    }
}

export function toggleIDELogin() {
    return {
        type : ActionTypes.TOGGLE_IDE_LOGIN,
    }
}

export function populateServers() {

    const localStorageServersAuth = JSON.parse(localStorage.getItem('Servers') || '{}')
    const mapLocalStoragetoModel : {} = {}

    for (const key in localStorageServersAuth) {
        if (localStorageServersAuth.hasOwnProperty(key) && localStorageServersAuth[key]) {
                    mapLocalStoragetoModel[key] = {
                    authToken : localStorageServersAuth[key],
                    url : key
                }
            }
        }
    return {
        payload : {
            servers : mapLocalStoragetoModel
        },
        type : ActionTypes.POPULATE_SERVERS,
    }
}

export function setCurrentServer(server : string) {
    return {
        payload : {
            currentServer : server
        },
        type : ActionTypes.SET_CURRENT_SERVER,
    }
}

export function requestWorkspaces(currentServer : string) {
    return {
        payload : {
            fetchingWorkspaces : true,
            server : currentServer,
        },
        type : ActionTypes.REQUEST_WORKSPACES
    }
}

export function receiveWorkspaces(currentServer : string, fetchedWorkspaces : []) {
    return {
        payload : {
            fetchingWorkspaces : false,
            server : currentServer,
            workspaces : fetchedWorkspaces,
        },
        type : ActionTypes.RECEIVE_WORKSPACES
    }
}

export function requestWorkspacesFailed(currentServer : string, errorCaught : any) {
    return {
        payload : {
            error : errorCaught,
            fetchingWorkspaces : false,
            server : currentServer,
        },
        type : ActionTypes.REQUEST_WORKSPACES_FAILED
    }
}

export function updateWorkspacesList() {
    return (dispatch : Dispatch<any>, getState : any) => {
        const state = getState()

        if (state.dashboard.currentServer) {
            dispatch(requestWorkspaces(state.dashboard.currentServer))
            fetch('http://' + state.dashboard.currentServer + '/api/workspace?token=' +
            state.dashboard.servers[ state.dashboard.currentServer ].authToken).then((resp : any) => {
                return resp.json()
            }).then((body : any) => {
                dispatch(receiveWorkspaces(state.dashboard.currentServer, body))
            }).catch((error : any) => {
                dispatch(requestWorkspacesFailed(state.dashboard.currentServer, error))
            })
        }
    }
}

export function setCurrentWorkspacePerServer(wksp : string) {
    return {
        payload : {
            workspace : wksp
        },
        type : ActionTypes.SET_CURRENT_WORKSPACEPERSERVER
    }
}

export type Action = IToggleSidebarAction | IPopulateServersAction | IToggleIDELoginAction | ISetCurrentServerAction
                    | ISetCurrentWorkspacePerServerAction | IRequestWorkpsacesAction | IReceiveWorkpsacesAction
                    | IRequestWorkpsacesFailureAction
