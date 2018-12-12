import { createSelector } from 'reselect'
import { IState } from '../reducers'

const getDashboardState = ((state : IState) => state.dashboard)

export const getSidebarIsActive = createSelector([getDashboardState], (s : any) => s.sidebarIsActive)
export const getIDELoginIsActive = createSelector([getDashboardState], (s : any) => s.IDELoginIsActive)
export const getServers = createSelector([getDashboardState], (s : any) => s.servers)
export const getCurrentServer = createSelector([getDashboardState], (s : any) => s.currentServer)
export const getCurrentWorkspacePerServer = createSelector([getDashboardState], (s : any) => s.servers)
