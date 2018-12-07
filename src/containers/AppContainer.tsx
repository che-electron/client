import { checkCheLogin, checkOSIOLogin } from '../actions/Login'

import { getCheAuthenticatedOnce, getOSIOAuthenticated } from '../selectors/Login';

import { IState } from '../reducers'

import { connect } from 'react-redux'

import AppComponent from "../components/AppComponent"

const mapStateToProps = (state: IState) => ({
  PCheAuthenticatedOnce : getCheAuthenticatedOnce(state),
  POSIOAuthenticated : getOSIOAuthenticated(state),
})

const mapDispatchToProps = {
  PcheckCheLogin : checkCheLogin,
  PcheckOSIOLogin : checkOSIOLogin,
}

export default connect<any,any,any>(mapStateToProps, mapDispatchToProps)(AppComponent)
