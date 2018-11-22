import * as React from "react";
import "./DashboardComponent.css";
import IDEComponent from "./IDEComponent";
import SidebarComponent from "./SidebarComponent";

import LoginContainer from '../containers/LoginContainer';

// import Server from '../models/Server';


interface IProps { 
    // Sidebar
    PsidebarIsActive : boolean
    PtoggleSidebar : () => void
    // Servers
    PpopulateServers : () => void
    Pservers : {}
    PsetCurrentServer : (server : string) => void
    PcurrentServer : string
    // Workspaces
    PupdateWorkspacesList : (server : string) => void
    // IDE|Login Toggle
    PIDELoginIsActive : boolean
    PtoggleIDELogin : () => void
    // Current
} 

class DashboardComponent extends React.Component<IProps> {

    constructor(props : any ){
        super(props)
    }

    public renderIDEorLogin(){
        if (this.props.PIDELoginIsActive){
            return (
                <LoginContainer />
            )
        }else{
            return (
                <IDEComponent/>
            )
        }
    }

    public render(){
        return (
            <div className="Dashboard">
                <SidebarComponent 
                    // Sidebar
                    PsidebarIsActive={this.props.PsidebarIsActive}
                    PtoggleSidebar={this.props.PtoggleSidebar}

                    // Servers
                    PpopulateServers={this.props.PpopulateServers}
                    Pservers={this.props.Pservers}
                    PsetCurrentServer={this.props.PsetCurrentServer}
                    PcurrentServer = {this.props.PcurrentServer}

                    // Workspaces
                    PupdateWorkspacesList = {this.props.PupdateWorkspacesList}

                    // Toggle IDE -> Login -> IDE -> Login -> ...
                    PtoggleIDELogin={this.props.PtoggleIDELogin}
                />
                {this.renderIDEorLogin()}
            </div>
        )
    }
}

export default DashboardComponent
