import * as React from 'react';
import LoginContainer from '../containers/LoginContainer';
import './DashboardComponent.css';
import IDEComponent from './IDEComponent';
import SidebarComponent from './SidebarComponent';

// import Server from '../models/Server';

interface IProps {
    // Sidebar
    PsidebarIsActive : boolean
    PtoggleSidebar : () => void
    // Servers
    PpopulateServers : () => void
    Pservers : {}
    PcurrentServer : string
    PsetCurrentServer : (server : string) => void
    PcurrentWorkspacePerserver : {}
    // Workspaces
    PupdateWorkspacesList : (server : string) => void
    PsetCurrentWorkspace : (workspaceID : string) => void
    // IDE|Login Toggle
    PIDELoginIsActive : boolean
    PtoggleIDELogin : () => void
}

class DashboardComponent extends React.Component<IProps> {

    constructor(props : any) {
        super(props)
    }

    public renderIDEorLogin() {
        if (this.props.PIDELoginIsActive) {
            return (
                <LoginContainer />
            )
        } else {
            return (
                <IDEComponent
                    Pservers = {this.props.Pservers}
                    PcurrentServer={this.props.PcurrentServer}
                    PcurrentWorkspacePerServer={this.props.PcurrentWorkspacePerserver}
                />
            )
        }
    }

    public render() {
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
                    PsetCurrentWorkspace = {this.props.PsetCurrentWorkspace}

                    // Toggle IDE -> Login -> IDE -> Login -> ...
                    PtoggleIDELogin={this.props.PtoggleIDELogin}
                />
                {this.renderIDEorLogin()}
            </div>
        )
    }
}

export default DashboardComponent
