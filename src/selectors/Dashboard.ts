import { createSelector } from 'reselect'
import { IState } from '../reducers'

const getDashboardState = ((state:IState)=>state.dashboard)

export const getSidebarIsActive = 
createSelector([getDashboardState], (s:any) => s.sidebarIsActive)
