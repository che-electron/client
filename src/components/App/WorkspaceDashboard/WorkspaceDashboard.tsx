import * as https from 'https';
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
        this.getWorkspaceData("");
    }
    
     public getWorkspaceData (token : string) : void {
        const options = {
          host: "che.openshift.io",
          method: "GET",
          path: "/api/workspace?token="+token,
          port: 443
        }
    
        let workspacesBody = "";
      
        https.get(options, (resp) => {
          resp.on("data",(data) => {
            workspacesBody += data;
          });
          resp.on("end", () => {
            this.setState({
              workspaces : JSON.parse(workspacesBody)
            });
          });
        });
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