import * as React from "react"
import IWorkspace from "../models/Workspace";

interface IProps {
    Pworkspaces : IWorkspace[],
    PsidebarIsActive : boolean,
}

class WorkspacesComponent extends React.Component<IProps,any> {

    public checkSidebar(){
        const style = {
            "border" : "2px solid green",
            "flex" : "0 0 12px",
            "margin" : "10px",
        }
        return style
    }

    public workspaceToCard(wksp : any){
        const style = {
            "margin" : "10px",
            "width" : "100%"
        }
        return (
            <div style={style} className="Workspace" key={wksp.id}>
                Name : {wksp.name},
                ID : {wksp.id},
                URL : {wksp.url},
                Status : {wksp.status}
            </div>
        )
    }

    public render(){
        const style = this.checkSidebar()
        return (
            <div className="WorkspacesList" style={style}>
                {this.props.Pworkspaces.map(this.workspaceToCard)}
            </div>
        )
    }
}

export default WorkspacesComponent;