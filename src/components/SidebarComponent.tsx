import * as React from "react";
import IWorkspace from "../models/Workspace";
import ServersComponent from "./ServersComponent";
import "./SidebarComponent.css";
import WorkspacesComponent from "./WorkspacesComponent";

interface IProps {
    PfetchWorkspaces : () => void,
    PsidebarIsActive : boolean,
    PtoggleSidebar : () => void,
    Pworkspaces : IWorkspace[],

}

class SidebarComponent extends React.Component<IProps,any> {

    constructor(props : any){
        super(props)
    }

    public componentWillMount(){    
        if (this.props.Pworkspaces.length < 1){
            this.props.PfetchWorkspaces()
        }
    }
    public checkSidebar(){
        const style = {
            "display" : "flex",
            "height" : "100%",
            "margin" : "5px",
            "width" : "15%",
        }
        if (this.props.PsidebarIsActive){
            style.width = "15%"
        } else {
            style.width = "5%"
        }
        return style
    }

    public renderContent() { 
        if (this.props.PsidebarIsActive){    
            const componentstyle = {

                "width" : "100%",
            }
                
            return(     
                <div style={componentstyle} className="Sidebar">
                    <ServersComponent PsidebarIsActive={this.props.PsidebarIsActive}/>
                    <WorkspacesComponent Pworkspaces={this.props.Pworkspaces} PsidebarIsActive={this.props.PsidebarIsActive}/>
                </div>
            )
        } else {
            return <div />
        }
    }

    public render(){
   
        const containerstyle = this.checkSidebar()
        
        return (
            <div className="SidebarComponent" style={containerstyle} onClick={this.props.PtoggleSidebar}>
                {this.renderContent()}
            </div>
        )
    }
}

export default SidebarComponent