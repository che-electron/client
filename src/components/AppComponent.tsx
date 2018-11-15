import * as React from 'react'

import LoginContainer from '../containers/LoginContainer' 

import DashboardContainer from '../containers/DashboardContainer' 

interface IProps {
    PcheckCheLogin : () => void,
    PcheckOSIOLogin : () => void,
    POSIOAuthenticated : boolean,
    PCheAuthenticatedOnce : boolean
}

class Appcomponent extends React.Component<IProps> {

    constructor(props: IProps){
        super(props)
    }

    public componentWillMount(){
        this.props.PcheckOSIOLogin()
        this.props.PcheckCheLogin()
    }

    public renderLogin(){
        return (
            <LoginContainer />
        )
    }

    public renderDashboard(){
        return (
            <DashboardContainer />
        )
    }

    public render() {
        if (this.props.POSIOAuthenticated || this.props.PCheAuthenticatedOnce){
            return this.renderDashboard()
        }else{
            return this.renderLogin()
        }
    }
}

export default Appcomponent