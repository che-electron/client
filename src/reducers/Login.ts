import { Action, ActionTypes } from '../actions/Login';

// import {getPassword, setPassword} from 'keytar'

export interface IStateLogin {
    OSIOAuthError : string,
    OSIOFetching : boolean,
    OSIOAuthenticated : boolean,
    CheAuthenticatedOnce : boolean,
    CheServersLogin : {} // {{cheURL:{authenticated:boolean,fetching:boolean}}}
}

export const initialState : IStateLogin = {
    CheAuthenticatedOnce : false,
    CheServersLogin : {},
    OSIOAuthError : "",
    OSIOAuthenticated : false,
    OSIOFetching : false,
}

export function loginReducer(state: IStateLogin = initialState, action: Action){
    switch(action.type){
        
        // OSIO : check -> request -> check
        // OSIO ACTIONS

        case ActionTypes.CHECK_OSIO_LOGIN: {
            return Object.assign({}, state, {
                OSIOAuthenticated : action.payload.OSIOAuthenticated,
            })
        }

        case ActionTypes.OSIO_LOGIN_REQUEST: {
            return Object.assign({}, state, {
                OSIOFetching : action.payload.OSIOFetching,
            })
        }

        // CHE : check -> request(validate) -> check
        // CHE ACTIONS        

        case ActionTypes.CHECK_CHE_LOGIN : {
            return Object.assign({}, state, {
                CheAuthenticatedOnce : action.payload.CheAuthenticatedOnce,
            })
        }

        case ActionTypes.CHE_LOGIN_VALIDATE :{

            const cheServersAuthenticated = {...state.CheServersLogin}
            cheServersAuthenticated[action.payload.CheURL] = {}
            cheServersAuthenticated[action.payload.CheURL].authenticated = action.payload.CheAuthenticated


            return Object.assign({}, state, {
                CheServersLogin : {...cheServersAuthenticated}
            })
        }

        default:{
            return state
        }
    }
}