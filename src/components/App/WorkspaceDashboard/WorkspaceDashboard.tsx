import * as React from "react";
import WorkspaceCard from "./WorkspaceCard/WorkspaceCard";

class WorkspaceDashboard extends React.Component<any,any>{

    constructor(props : any){
        super(props);
        this.state = {
            workspaces : []
        }
        this.getWorkspaceData = this.getWorkspaceData.bind(this);
        this.eachWorkspace = this.eachWorkspace.bind(this);
    }
    
    public componentWillMount(){
        this.getWorkspaceData();
    }
    
     public getWorkspaceData () : void {

    const workspaceApi='http://che-mini-che.192.168.42.164.nip.io/api/workspace';
    fetch(workspaceApi)
    .then(results => {
        return results.json();
    })
    .then((data) => {
        this.setState({workspaces:data})
    })

    }

    public eachWorkspace(wksp : any){
        return (
            <WorkspaceCard name={wksp.config.name} id={wksp.id} status={wksp.status} url={wksp.links.ide} />
        )
    }

    public render(){
        return(
            <div>
                <h2>
                    Workspace Dashboard
                </h2>
                {this.state.workspaces.map(this.eachWorkspace)}
            </div>
        )
    }
}

export default WorkspaceDashboard;