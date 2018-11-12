import { IState } from '../reducers'

import { connect } from 'react-redux'

import LoginComponent from "../components/LoginComponent"

import { requestCheLogin, requestOSIOLogin, } from '../actions/Login'

import { getOSIOAuthenticated } from '../selectors/Login';



const mapStateToProps = (state: IState) => ({
    POSIOAuthenticated : getOSIOAuthenticated
})

const mapDispatchToProps = {
    PrequestCheLogin : requestCheLogin,
    PrequestOSIOLogin : requestOSIOLogin,
}

export default connect<any,any,any>(mapStateToProps, mapDispatchToProps)(LoginComponent)

 