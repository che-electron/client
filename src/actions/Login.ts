export enum ActionTypes {
    CHECK_LOGIN = '[login] CHECK_LOGIN',
    OSIO_LOGIN_REQUEST = '[login] OSIO_LOGIN_REQUEST',
    OSIO_LOGIN_FAILURE = '[login] OSIO_LOGIN_FAILURE',
    OSIO_LOGIN_SUCCESS = '[login] OSIO_LOGIN_SUCCESS'
}

/*
    Interfaces defining the payload for actions
*/

export interface ICheckLoginAction {
    type : ActionTypes.CHECK_LOGIN,
    payload : {
        authenticated : boolean
    }
}

export interface IOSIOLoginRequestAction {
    type : ActionTypes.OSIO_LOGIN_REQUEST,
    payload : {
        authenticated : boolean,
    }
}

/*
    Actions as funcitons
*/

export function checkLogin(){
    return {
        type: ActionTypes.CHECK_LOGIN
    }
}

export function requestLogin(){
    return {
        type : ActionTypes.OSIO_LOGIN_REQUEST
    }
}
export type Action = ICheckLoginAction | IOSIOLoginRequestAction