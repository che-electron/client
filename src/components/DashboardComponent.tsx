import * as React from "react";
import SidebarContainer from "../containers/SidebarContainer";
import "./DashboardComponent.css";
import IDEComponent from "./IDEComponent";


class DashboardComponent extends React.Component {

    constructor(props : any){
        super(props)
    }

    public render(){
        return (
            <div className="Dashboard">
                <SidebarContainer />
                <IDEComponent />
            </div>
        )
    }
}

export default DashboardComponent