import {ActionTypes}  from '../actions/Dashboard';

import * as Action from '../actions/Dashboard';

describe('Dashboard Actions', () => {

// Dashboard Actions

it('Collapses or Expands the Sidebar', () => {
    
    const expectedAction = {
    type: ActionTypes.TOGGLE_SIDEBAR,
    }
    expect(Action.toggleSidebar().type).toEqual(expectedAction.type)
})

it('User is trying to add a che server', () => {
    
    const expectedAction = {
    type: ActionTypes.TOGGLE_IDE_LOGIN,
    }
    expect(Action.toggleIDELogin().type).toEqual(expectedAction.type)
})

it('lists down all the authenticated servers on the Sidebar', () => {
    
    const expectedAction = {
    type: ActionTypes.POPULATE_SERVERS,
    }
    expect(Action.populateServers().type).toEqual(expectedAction.type)
})

it('sets the selected server as the current server', () => {
    
    const expectedAction = {
    type: ActionTypes.SET_CURRENT_SERVER,
    }
    expect(Action.setCurrentServer("che.openshift.io").type).toEqual(expectedAction.type)
})

})

