import { createSelector } from 'reselect'
import { IState } from '../reducers'

const getSidebarState = ((state:IState)=>state.sidebar)

export const getSidebarIsActive = createSelector([getSidebarState], (s:any) => s.sidebarIsActive)
export const getWorkspaces = createSelector([getSidebarState], (s:any) => s.workspaces)
export const getWkspsIsFetching = createSelector([getSidebarState], (s:any) => s.wkspsIsFetching)