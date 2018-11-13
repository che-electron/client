import * as React from "react"

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
        this.props.PrequestCheLogin("che-eclipse-che.router.default.svc.cluster.local","admin","admin")
        //  this.props.PrequestCheLogin(this.state.cheServerURL, this.state.cheUserName, this.state.chePassword)
        event.preventDefault()
    }

    public render(){
        return (
            <div>
                <div>
                    <button onClick={this.props.PrequestOSIOLogin}> OSIO Login </button>
                    {JSON.stringify(this.props.Pauthenticated)}
                </div>
                <div>
                <form onSubmit={this.handleSubmit}>
                    <label>
                        Che Server URL : 
                        <input type="text" onChange={this.handleCheServerURLChange} />
                        Username :
                        <input type="text" onChange={this.handleUsernameChange} />
                        Password :
                        <input type="password" onChange={this.handlePasswordChange} />
                    </label>
                    <input type="submit" value="Login" />
                </form>
                </div>
            </div>
        )
    }
}

export default LoginComponent