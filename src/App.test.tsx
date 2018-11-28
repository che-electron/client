import * as Action from './actions/Login';

// import * as moxios from 'moxios';

import * as React from 'react';

import * as ReactDOM from 'react-dom';

import {Provider} from 'react-redux';

import store from './store';

// import {ActionTypes}  from './actions/Dashboard';

import {ActionTypes}  from './actions/Login';

import AppContainer from './containers/AppContainer';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Provider store={store} ><AppContainer /></Provider>, div);
  ReactDOM.unmountComponentAtNode(div);
});

describe('Login Actions', () => {

 /* beforeEach(() => {
    moxios.install();
  });

  afterEach(() => {
    moxios.uninstall();
  }); */
  
  // Login Actions
  
  it('Logging in to OSIO for the first time', () => {
    const expectedAction = {
        type: ActionTypes.OSIO_LOGIN_REQUEST,
      }
     expect(Action.requestOSIOLogin().type).toEqual(expectedAction.type)
  })

 it('Checks if user is logged in through OSIO', () => {
    const expectedAction = {
      type: ActionTypes.CHECK_OSIO_LOGIN
    }
    expect(Action.checkOSIOLogin().type).toEqual(expectedAction.type)
  })

  it('Checks if user is logged in through any other Che Server', () => {
    const expectedAction = {
      type: ActionTypes.CHECK_CHE_LOGIN,
    }
    expect(Action.checkCheLogin().type).toEqual(expectedAction.type)
  })

})

describe('Dashboard Actions', () => {

  /* it('User is trying to Log in to any che server for the first time', () => {
    const expectedAction = {
      type: ActionTypes.CHE_LOGIN_REQUEST,
    }
    expect(Action.makeRequestCheLogin().type).toEqual(expectedAction.type)
  })

  it('Validating Che server Login', () => {
    const isAuthenticated = true
    const cheUrl = "che.openshift.io"
    const expectedAction = {
      type: ActionTypes.CHE_LOGIN_VALIDATE,
    }
    expect(Action.cheLoginValidate(isAuthenticated,cheUrl).type).toEqual(expectedAction.type)
  })

	//Dashboard Actions

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
    expect(Action.setCurrentServer().type).toEqual(expectedAction.type)
  }) */

})

