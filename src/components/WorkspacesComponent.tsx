import * as React from "react";
// import { ContextMenu, ContextMenuTrigger} from "react-contextmenu";
import {Icon} from "react-fa"; 
// import IWorkspace from "../models/Workspace";
import "./WorkspacesComponent.css";
// import WorkspaceStatusComponent from "./WorkspaceStatusComponent";

interface IProps {
    // Pworkspaces : IWorkspace[],
    PsidebarIsActive : boolean,
}

class WorkspacesComponent extends React.Component<IProps> {

    constructor(props : any){
        super(props);
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
        
        return (
            /* <div className="workspaces-list" >
                <h2>Workspaces</h2>
                <button className="create-workspace"><Icon name="plus"/>&nbsp;&nbsp;Create Workspace</button>
                {this.props.Pworkspaces.map(this.displayWorkspaces)}
            </div>*/
            <div className="workspaces-list" >
                <h3>Workspaces</h3>
<button className="create-workspace"><Icon name="plus"/>&nbsp;&nbsp;Create Workspace</button>
            </div>
        )
    }
}

export default WorkspacesComponent;