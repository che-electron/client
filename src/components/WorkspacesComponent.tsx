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
        return (
            <div/>
        )
    }

    public render(){
        return this.renderWorkspaces()
    }
}

export {WorkspacesComponent, WORKSPACES_ENUMS};