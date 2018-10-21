import {  checkLogin } from '../actions/Login'

import { getAuthenticated } from '../selectors/Login';

import { IState } from '../reducers'

import { connect } from 'react-redux'

import AppComponent from "../components/AppComponent"


const mapStateToProps = (state: IState) => ({
  Pauthenticated : getAuthenticated(state),
})

const mapDispatchToProps = {
  PcheckLogin : checkLogin
}

export default connect<any,any,any>(mapStateToProps, mapDispatchToProps)(AppComponent)
