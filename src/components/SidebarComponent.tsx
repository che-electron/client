import * as React from 'react';
// import IWorkspace from "../models/Workspace";
import ServersComponent from './ServersComponent';
import './SidebarComponent.css';
// import WorkspacesComponent from "./WorkspacesComponent";

// import Server from '../models/Server'

interface IProps {

    // Sidebar
    PsidebarIsActive : boolean,
    PtoggleSidebar : () => void,

    // Servers
    PpopulateServers : () => void,
    Pservers : {}
    PsetCurrentServer : (server : string) => void
    PcurrentServer : string

    // Workspaces
    PupdateWorkspacesList : (server : string) => void
    PsetCurrentWorkspace : (workspace : string) => void

    // Toggle IDE -> Login -> IDE -> Login ...
    PtoggleIDELogin : () => void
}

interface IState{
    collapsed: boolean,
}

class SidebarComponent extends React.Component<IProps, IState> {

    constructor(props : IProps) {
        super(props)
        this.isOpen = this.isOpen.bind(this);
    }

    // public componentWillMount(){
    //     if (this.props.Pworkspaces.length < 1){
    //         this.props.PfetchWorkspaces()
    //     }
    // }

    public checkSidebar() {
        const style = {
            'display' : 'flex',
            'height' : '960px',
            'width' : '11%',
        }
        if (!this.props.PsidebarIsActive) {
            style.width = '3%'
        }
        return style
    }

    public renderContent() {
        if (this.props.PsidebarIsActive) {
            const componentstyle = {
                'height' : '960px',
                'width' : '11%',
            }
            return(
                <div style={componentstyle} className="server-sidebar">
                    <div>
                        <ServersComponent
                            PsetCurrentWorkspace ={this.props.PsetCurrentWorkspace}
                            PsidebarIsActive={this.props.PsidebarIsActive}
                            PtoggleIDELogin={this.props.PtoggleIDELogin}
                            PpopulateServers = {this.props.PpopulateServers}
                            PsetCurrentServer = {this.props.PsetCurrentServer}
                            Pservers={this.props.Pservers}
                            PcurrentServer = {this.props.PcurrentServer}
                            PupdateWorkspacesList = {this.props.PupdateWorkspacesList}
                        />
                    </div>
                </div>
            )
        } else {
            return <div />
        }
    }

    public isOpen() {
        const button = (!this.props.PsidebarIsActive) ? (<span className="double-right-pointing-angle">&#187;</span>)
        : (<span className="double-left-pointing-angle">&#171;</span>);
        return button;
    }

    public render() {

         const componentstyle = this.checkSidebar();

        return (
            <div className="sidebar-component" style={componentstyle}>
                <button className="toggle-sidebar" onClick={this.props.PtoggleSidebar}>
                    {this.isOpen()}
                </button>
                {this.renderContent()}
            </div>
        )
    }
}

export default SidebarComponent
