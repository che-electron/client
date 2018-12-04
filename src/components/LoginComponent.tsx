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
    chePassword : string,
}

class LoginComponent extends React.Component<IProps, IState> {
    private url : string;
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
        this.handleLogin = this.handleLogin.bind(this)
        this.handleOSIO = this.handleOSIO.bind(this)
        this.url="";
    }

    public handleCheServerURLChange(event : any){
        this.url = event.target.value;
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


    public handleOSIO() {

        if(this.url === "che.openshift.io" || this.url === "che.prod-preview.openshift.io")
            {
                this.props.PrequestOSIOLogin();
            }
        else{
            this.setState({
                cheServerURL : this.url
            })
        }
    }

    public handleLogin(event : any){
        // this.props.PrequestCheLogin("che-eclipse-che.192.168.42.205.nip.io","admin","admin")
        this.props.PrequestCheLogin(this.state.cheServerURL, this.state.cheUserName, this.state.chePassword)
        event.preventDefault();
    }

    public render(){

        let loginCredentials;
        if(this.state.cheServerURL === "") {            
            loginCredentials= <div><h3 className="title-connect">Connect to a Che Server </h3>
            <br/><br/><input type="text" onChange={this.handleCheServerURLChange} className="text-box" placeholder="Che Server URL"/>
            <button onClick={this.handleOSIO} className="connect">Connect</button></div>
        }
        else if(this.state.cheServerURL !== "che.openshift.io" && this.state.cheServerURL !== "che.prod-preview.openshift.io" )
        {
            loginCredentials=<div><h3 className="title-connect">Authenticate Yourself</h3>
            <br/><br/><input type="text" onChange={this.handleCheServerURLChange} className="text-box" placeholder="Che Server URL"/><input type="text" onChange={this.handleUsernameChange} className="text-box" placeholder="Username or email"/>
            <input type="password" onChange={this.handlePasswordChange} className="text-box" placeholder="Password"/>
            <button onClick={this.handleLogin} className="login">Login</button>
            </div>
        }
        
        return (
                <div className="container">
                    <div className="card">  
                        <img className="che-logo" src={logo}/>               
                        <span className="title">Eclipse Che NC</span>                        
                        {loginCredentials}
                        {JSON.stringify(this.props.Pauthenticated)}                 
                    </div> 
                </div>
            )
    }
}

export default LoginComponent