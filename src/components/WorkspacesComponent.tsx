import * as React from "react";
import IWorkspace from "../models/Workspace";
import "./WorkspacesComponent.css";


interface IProps {
    Pworkspaces : IWorkspace[],
    PsidebarIsActive : boolean,
}

class WorkspacesComponent extends React.Component<IProps,any> {

    constructor(props : any){
        super(props);
    }

    public workspaceToCard(wksp : any){
        const style = {
            "height": "100%" , 
        }
        const style1={
            "background-color" : "" ,
            "height" : "100%",
            "margin" : "10px 0",            
            "padding": "5px",
            "text-align" : "left",
            "width" : "100%",            
        }

        const style2={
            "margin" : "5px",            
        }
        
        return (  
            <div className="Workspace bm-menu" key={wksp.id} style={style}>
            <nav className="bm-item-list" >
            <button className="bm-item" style={style1}>
            <i className={ (wksp.status === 'STOPPED' || wksp.status === 'STOPPING')? "red-stopped":"green-running"}/>
            <span style={style2}>{wksp.name}</span>
            </button>
           </nav>
           </div>
        )
    }

    public render(){
        
        const style = {
            "flex" : "0 0 12px",
            "margin" : "10px",
        }
        return (
            <div className="WorkspacesList" style={style}>
            <h2><strong>Workspaces</strong></h2>
                {this.props.Pworkspaces.map(this.workspaceToCard)}
            </div>
        )
    }
}

export default WorkspacesComponent;