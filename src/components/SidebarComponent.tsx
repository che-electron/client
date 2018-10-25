import * as React from "react"

import ServersComponent from "./ServersComponent"
import WorkspacesComponent from "./WorkspacesComponent"

import IWorkspace from "../models/Workspace";


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
            "border" : "5px solid blue",
            "display" : "flex",
            "height" : "100%",
            "margin" : "10px",
            "top" : "0",
            "width" : "25%",
        }
        if (this.props.PsidebarIsActive){
            style.width = "25%"
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
            <div className="SidebarContainer" style={containerstyle} onClick={this.props.PtoggleSidebar}>
                {this.renderContent()}
            </div>
        )
    }
}
// <button style={{margin:"10px", padding: "10px"}} onClick={this.props.PtoggleSidebar}>Sidebar Toggle</button>


export default SidebarComponent