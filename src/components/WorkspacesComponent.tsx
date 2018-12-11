import * as React from 'react';
// import { ContextMenu, ContextMenuTrigger} from "react-contextmenu";
import { Icon } from 'react-fa';
// import IWorkspace from "../models/Workspace";
import './WorkspacesComponent.css';

import WorkspaceComponent from './WorkspaceComponent';

interface IProps {
    // Pworkspaces : IWorkspace[],
    PcurrentServer : string,
    PupdateWorkspacesList : (server : string) => void,
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
        this.handleUpdateWorkspacesList = this.handleUpdateWorkspacesList.bind(this)
    }

    public componentDidMount() {
        this.props.PupdateWorkspacesList(this.props.PcurrentServer)
    }

    public handleUpdateWorkspacesList() {
        this.props.PupdateWorkspacesList(this.props.PcurrentServer)
    }

    /* public checkServer() {
        if (this.props.PcurrentServer === ""){
            return <h5> Please choose a Server </h5>
        }else{
            return <div />
        }
    } */

    public renderWorkspaces() {
        const workpsaceComponentsPerServer = {}

        for (const key in this.props.Pservers) {
            if (this.props.Pservers.hasOwnProperty(key)) {
                const workspaceComponents = []
                if (this.props.Pservers[this.props.PcurrentServer] !== undefined &&
                    this.props.Pservers[this.props.PcurrentServer] !== undefined) {
                    for (const workspace in this.props.Pservers[this.props.PcurrentServer].workspaces) {
                        if (workspace !== null) {
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
                <h4>Workspaces</h4>
                {this.renderWorkspaces()[this.props.PcurrentServer]}
                <button className="create-workspace"><Icon name="plus" />&nbsp;&nbsp;Create Workspace</button>
            </div>
        )
    }
}

export default WorkspacesComponent;
