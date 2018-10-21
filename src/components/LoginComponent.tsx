import * as React from "react"

interface IProps {
    Pauthenticated : boolean,
    PrequestLogin : () => void
}

class LoginComponent extends React.Component<IProps, any> {

    constructor(props : any){
        super(props)
    }

    public render(){
        
        return (
            <div>
                <button onClick={this.props.PrequestLogin}> Login </button>
                {JSON.stringify(this.props.Pauthenticated)}
            </div>
        )
    }
}

export default LoginComponent