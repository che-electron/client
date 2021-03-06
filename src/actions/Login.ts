import { Dispatch } from 'redux';
import MockLocalStorage from '../__mocks__/MockLocalStorage';
import { populateServers } from '../actions/Dashboard';
import { cheKeycloakSettingsApi } from '../apicalls/GetApi';

// import * as Keycloak from 'keycloak-js'
/**
 * @type {string}
 */
const osioCheURL = 'che.openshift.io';

// Define local storage
let localStorage : any

if (!window.localStorage)
{
    global.console.log('Local storage doesnt exist');
    localStorage = new MockLocalStorage;
} else {
    localStorage = window.localStorage;
}

export enum ActionTypes {
    CHECK_OSIO_LOGIN = '[login] CHECK_OSIO_LOGIN',
    OSIO_LOGIN_FAILED = '[login] OSIO_LOGIN_FAILED',
    CHECK_CHE_LOGIN = '[login] CHECK_CHE_LOGIN',
    // OSIO Che Login
    OSIO_LOGIN_REQUEST = '[login_osio] LOGIN_REQUEST',
    // Multiuser Che Login
    CHE_LOGIN_REQUEST = '[login_che] LOGIN_REQUEST',
    CHE_LOGIN_VALIDATE = '[login_che] VALIDATE',
    CHE_LOGIN_RECEIVE = '[login_che] LOGIN_RECEIVE'
}

// Interfaces defining the payload for actions
export interface ICheckOSIOLoginAction {
    type : ActionTypes.CHECK_OSIO_LOGIN,
    payload : {
        OSIOAuthenticated : boolean,
    }
}

