import { ActionTypes } from '../actions/Dashboard';

import * as Reducer from '../reducers/Dashboard';

describe('Dashboard Reducers', () => {
    const initialState = {
        IDELoginIsActive : false,
        currentServer : '',
        currentWorkspacePerServer : {},
        servers : {},
        sidebarIsActive : false
    }

    it('it should check if Sidebar is Active', () => {
        expect(
          Reducer.dashboardReducer(initialState, {
            type : ActionTypes.TOGGLE_SIDEBAR
            })).toEqual({
                IDELoginIsActive : false,
                currentServer : '',
                currentWorkspacePerServer : {},
                servers : {},
                sidebarIsActive : true
          })
      })

    it('it should check if Che Login is requested', () => {
        expect(
            Reducer.dashboardReducer(initialState, {
            type : ActionTypes.TOGGLE_IDE_LOGIN
            })).toEqual({
                IDELoginIsActive : true,
                currentServer : '',
                currentWorkspacePerServer : {},
                servers : {},
                sidebarIsActive : false
            }
        )
    })

    it('it should populate servers', () => {
        expect(
            Reducer.dashboardReducer(initialState, {
                payload : {
                    servers : [],
                },
            type : ActionTypes.POPULATE_SERVERS
            })).toEqual({
                IDELoginIsActive : false,
                currentServer : '',
                currentWorkspacePerServer : {},
                servers : [],
                sidebarIsActive : false
            }
        )
    })

    it('it should set the current server', () => {
        expect(
            Reducer.dashboardReducer(initialState, {
                payload : {
                    currentServer : 'che.openshift.io'
                },
                type : ActionTypes.SET_CURRENT_SERVER
            })).toEqual({
                IDELoginIsActive : false,
                currentServer : 'che.openshift.io',
                currentWorkspacePerServer : {},
                servers : {},
                sidebarIsActive : false
            })
        }
    )

    it('it should set current workspace per server', () => {
        initialState.currentServer = 'che.openshift.io'
        expect(
            Reducer.dashboardReducer(initialState, {
                payload : {
                    workspace : 'java-workspace'
                },
                type : ActionTypes.SET_CURRENT_WORKSPACEPERSERVER
            })).toEqual({
                IDELoginIsActive : false,
                currentServer : 'che.openshift.io',
                currentWorkspacePerServer : { 'che.openshift.io' : 'java-workspace' },
                servers : {},
                sidebarIsActive : false
            })
        }
    )

    it('it should request for workspaces', () => {
        initialState.servers = { 'che.openshift.io' : '' }
        expect(
            Reducer.dashboardReducer(initialState, {
                payload : {
                    fetchingWorkspaces : true,
                    server : 'che.openshift.io'
                },
                type : ActionTypes.REQUEST_WORKSPACES
            })).toEqual({
                IDELoginIsActive : false,
                currentServer : 'che.openshift.io',
                currentWorkspacePerServer : {},
                servers : { 'che.openshift.io' : { fetchingWorkspaces : true }},
                sidebarIsActive : false
            })
        }
    )

    it('it should receive workspaces', () => {
        initialState.currentServer = 'che-eclipse-che-128.90.56.1'
        initialState.servers = { 'che-eclipse-che-128.90.56.1' : '' }
        expect(
           Reducer.dashboardReducer(initialState, {
            payload : {
                fetchingWorkspaces : true,
                server : 'che-eclipse-che-128.90.56.1',
                workspaces : []
            },
            type : ActionTypes.RECEIVE_WORKSPACES
           })).toEqual({
                IDELoginIsActive : false,
                currentServer : 'che-eclipse-che-128.90.56.1',
                currentWorkspacePerServer : {},
                servers : { 'che-eclipse-che-128.90.56.1' : { fetchingWorkspaces : true, workspaces : []}},
                sidebarIsActive : false
           })
        }
    )

    it('it should fail to request for workspaces', () => {
        expect(
            Reducer.dashboardReducer(initialState, {
                payload : {
                    error : 'cannot fetch workspaces',
                    fetchingWorkspaces : false,
                    server : 'che-eclipse-che-128.90.56.1'
                },
                type : ActionTypes.REQUEST_WORKSPACES_FAILED
            })).toEqual({
                IDELoginIsActive : false,
                currentServer : 'che-eclipse-che-128.90.56.1',
                currentWorkspacePerServer : {},
                servers : { 'che-eclipse-che-128.90.56.1' : { fetchError : 'cannot fetch workspaces', fetchingWorkspaces : false }},
                sidebarIsActive : false
            })
        }
    )
})
