import { Action, ActionTypes } from '../actions/Login';

// import {getPassword, setPassword} from 'keytar'

export interface IStateLogin {
    OSIOAuthError : string,
    OSIOFetching : boolean,
    OSIOAuthenticated : boolean,
}

export const initialState : IStateLogin = {
    OSIOAuthError : "",
    OSIOAuthenticated : false,
    OSIOFetching : false,
}

export function loginReducer(state: IStateLogin = initialState, action: Action){
    switch(action.type){
        case ActionTypes.CHECK_LOGIN: {
            return {
                ...state,
                ...action.payload
            }
        }

        case ActionTypes.OSIO_LOGIN_REQUEST: {
            return {
                ...state,
                ...action.payload
            }
        }

        default:{
            return state
        }
    }
}