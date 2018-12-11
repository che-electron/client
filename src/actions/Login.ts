import * as jwtDecode from 'jwt-decode';
import { Dispatch } from 'redux';
import { populateServers } from '../actions/Dashboard';
import MockLocalStorage from '../mocks/MockLocalStorage';

// import * as Keycloak from 'keycloak-js'
const osioCheURL = 'che.openshift.io';
const osioPPCheURL = 'che.prod-preview.openshift.io';

 let localStorage : any
localStorage = localStorage;

if (!window.localStorage)
{
    global.console.log('Local storage doesnt exist');
    localStorage = new MockLocalStorage;
} else
    localStorage = window.localStorage;

export enum ActionTypes {
    CHECK_OSIO_LOGIN = '[login] CHECK_OSIO_LOGIN',
    CHECK_CHE_LOGIN = '[login] CHECK_CHE_LOGIN',
    // OSIO Che Login
    OSIO_LOGIN_REQUEST = '[login_osio] LOGIN_REQUEST',
    // Multiuser Che Login
    CHE_LOGIN_REQUEST = '[login_che] LOGIN_REQUEST',
    CHE_LOGIN_VALIDATE = '[login_che] VALIDATE',
    CHE_LOGIN_RECEIVE = '[login_che] LOGIN_RECEIVE'
}

/*
    Interfaces defining the payload for actions
*/

export interface ICheckOSIOLoginAction {
    type : ActionTypes.CHECK_OSIO_LOGIN,
    payload : {
        OSIOAuthenticated : boolean,
    }
}

