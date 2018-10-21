import { Action, ActionTypes } from '../actions/Sidebar';
import Workspace from "../models/Workspace";

// import {getPassword, setPassword} from 'keytar'

export interface IState {
    sidebarIsActive : boolean,
    workspaces : Workspace[]
}

export const initialState : IState = {
    sidebarIsActive : true,
    workspaces : []
}


export function reducer(state: IState = initialState, action: Action){
    switch(action.type){
        case ActionTypes.TOGGLE_SIDEBAR: {
            
            return {
                ...state,
                sidebarIsActive : !state.sidebarIsActive,
            }
        }

        case ActionTypes.FETCH_WORKSPACES: {

            const Workspaces : Workspace[] =[] 

            const request = async () => {
                const response = await fetch("http://che-mini-che.192.168.42.121.nip.io/api/workspace"/* "https://che.openshift.io/api/workspace?token="+localStorage.OSIOAuthToken*/)
                const data = await response.json()   
                
                data.map((workspace:any,index:number)=>{
                    const wksp : Workspace = {
                        id : workspace.id,
                        name : workspace.config.name,
                        status : workspace.status,
                        url : workspace.links.ide,
                    }
                    global.console.log(wksp)
                    Workspaces[index] = wksp
                })
            }

            request()

            return {
                ...state,
                workspaces : Workspaces
            }
        }

        default : {
            return state
        }
    }
}