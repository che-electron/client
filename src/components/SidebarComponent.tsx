import * as React from "react";
import {SERVERS_ENUMS, ServersComponent} from "./ServersComponent";
import "./SidebarComponent.css";
import { WORKSPACES_ENUMS, WorkspacesComponent} from "./WorkspacesComponent";


const SIDEBAR_ENUMS = {
    ...SERVERS_ENUMS,
    ...WORKSPACES_ENUMS,
    TOGGLE_SIDEBAR : '[dashboard_sidebar] TOGGLE_SIDEBAR',
}

interface IProps {
    PtoggleSidebar : () => void,
    callbackHandler : (type:string, data:any) => void,
    PsidebarIsActive : boolean
}

class SidebarComponent extends React.Component<IProps> {

    constructor(props : IProps){
        super(props)
        this.toggleSidebar = this.toggleSidebar.bind(this)
    }

    public checkSidebar(){
        const style = {
            "display" : "flex",
            "height" : "100%",
            "width" : "15%",
        }
        if (this.props.PsidebarIsActive){
            style.width = "10%"
        } else {
            style.width = "5%"
        }
        return style
    }

    public toggleSidebar(event : any){
        this.props.PtoggleSidebar()
    }

    public renderContent() { 
        const componentstyle = {
            "display" : "flex",
            "width" : "100%",
        }
           
        return(     
            <div style={componentstyle} className="Sidebar">
                <ServersComponent PsidebarIsActive={this.props.PsidebarIsActive}/>
                <WorkspacesComponent PsidebarIsActive={this.props.PsidebarIsActive}/>
            </div>
        )
    }

    public render(){
        const containerstyle = this.checkSidebar()
        return (
            <div className="SidebarComponent" style={containerstyle} onClick={this.toggleSidebar}>
                {this.renderContent()}
            </div>
        )
    }
}

export {SIDEBAR_ENUMS, SidebarComponent}