import * as React from 'react';
// import { ContextMenu, ContextMenuTrigger} from "react-contextmenu";
import { Icon } from 'react-fa';
// import IWorkspace from "../models/Workspace";
import './WorkspaceComponent.css';

import WorkspaceComponent from './WorkspaceComponent';

interface IProps {
    // Pworkspaces : IWorkspace[],
    PcurrentServer : string,
    Pservers : {},
    PsetCurrentWorkspace : (workspaceID : string) => void,
}

interface IState {
    workspacesPerServers : {}
}

class WorkspacesComponent extends React.Component<IProps, IState> {

    constructor(props : any) {
        super(props);
        this.state = {
            workspacesPerServers : {}
        }
    }

    public renderWorkspaces() {
        const workpsaceComponentsPerServer = {}

        for (const key in this.props.Pservers) {
            if (this.props.Pservers.hasOwnProperty(key) && this.props.Pservers[key]) {
                const workspaceComponents = []
                if (this.props.Pservers.hasOwnProperty(this.props.PcurrentServer) &&
                this.props.Pservers[this.props.PcurrentServer]) {
                    for (const workspace in this.props.Pservers[this.props.PcurrentServer].workspaces) {
                        if (workspace) {
                            workspaceComponents.push(
                                <WorkspaceComponent
                                    PcurrentServer={this.props.PcurrentServer}
                                    PworkspaceInfo={this.props.Pservers[this.props.PcurrentServer].workspaces[workspace]}
                                    PsetCurrentWorkspace = {this.props.PsetCurrentWorkspace}
                                    key=""
                                />)
                            }
                        }
                workpsaceComponentsPerServer[key] = workspaceComponents
                // if (this.props.Pservers[key] !== "" && this.props.Pservers !== null ){
                //     workpsaceComponentsPerServer.push(
                //     )
                // }
            }
        }
    }
        return workpsaceComponentsPerServer
    }

    // public displayWorkspaces(wksp : IWorkspace){
    //     let showIcon;
    //     if(wksp.status === 'STOPPED'){
    //         showIcon =<i className="workspace-status-stopped"/>;
    //     }else if(wksp.status === 'RUNNING'){
    //         showIcon=<i className="workspace-status-running"/>
    //     }else if(wksp.status === 'ERROR'){
    //         showIcon=<i className="workspace-status-error"/>
    //     }else if(wksp.status === 'STOPPING' || wksp.status === 'STARTING'){
    //         showIcon=<i className="workspace-status-spinner">
    // <div className="workspace-status-spinner"><div className="rect1" />
    // <div className="rect2"/><div className="rect3"/></div></i>
    //     }
    //     return (
    //         <div className="workspace-bm-menu" key={wksp.id} >
    //         <nav className="bm-item-list" >
    //         <ContextMenuTrigger id="my_menu">
    //         <button className="bm-item" contextMenu="mymenu" >
    //         {showIcon} &nbsp;
    //         <span>{wksp.name}</span>
    //         </button>
    //         </ContextMenuTrigger>
    //         <ContextMenu id="my_menu">
    //         <WorkspaceStatusComponent PworkspaceId={wksp.id} PworkspaceStatus={wksp.status} />
    //         </ContextMenu>
    //        </nav>
    //        </div>
    //     )
    // }

    public render() {
        return (
            <div className="workspaces-list" >
                <button className="create-workspace"><Icon name="plus" />&nbsp;&nbsp;Create Workspace</button>
                {this.renderWorkspaces()[this.props.PcurrentServer]}
            </div>
        )
    }
}

export default WorkspacesComponent;
