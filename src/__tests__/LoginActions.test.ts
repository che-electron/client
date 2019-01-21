import { ActionTypes } from '../actions/Login';

import * as Action from '../actions/Login';

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
