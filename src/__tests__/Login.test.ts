import { ActionTypes } from '../actions/Login';

import * as Action from '../actions/Login';

// import configureMockStore from 'redux-mock-store';

// import thunk from 'redux-thunk';

import * as Reducer from '../reducers/Login';

// import fetch from '../__mocks__/MockFetch';

// import { mockDataSuccess } from '../__mocks__/MockData';

// const middlewares = [thunk];

// const mockStore= configureMockStore(middlewares);

describe('Login Actions', () => {

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

describe('Login Reducers', () => {

  const initialState = {
    CheAuthenticatedOnce : false,
    CheServersLogin : {},
    OSIOAuthError : '',
    OSIOAuthenticated : false,
    OSIOFetching : false,
  }
  it('it should check OSIO Login', () => {
    expect(
      Reducer.loginReducer(initialState, {
        payload : {
          OSIOAuthenticated : true,
        },
        type : ActionTypes.CHECK_OSIO_LOGIN
        })).toEqual({
          CheAuthenticatedOnce: false,
          CheServersLogin: {},
          OSIOAuthError: '',
          OSIOAuthenticated: true,
          OSIOFetching: false
      })
  })

  it('it should request for OSIO Login', () => {
    expect(
      Reducer.loginReducer(initialState, {
        payload : {
          OSIOFetching : true,
        },
        type : ActionTypes.OSIO_LOGIN_REQUEST
        })).toEqual({
          CheAuthenticatedOnce: false,
          CheServersLogin: {},
          OSIOAuthError: '',
          OSIOAuthenticated: false,
          OSIOFetching: true
      })
    })

  it('it should check if Che server is authenticated', () => {
    expect(
      Reducer.loginReducer(initialState, {
        payload : {
          CheAuthenticatedOnce : true,
        },
        type : ActionTypes.CHECK_CHE_LOGIN
        })).toEqual({
          CheAuthenticatedOnce: true,
          CheServersLogin: {},
          OSIOAuthError: '',
          OSIOAuthenticated: false,
          OSIOFetching: false
      })
  })

  it('it should validate Che Login', () => {
    expect(
      Reducer.loginReducer(initialState, {
        payload : {
          CheAuthenticated : true,
          CheURL : 'che-eclipse-che.192.168.42.117.nip.io'
        },
        type : ActionTypes.CHE_LOGIN_VALIDATE
        })).toEqual({
          CheAuthenticatedOnce: false,
          CheServersLogin: { 'che-eclipse-che.192.168.42.117.nip.io' : { 'authenticated' : true }},
          OSIOAuthError: '',
          OSIOAuthenticated: false,
          OSIOFetching: false
      })
  })

  it('it should check if the auth token is valid', () => {
    expect(
      Reducer.loginReducer(initialState, {
        payload : {
          OSIOAuthError : 'uiyiyiyiyuhkjshkhkhdkhkjshkjsdfkjsdkjgfkjdsgfkjsgdjfkjhlklkl',
          OSIOAuthenticated : false
        },
        type: ActionTypes.OSIO_LOGIN_FAILED
        })).toEqual({
          CheAuthenticatedOnce: false,
          CheServersLogin: {},
          OSIOAuthError: 'uiyiyiyiyuhkjshkhkhdkhkjshkjsdfkjsdkjgfkjdsgfkjsgdjfkjhlklkl',
          OSIOAuthenticated: false,
          OSIOFetching: false
      })
    })
})
