import * as React from "react";
import logo from "./eclipse-che.png";
import "./LoginComponent.css";

interface IProps {
    Pauthenticated : boolean,
    PrequestCheLogin : (cheServerURL : string, cheUserName : string, chePassword : string) => void,
    PrequestOSIOLogin : () => void
}

interface IState {
    cheServerURL : string,
    cheUserName : string,
    chePassword : string
}

class LoginComponent extends React.Component<IProps, IState> {

    constructor(props : any){
        super(props)
        this.state = {
            chePassword : "",
            cheServerURL : "",
            cheUserName : "",

        }
        this.handleCheServerURLChange = this.handleCheServerURLChange.bind(this)
        this.handleUsernameChange = this.handleUsernameChange.bind(this)
        this.handlePasswordChange = this.handlePasswordChange.bind(this)

        this.handleSubmit = this.handleSubmit.bind(this)
    }

    public handleCheServerURLChange(event : any){
        this.setState({
            cheServerURL : event.target.value
        })
    }

    public handleUsernameChange(event : any){
        this.setState({
            cheUserName : event.target.value
        })
    }

    public handlePasswordChange(event : any){
        this.setState({
            chePassword : event.target.value
        })
    }


    public handleSubmit(event : any) {
        this.props.PrequestCheLogin("che-eclipse-che.192.168.42.205.nip.io","admin","admin")
        // this.props.PrequestCheLogin(this.state.cheServerURL, this.state.cheUserName, this.state.chePassword)
        event.preventDefault()
    }

    public render(){
        return (
            
            
                <div className="container">
                    <div className="card">  
                        <img className="che-logo" src={logo}/>               
                        <span className="title"> Eclipse Che NC</span>
                        <input type="text" onChange={this.handleCheServerURLChange} className="text-box" placeholder="Che Server URL"/>
                           <input type="text" onChange={this.handleUsernameChange} className="text-box" placeholder="Username or email"/>
                           <input type="password" onChange={this.handlePasswordChange} className="text-box" placeholder="Password"/>
                           
                        <button onClick={this.handleSubmit} className="login">Login</button>
                        <button onClick={this.props.PrequestOSIOLogin} className="osio-login"> OSIO Login </button>
                        
                        {JSON.stringify(this.props.Pauthenticated)}                 
                    
                </div> 
            </div>
        )
    }
}

export default LoginComponent