export interface ICheckCheLoginAction {
    type : ActionTypes.CHECK_CHE_LOGIN,
    payload : {
        CheAuthenticatedOnce : boolean,
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
    payload : {
        CheURL : string,
        CheFetching : boolean
    }
}

export interface ICheLoginValidateAction {
    type : ActionTypes.CHE_LOGIN_VALIDATE,
    payload : {
        CheURL : string,
        CheAuthenticated : boolean,
    }
}

export interface ICheLoginReceiveAction {
    type : ActionTypes.CHE_LOGIN_RECEIVE,
    payload : {
        CheURL : string,
        CheFetching : boolean
    }
}

/*
    Actions as funcitons
*/

export function checkOSIOLogin() {
    // let existsInURL : boolean
    const localStorageCheServers = JSON.parse(localStorage.getItem('Servers') || '{}')
    global.console.log(localStorageCheServers)
    if (localStorageCheServers[osioCheURL] && localStorageCheServers[osioPPCheURL])
        return {
            payload : {
                OSIOAuthenticated : true
            },
            type: ActionTypes.CHECK_OSIO_LOGIN
        }
    else {
        const result : any = {}
        if (window.location.search) {
            const URL = decodeURIComponent(window.location.href)
            const urls = URL.split('token_json')[1].substr(2)
            urls.split(',').forEach(part => {
                const item: any = part.split(':');
                result[item[0].replace(/"/g, '')] = item[1].replace(/"/g, '');
            });
        }

        let key = 'access_token'
        if (result[key]) {
            // existsInURL = true
            const authURL = jwtDecode(result[key])['allowed-origins'][0];
            global.console.log('auth ' + authURL);
            const cheURL = (authURL === 'https://auth.openshift.io') ? 'che.openshift.io' : 'che.prod-preview.openshift.io'
            localStorageCheServers[cheURL] = result[key]
            localStorage.setItem('Servers', JSON.stringify(localStorageCheServers))
            return {
                payload : {
                    OSIOAuthenticated : true
                },
                type: ActionTypes.CHECK_OSIO_LOGIN
            }
        }else {
            localStorageCheServers[osioCheURL] = ''
            localStorageCheServers[osioPPCheURL] = ''
            localStorage.setItem('Servers', JSON.stringify(localStorageCheServers))
        }
        key = 'error'
        if (result[key])
            return {
                payload : {
                    OSIOAuthError : result[key],
                    OSIOAuthenticated : false
                },
                type: ActionTypes.CHECK_OSIO_LOGIN
            }
        // existsInURL = false
    }
    return {
        payload : {
            OSIOAuthenticated : false,
        },
        type: ActionTypes.CHECK_OSIO_LOGIN
    }
}

export function checkCheLogin() {
    const localStorageCheServers : {} = JSON.parse(localStorage.getItem('Servers') || '{}')
    let auths : number = 0
    for (const key in localStorageCheServers)
        if (key !== osioCheURL && key !== osioPPCheURL && Object.keys(localStorageCheServers).length > 1
        && JSON.stringify(localStorageCheServers[key]) !== '{}')
            auths++
    if (auths > 0)
        return {
            payload : {
                CheAuthenticatedOnce : true,
            },
            type: ActionTypes.CHECK_CHE_LOGIN
        }
    else
        return {
            payload : {
                CheAuthenticatedOnce : false,
            },
            type: ActionTypes.CHECK_CHE_LOGIN
        }
}

/* Changes to make to login request actions:-
    * Add async workflow to actions
    * check for token validity -> request -> receive -> check for token validity -> repeat
    * If the check is done 3 times then dispatch LOGIN_FAILURE_ACTION else dispatch the LOGIN_SUCCESS_ACTION
*/

export function requestOSIOLogin(cheServerURL : string) {
    const redirectUrl = encodeURIComponent(window.location.href);
    // setLocalStorageForCheServer(cheServerURL,body.access_token)
    const authApiUrl = (cheServerURL === 'che.openshift.io') ?
    (`https://auth.openshift.io/api/`) : ('https://auth.prod-preview.openshift.io/api/')
    const loginUrl = `${authApiUrl}login?redirect=${redirectUrl}`
    window.location.href = loginUrl
    return {
        payload : {
            OSIOFetching : true
        },
        type : ActionTypes.OSIO_LOGIN_REQUEST,
    }
}

export function requestCheLogin(cheServerURL : string, cheUserName : string, chePassword : string) {
    return (dispatch : Dispatch) => {
        dispatch(makeRequestCheLogin())
        cheLoginRequest(cheServerURL, cheUserName, chePassword, dispatch)
    }
}

function setLocalStorageForCheServer(cheServerURL : string, cheServerAuth : string) {
    const localStorageServers : {} = JSON.parse(localStorage.getItem('Servers') || '{}')
    if (!localStorage.getItem('Servers') || localStorageServers === {})
        localStorage.setItem('Servers', '{}')
    else if (localStorageServers[cheServerURL] !== cheServerAuth) {
        localStorageServers[cheServerURL] = cheServerAuth
        localStorage.setItem('Servers', JSON.stringify(localStorageServers))
    }
}

function cheLoginRequest(cheServerURL : string, cheUserName : string, chePassword : string, dispatch : Dispatch) {
    let keycloakSettings = {}
    const cheClientId = 'che.keycloak.client_id'
    // const cheAuthEndpoint= "che.keycloak.auth_server_url"
    const cheTokenEndpoint = 'che.keycloak.token.endpoint'
    // const cheRealm = "che.keycloak.realm"
    if (cheServerURL)
        fetch('http://' + cheServerURL + '/api/keycloak/settings').then((response) => {
            return response.json()
        }).then((data) => {
            keycloakSettings = data
            if (keycloakSettings)
                fetch(keycloakSettings[cheTokenEndpoint], {
                    body : 'grant_type=password&client_id=' + keycloakSettings[cheClientId] +
                    '&username=' + cheUserName + '&password=' + chePassword + '',
                    headers : {
                        'Access-Control-Allow-Credentials': 'true',
                        // 'Access-Control-Allow-Origin': '*',
                        'Content-Type': 'application/x-www-form-urlencoded',
                    },
                    method : 'POST',
                }).then((response: any) => {
                    if (response.status === 200)
                        global.console.log(cheServerURL + ' LOGGED IN !')
                    else
                        dispatch(cheLoginValidate(false, cheServerURL))
                    return response.json()
                }).then((body : any) => {
                    setLocalStorageForCheServer(cheServerURL, body.access_token)
                    dispatch(cheLoginValidate(true, cheServerURL))
                    dispatch(checkCheLogin())
                    dispatch(populateServers())
                }).catch(err => {
                    global.console.log(err)
                })
                /*

                keycloak.init({ onLoad: 'check-sso', checkLoginIframeInterval: 1 }).success(authenticated => {
                    if (keycloak.authenticated) {
                        checkLocalStorageForCheServer(cheServerURL,JSON.stringify(keycloak.token))
                        setInterval(() => {
                            keycloak.updateToken(10).error(() => keycloak.logout());
                            checkLocalStorageForCheServer(cheServerURL,JSON.stringify(keycloak.token))
                            global.console.log(keycloak.token)
                        }, 10000);
                    }else{
                        keycloak.login();
                    }
                });*/
        })
}

function makeRequestCheLogin() {
    return {
        type : ActionTypes.CHE_LOGIN_REQUEST,
    }
}

function cheLoginValidate(isAuthenticated : boolean, cheURL : string) {
    return {
        payload : {
            CheAuthenticated : isAuthenticated,
            CheURL : cheURL,
        },
        type : ActionTypes.CHE_LOGIN_VALIDATE,
    }
}

export type Action = IOSIOLoginRequestAction | ICheckOSIOLoginAction | ICheckCheLoginAction
                    | ICheLoginRequestAction | ICheLoginValidateAction