export interface IOSIOLoginFailed {
    type : ActionTypes.OSIO_LOGIN_FAILED,
    payload : {
        OSIOAuthenticated : boolean,
        OSIOAuthError : string
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

// Actions as funcitons

/**
 * @remarks {Checks if the user is already Logged-In through OSIO}
 * @return {payload : OSIOAuthenticated : {boolean};
 * type : {ActionTypes}}
 */
export function checkOSIOLogin() {

    // let existsInURL : boolean
    const localStorageCheServers = JSON.parse(localStorage.getItem('Servers') || '{}')
    global.console.log(localStorageCheServers)
    if (localStorageCheServers.hasOwnProperty(osioCheURL) && localStorageCheServers[osioCheURL]) {
        return {
            payload : {
                OSIOAuthenticated : true
            },
            type: ActionTypes.CHECK_OSIO_LOGIN
        }
    } else {
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
        if (result.hasOwnProperty(key) && result[key]) {
            // existsInURL = true
            localStorageCheServers[osioCheURL] = result[key]
            localStorage.setItem('Servers', JSON.stringify(localStorageCheServers))
            return {
                payload : {
                    OSIOAuthenticated : true
                },
                type: ActionTypes.CHECK_OSIO_LOGIN
            }
        }else {
            localStorageCheServers[osioCheURL] = ''
            localStorage.setItem('Servers', JSON.stringify(localStorageCheServers))
        }
        key = 'error'
        if (result[key]) {
            return {
                payload : {
                    OSIOAuthError : result[key],
                    OSIOAuthenticated : false
                },
                type: ActionTypes.OSIO_LOGIN_FAILED
            }
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

/**
 * @remarks {Checks if user is already Logged-In to any other Che Server}
 * @return {payload : {CheAuthenticatedOnce : {boolean}};
 * type : {ActionTypes}}
 */
export function checkCheLogin() {
    const localStorageCheServers : {} = JSON.parse(localStorage.getItem('Servers') || '{}')
    let auths : number = 0
    for (const key in localStorageCheServers) {
        if (key !== osioCheURL && Object.keys(localStorageCheServers).length > 1
        && JSON.stringify(localStorageCheServers[key]) !== '{}') {
            auths++
        }
    }

    if (auths > 0) {
        return {
            payload : {
                CheAuthenticatedOnce : true,
            },
            type: ActionTypes.CHECK_CHE_LOGIN
        }
    } else {
        return {
            payload : {
                CheAuthenticatedOnce : false,
            },
            type: ActionTypes.CHECK_CHE_LOGIN
        }
    }
}

/* Changes to make to login request actions:-
    * Add async workflow to actions
    * check for token validity -> request -> receive -> check for token validity -> repeat
    * If the check is done 3 times then dispatch LOGIN_FAILURE_ACTION else dispatch the LOGIN_SUCCESS_ACTION
*/

/**
 * @remarks {User has requested to Login through OSIO}
 * @return {payload : {OSIOFetching : {boolean}};
 * type : {ActionTypes}}
 */
export function requestOSIOLogin() {
    const redirectUrl = encodeURIComponent(window.location.href);
    // setLocalStorageForCheServer(cheServerURL,body.access_token)
    const authApiUrl = `https://auth.openshift.io/api/`
    const loginUrl = `${authApiUrl}login?redirect=${redirectUrl}`
    window.location.href = loginUrl
    global.console.log(window.location.href)
    return {
        payload : {
            OSIOFetching : true
        },
        type : ActionTypes.OSIO_LOGIN_REQUEST,
    }
}

/**
 * @param {string} cheServerURL
 * @param {string} cheUserName
 * @param {string} chePassword
 */
export function requestCheLogin(cheServerURL : string, cheUserName : string, chePassword : string) {
    return (dispatch : Dispatch) => {
        dispatch(makeRequestCheLogin())
        cheLoginRequest(cheServerURL, cheUserName, chePassword)
    }
}

/**
 * @param {string} cheServerURL
 * @param {string} cheServerAuth
 */
function setLocalStorageForCheServer(cheServerURL : string, cheServerAuth : string) {
    const localStorageServers : {} = JSON.parse(localStorage.getItem('Servers') || '{}')
    if (!localStorage.getItem('Servers') || localStorageServers === {}) {
        localStorage.setItem('Servers', '{}')
    } else if (localStorageServers[cheServerURL] !== cheServerAuth) {
        localStorageServers[cheServerURL] = cheServerAuth
        localStorage.setItem('Servers', JSON.stringify(localStorageServers))
    }
}

/**
 * @param {string} cheServerURL
 * @param {string} cheUserName
 * @param {string} chePassword
 */
export const cheLoginRequest = (cheServerURL : string, cheUserName : string, chePassword : string) => (dispatch : Dispatch) => {
    let keycloakSettings = {}
    const cheClientId = 'che.keycloak.client_id'
    // const cheAuthEndpoint= "che.keycloak.auth_server_url"
    const cheTokenEndpoint = 'che.keycloak.token.endpoint'
    // const cheRealm = "che.keycloak.realm"
    if (cheServerURL) {
        fetch(cheKeycloakSettingsApi(cheServerURL)).then((response) => {
            return response.json()
        }).then((data) => {
            keycloakSettings = data
            if (keycloakSettings) {
                fetch(keycloakSettings[cheTokenEndpoint], {
                    body : 'grant_type=password&client_id=' + keycloakSettings[cheClientId] +
                    '&username=' + cheUserName + '&password=' + chePassword + '',
                    headers: {
                        'Access-Control-Allow-Credentials': 'true',
                        // 'Access-Control-Allow-Origin': '*',
                        'Content-Type': 'application/x-www-form-urlencoded',
                    },
                    method : 'POST',
                }).then((response: any) => {
                    if (response.status === 200) {
                        global.console.log(cheServerURL + ' LOGGED IN !')
                    } else {
                        dispatch(cheLoginValidate(false, cheServerURL))
                    }
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
        }
    })
    }
}

/**
 * @return {type : {ActionTypes}}
 */
function makeRequestCheLogin() {
    return {
        type : ActionTypes.CHE_LOGIN_REQUEST,
    }
}

/**
 * @param {boolean} isAuthenticated
 * @param {string} cheURL
 * @return {payload : {CheAuthenticated : {boolean}, CheUrl : {string}};
 * type : {ActionTypes}}
 */
export function cheLoginValidate(isAuthenticated : boolean, cheURL : string) {
    return {
        payload : {
            CheAuthenticated : isAuthenticated,
            CheURL : cheURL,
        },
        type : ActionTypes.CHE_LOGIN_VALIDATE,
    }
}

export type Action = IOSIOLoginRequestAction | ICheckOSIOLoginAction | ICheckCheLoginAction
                    | ICheLoginRequestAction | ICheLoginValidateAction | IOSIOLoginFailed
