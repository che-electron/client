import { Action, ActionTypes } from '../actions/Login';

// import {getPassword, setPassword} from 'keytar'

export interface IState {
    fetching : boolean,
    authenticated : boolean,
}

export const initialState : IState = {
    authenticated : false,
    fetching : false,
}

export function reducer(state: IState = initialState, action: Action){
    switch(action.type){
        case ActionTypes.CHECK_LOGIN: {
            let existsInURL : boolean
            // const tokenFromKeytar = getPassword("OSIO","Che")
            const tokenFromLocalStorage = localStorage.getItem("OSIOAuthToken")

            if (tokenFromLocalStorage){
                return {
                    ...state,
                    authenticated : true
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

                let key = 'access_token'
                // tslint:disable-next-line:no-debugger
                // debugger;
                if(result[key]){
                    localStorage.setItem("OSIOAuthToken",result[key])
                    existsInURL = true
                    return {
                        ...state,
                        authenticated : true, 
                    }
                }
                key = "error"
                if(result[key]){
                    return {
                        ...state,
                        authError : result[key],
                        authenticated : false
                    }   
                }
                existsInURL = false
            }

            if (tokenFromLocalStorage === null && !existsInURL){
                return {
                    ...state,
                    authenticated : false
                }
            }

        }

        case ActionTypes.OSIO_LOGIN_REQUEST: {
            const redirectUrl = encodeURIComponent(window.location.href);
            const authApiUrl = `https://auth.openshift.io/api/`
            const loginUrl = `${authApiUrl}login?redirect=${redirectUrl}`
            window.location.href = loginUrl
            return {
                ...state,
                fetching : true
            }
        }

        default:{
            return state
        }
    }
}