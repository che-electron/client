import * as React from "react";
import {SIDEBAR_ENUMS, SidebarComponent} from "./SidebarComponent";

import "./DashboardComponent.css";
import IDEComponent from "./IDEComponent";

interface IProps { 
    // Sidebar
    PsidebarIsActive : boolean
    PtoggleSidebar : () => void
    // Servers

    // Workspaces
    // Current
} 

class DashboardComponent extends React.Component<IProps> {

    constructor(props : any ){
        super(props)
        this.callbackHandler = this.callbackHandler.bind(this)
    }

    public callbackHandler(type : string, data : any){
        switch(type){
            case SIDEBAR_ENUMS.TOGGLE_SIDEBAR:
            break;
        }
    }

    public render(){
        return (
            <div className="Dashboard">
                <SidebarComponent 
                    callbackHandler = {this.callbackHandler}
                    // Sidebar
                    PsidebarIsActive={this.props.PsidebarIsActive}
                    PtoggleSidebar={this.props.PtoggleSidebar}
                    // Workpsaces
                    
                    // Servers

                />
                <IDEComponent />
            </div>
        )
    }
}

export default DashboardComponent