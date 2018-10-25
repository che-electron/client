import * as React from "react"

import SidebarContainer from "../containers/SidebarContainer";
import IDEComponent from "./IDEComponent"

class DashboardComponent extends React.Component {

    constructor(props : any){
        super(props)
    }

    public render(){
        const style = {
            display : "flex"
        }
        return (
            <div className="Dashboard" style={style}>
                <SidebarContainer />
                <IDEComponent />
            </div>
        )
    }
}

export default DashboardComponent