import * as React from "react";
import {Icon} from "react-fa"; 
import "./ServersComponent.css";

// import Server from '../models/Server'
import ServerComponent from './ServerComponent';

interface IProps {
    PpopulateServers : () => void,
    Pservers : {},
    PsidebarIsActive : boolean,
    PsetCurrentServer : (server : string) => void,
    PtoggleIDELogin : () => void,
    PcurrentServer : string,
    PupdateWorkspacesList : (server : string) => void,
    PsetCurrentWorkspace : (workspace : string) => void,

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
        if(this.props.Pservers !== null)
        {
            for (const key in this.props.Pservers) {
            if (this.props.Pservers.hasOwnProperty(key) && this.props.Pservers[key] !== "") {
                servers.push(
                    <ServerComponent PsetCurrentWorkspace ={ this.props.PsetCurrentWorkspace} Pservers={this.props.Pservers} server={this.props.Pservers[key]} key={key} PsetCurrentServer={this.props.PsetCurrentServer} PcurrentServer = {this.props.PcurrentServer}
                    PupdateWorkspacesList = {this.props.PupdateWorkspacesList}/>
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
            <div className="servers-component" >
                <h3>Servers</h3>
                <button className="add-che-server" onClick={this.props.PtoggleIDELogin}>
                    <Icon name="plus" />&nbsp;&nbsp;Add Server
                </button>
                {this.renderServers()}
            </div>
        )  
    }
}

export default ServersComponent;