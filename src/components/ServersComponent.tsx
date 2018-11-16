import * as React from "react";
import "./ServersComponent.css";

interface IProps {
    PsidebarIsActive : boolean,
    PtoggleIDELogin : () => void
}

class ServersComponent extends React.Component<IProps> {

    constructor(props : any){
        super(props)
    }

    public renderServers(){

        const style = {
            "border" : "1px solid green",
            "margin" : "10px",         
        }

        return (
            <div className="servers-list" style={style}>
                Servers
                <div className="add-server-button">
                    <button onClick={this.props.PtoggleIDELogin}> + </button>
                </div>
            </div>
        )
    }

    public render(){

        return this.renderServers()
        
    }
}

export default ServersComponent;