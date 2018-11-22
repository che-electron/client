import * as React from "react";
import {Icon} from "react-fa"; 
import "./ServersComponent.css";

// import Server from '../models/Server'
import ServerComponent from './ServerComponent';

interface IProps {
    PpopulateServers : () => void,
    Pservers : {}
    PsidebarIsActive : boolean,
    PsetCurrentServer : (server : string) => void,
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
        const servers = []

        for (const key in this.props.Pservers) {
            if (this.props.Pservers.hasOwnProperty(key)) {
                if (this.props.Pservers[key] !== "" || this.props.Pservers !== null ){     
                    servers.push(
                        <ServerComponent server={this.props.Pservers[key]} key={key} PsetCurrentServer={this.props.PsetCurrentServer}/>
                    )
                } 
            }
        }

        return (
            <div className="servers-list">
                {servers}
            </div>
        )
    }

    public render(){

        return (
            <div className="ServersComponent" >
                <h3>Servers</h3>
                {this.renderServers()}
                <button className="add-che-server" onClick={this.props.PtoggleIDELogin}>
                    <Icon name="plus" /> &nbsp;&nbsp;Add Server
                </button>
            </div>
        )  
    }
}

export default ServersComponent;