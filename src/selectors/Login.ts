import { createSelector } from 'reselect'
import { IState } from '../reducers'

const getLoginState = ((state:IState)=>state.login)

export const getAuthenticated = createSelector([getLoginState], (s:any) => s.authenticated)
export const getFetching = createSelector([getLoginState], (s:any) => s.fetching)
export const getLoginRequired = createSelector([getLoginState],(s:any) => s.loginRequired) 