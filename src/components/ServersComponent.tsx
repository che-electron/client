import * as React from "react";
import {Icon} from "react-fa"; 
import "./ServersComponent.css";

import Server from '../models/Server'

import { Button } from 'reactstrap'

interface IProps {
    PpopulateServers : () => void,
    Pservers : Server[]
    PsidebarIsActive : boolean,
    PtoggleIDELogin : () => void,
}

class ServersComponent extends React.Component<IProps> {

    constructor(props : IProps){
        super(props)
    }

    public componentWillMount(){
        this.props.PpopulateServers()
    }

    public renderServers(){

        const servers = this.props.Pservers.map((server) => {
            return (
                <Button className="server-name" key={server.url}>
                   <span>{server.url}</span>
                </Button>
            )
        })

        return (
            <div>
                {servers}
            </div>
        )
    }

    public render(){

        return (
            <div className="ServersComponent" >
                <h3>Servers</h3>
                <button className="add-che-server" onClick={this.props.PtoggleIDELogin}><Icon name="plus"/>&nbsp;&nbsp;Add Server</button>
                <div className="servers-list">
                    {this.renderServers()}
                </div>
            </div>
        )
        
    }
}

export default ServersComponent;