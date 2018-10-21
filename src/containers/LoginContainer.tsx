import { IState } from '../reducers'

import { connect } from 'react-redux'

import LoginComponent from "../components/LoginComponent"

import { requestLogin } from '../actions/Login'

import { getAuthenticated } from '../selectors/Login';



const mapStateToProps = (state: IState) => ({
    Pauthenticated : getAuthenticated
})

const mapDispatchToProps = {
    PrequestLogin : requestLogin
}

export default connect<any,any,any>(mapStateToProps, mapDispatchToProps)(LoginComponent)

 