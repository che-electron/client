import * as React from 'react'

import LoginContainer from '../containers/LoginContainer' 

import DashboardContainer from '../containers/DashboardContainer' 

interface IProps {
    PcheckLogin : () => void,
    Pauthenticated : boolean
}

class Appcomponent extends React.Component<IProps> {

    constructor(props: IProps){
        super(props)
    }

    public componentWillMount(){
        this.props.PcheckLogin()
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
        if (this.props.Pauthenticated){
            return this.renderDashboard()
        }else{
            return this.renderLogin()
        }
    }
}

export default Appcomponent