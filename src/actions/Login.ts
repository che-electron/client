import { Dispatch } from 'redux';

export enum ActionTypes {
    CHECK_LOGIN = '[login] CHECK_LOGIN',
    // OSIO Che Login
    OSIO_LOGIN_REQUEST = '[login_osio] LOGIN_REQUEST',
    // Multiuser Che Login
    CHE_LOGIN_REQUEST = '[login_che] LOGIN_REQUEST',
    CHE_LOGIN_VALIDATE = '[login_che] VALIDATE',
    CHE_LOGIN_RECEIVE = '[login_che] LOGIN_RECEICE'
}

/*
    Interfaces defining the payload for actions
*/

export interface ICheckLoginAction {
    type : ActionTypes.CHECK_LOGIN,
    payload : {
        authenticated : boolean,
    }   
}

// OSIO login interfaces

export interface IOSIOLoginRequestAction {
    type : ActionTypes.OSIO_LOGIN_REQUEST,
    payload : {
        OSIOFetching : boolean,
    }
}

// Che Login interfaces

export interface ICheLoginRequestAction {
    type : ActionTypes.CHE_LOGIN_REQUEST,
}

export interface ICheLoginValidateAction {
    type : ActionTypes.CHE_LOGIN_VALIDATE,
    payload : {
        authenticated : boolean,
    }
}

export interface ICheLoginReceiveAction {
    type : ActionTypes.CHE_LOGIN_RECEIVE
}


/*
    Actions as funcitons
*/

export function checkLogin(){
    let existsInURL : boolean
    const localStorageCheServers = JSON.parse(localStorage.getItem("Servers") || "{}")

    if (localStorageCheServers.osioche){
        return {
            payload : {
                OSIOAuthenticated : true
            },
            type: ActionTypes.CHECK_LOGIN
        }
    }else{
        const result : any = {}
        if(window.location.search){
            const URL = decodeURIComponent(window.location.href)
            const urls = URL.split('token_json')[1].substr(2)
            urls.split(",").forEach(part => {
                const item: any = part.split(":");
                result[item[0].replace(/"/g,'')] = item[1].replace(/"/g,'');
            });
        }

        if(result.access_token){
            localStorageCheServers.osioche = result.access_token
            localStorage.setItem("Servers",JSON.stringify(localStorageCheServers))
            existsInURL = true
            return {
                payload : {
                    OSIOAuthenticated : true, 
                },
                type: ActionTypes.CHECK_LOGIN
            }
        }
        if(result.error){
            return {
                payload : {
                    OSIOAuthError : result.error,
                    OSIOAuthenticated : false
                },
                type: ActionTypes.CHECK_LOGIN
            }   
        }
        existsInURL = false
    }
    
    if (localStorageCheServers.osioche === null && !existsInURL){
        return {
            payload : {
                OSIOAuthenticated : false,
            },
            type: ActionTypes.CHECK_LOGIN
        }
    } else {
        return {
            type: ActionTypes.CHECK_LOGIN
        }
    }
}


/* Changes to make to login request actions:- 

    * Add async workflow to actions
    * check for token validity -> request -> receive -> check for token validity -> repeat
    * If the check is done 3 times then dispatch LOGIN_FAILURE_ACTION else dispatch the LOGIN_SUCCESS_ACTION
    
*/

export function requestOSIOLogin(){
    const redirectUrl = encodeURIComponent(window.location.href);
    const authApiUrl = `https://auth.openshift.io/api/`
    const loginUrl = `${authApiUrl}login?redirect=${redirectUrl}`
    window.location.href = loginUrl
    return {
        payload : {
            OSIOFetching : true
        },
        type : ActionTypes.OSIO_LOGIN_REQUEST,
    }
}

export function requestCheLogin(cheServerURL : string, cheUserName : string, chePassword : string){
    return (dispatch : Dispatch)=>{
        dispatch(makeRequestCheLogin())
        cheLoginRequest(cheServerURL, cheUserName, chePassword, dispatch)
    }
}

function checkLocalStorageForCheServer(cheServerURL:string, cheServerAuth: string){
    const localStorageServers : string = JSON.parse(localStorage.getItem("Servers") || "{}")
    if (!localStorage.getItem("Servers") || localStorageServers === "{}"){
        localStorage.setItem("Servers","{}")
    } else if (localStorageServers[cheServerURL] !== cheServerAuth){
        localStorageServers[cheServerURL] = cheServerAuth
        localStorage.setItem("Servers",JSON.stringify(localStorageServers))
    }
}

function checkHTTPStatus(status : number) : boolean {
    if (status === 200){
        return true
    }else{
        return false
    }
}

function cheLoginRequest(cheServerURL : string, cheUserName : string, chePassword : string, dispatch : Dispatch) {
    
    let keycloakSettings = {}
    
    const cheClientId = "che.keycloak.client_id"
    const cheTokenEndpoint= "che.keycloak.token.endpoint"
    global.console.log(cheServerURL)
    if (cheServerURL !== " " || !cheServerURL){    
        fetch("http://"+cheServerURL+"/api/keycloak/settings").then((response) =>{
            return response.json()
        }).then((data) => {
            keycloakSettings = data
            if (keycloakSettings !== {} || keycloakSettings != null){
                fetch(keycloakSettings[cheTokenEndpoint], {
                    body : "grant_type=password&client_id="+keycloakSettings[cheClientId]+"&username="+cheUserName+"&password="+chePassword+"",
                    headers : {
                        "Content-Type": "application/x-www-form-urlencoded"
                    },
                    method : "POST",
                }).then((response: any) => {
                    if (checkHTTPStatus(response.status)){
                        dispatch(cheLoginValidate(true,cheServerURL))
                        return response.json()
                    }else{
                        dispatch(cheLoginValidate(false,cheServerURL))
                    }
                }).then((body : any) => {
                    checkLocalStorageForCheServer(cheServerURL,body)
                    global.console.log(body)
                })
            }
        })
    }
    
    // return keycloakSettings
}

function makeRequestCheLogin(){
    return {
        type : ActionTypes.CHE_LOGIN_REQUEST,
    }
}

function cheLoginValidate(isAuthenticated : boolean, cheURL : string){
    return {
        payload : {
            authenticated : isAuthenticated,
            cheServerURL : cheURL

        },
        type : ActionTypes.CHE_LOGIN_VALIDATE,
    }
}

export type Action = IOSIOLoginRequestAction | ICheckLoginAction | ICheLoginRequestAction | ICheLoginValidateAction 