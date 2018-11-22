import * as React from "react";
// import { ContextMenu, ContextMenuTrigger} from "react-contextmenu";
import {Icon} from "react-fa"; 
// import IWorkspace from "../models/Workspace";
import "./WorkspacesComponent.css";
// import WorkspaceStatusComponent from "./WorkspaceStatusComponent";

interface IProps {
    // Pworkspaces : IWorkspace[],
    PsidebarIsActive : boolean,
    PcurrentServer : string,
    PupdateWorkspacesList : (server : string) => void,
}

interface IState {
    workspacesPerServers : {}
}

class WorkspacesComponent extends React.Component<IProps,IState> {

    constructor(props : any){
        super(props);
        this.state = {
            workspacesPerServers : {}
        }
        this.handleUpdateWorkspacesList = this.handleUpdateWorkspacesList.bind(this)
    }

    public componentDidMount(){
        this.props.PupdateWorkspacesList(this.props.PcurrentServer)
    }

    public handleUpdateWorkspacesList(){
        this.props.PupdateWorkspacesList(this.props.PcurrentServer)
    }

    public checkServer() {
        if (this.props.PcurrentServer === ""){
            return <h5> Please choose a Server </h5>
        }else{
            return <div />
        }
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
    //         showIcon=<i className="workspace-status-spinner"><div className="workspace-status-spinner"><div className="rect1" /><div className="rect2"/><div className="rect3"/></div></i>
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

    public render(){
        global.console.log(this.props.PcurrentServer)
        return (
            /* <div className="workspaces-list" >
                <h2>Workspaces</h2>
                <button className="create-workspace"><Icon name="plus"/>&nbsp;&nbsp;Create Workspace</button>
                {this.props.Pworkspaces.map(this.displayWorkspaces)}
            </div>*/
            <div className="workspaces-list" >
                <h3>Workspaces</h3>
                {this.checkServer()}
                <button className="create-workspace"><Icon name="plus"/>&nbsp;&nbsp;Create Workspace</button>
                <button className="update-workspaces-list" onClick={this.handleUpdateWorkspacesList}><Icon name="spinner"/>&nbsp;&nbsp;Update</button>
            </div>
        )
    }
}

export default WorkspacesComponent;