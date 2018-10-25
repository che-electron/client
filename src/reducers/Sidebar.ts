import { Action, ActionTypes } from '../actions/Sidebar';
import Workspace from "../models/Workspace";

// import {getPassword, setPassword} from 'keytar'

export interface IState {
    sidebarIsActive : boolean,
    workspaces : Workspace[],
    wkspsIsFetching : boolean,
    wkspsFetchError : boolean
}

export const initialState : IState = {
    sidebarIsActive : true,
    wkspsFetchError : false,
    wkspsIsFetching :false,
    workspaces : [],
}


export function reducer(state: IState = initialState, action: Action){
    switch(action.type){
        case ActionTypes.TOGGLE_SIDEBAR: {
            return Object.assign({}, state, {
                sidebarIsActive : !state.sidebarIsActive,
            })
        }

        case ActionTypes.FETCH_WORKSPACES: {            
            return Object.assign({}, state, {
                workspaces : action.payload.workspaces,
            })
        }

        case ActionTypes.REQUEST_WORKSPACES: {
            return Object.assign({}, state, {
                wkspsFetchError : false,
                wkspsIsFetching :true,
              })
        }
        
        case ActionTypes.RECEIVE_WORKSPACES: {
            return Object.assign({}, state, {
                wkspsFetchError : false,
                wkspsIsFetching : false,
                workspaces : action.payload.workspaces,
              })
        }
        
        default : {
            return state
        }
    }
}