import * as React from "react";
import {Icon} from "react-fa"; 
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


        return (
            <div className="servers-list" >
                <h3>Che Servers</h3>
                <button className="add-che-server" onClick={this.props.PtoggleIDELogin}><Icon name="plus"/>&nbsp;&nbsp;Add Server</button>
            </div>
        )
    }

    public render(){

        return this.renderServers()
        
    }
}

export default ServersComponent;