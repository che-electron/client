import { createSelector } from 'reselect'
import { IState } from '../reducers'

const getLoginState = ((state:IState)=>state.login)

export const getCheAuthenticatedOnce = createSelector([getLoginState], (s:any) => s.CheAuthenticatedOnce)
export const getOSIOAuthenticated = createSelector([getLoginState], (s:any) => s.OSIOAuthenticated)
export const getOSIOFetching = createSelector([getLoginState], (s:any) => s.OSIOFetching)
