import * as React from "react";

const WORKSPACES_ENUMS = {
    
}


interface IProps {
    PsidebarIsActive : boolean
}

class WorkspacesComponent extends React.Component<IProps> {

    constructor(props:any){
        super(props)
    }

    public renderWorkspaces(){
        const style = {
            "margin" : "10px",         
        }

        return (
            <div style={style}>
                Workspaces
            </div>
        )
    }

    public render(){
        return this.renderWorkspaces()
    }
}

export {WorkspacesComponent, WORKSPACES_ENUMS};