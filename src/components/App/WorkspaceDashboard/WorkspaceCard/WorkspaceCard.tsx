import * as React from "react";
import "./WorkspaceCard.css"

export interface IWorkspaceItem extends React.Props<any>{
    name : string;
    id : string;
    status : string;
    url : string;
}

class WorkspaceCard extends React.Component <IWorkspaceItem,any>{
    constructor(props:any){
        super(props);
        this.state = {
            buttonState : false,
            workspaceStatus : this.props.status,
        }
        this.reloadWorkspace = this.reloadWorkspace.bind(this);
        this.startWorkspace=this.startWorkspace.bind(this);
        this.stopWorkspace=this.stopWorkspace.bind(this);
    }

    public render(){

        let workspaceAction;

        if (this.props.status === "STOPPED"){
            workspaceAction = <button className="Start_Workspace" onClick={this.startWorkspace}>Start Workspace</button>;
        }if(this.props.status === "RUNNING"){
            workspaceAction = <div><button className="Stop_Workspace" onClick={this.stopWorkspace}>Stop Workspace</button><a href={this.props.url} className="button">View Workspace</a></div>;
        }if (this.props.status === "STARTING")
        {
            workspaceAction = <button className="Reload_Workspace" onClick={this.reloadWorkspace}>Reload</button>;
        }
        
        return(
            <div className="card">
                <div className="card-body">
                    <h4 className="card-title">{this.props.name}</h4>
                    <h6 className="id">{this.props.id}</h6>
                    <h5 className="status">{this.props.status}</h5>
                    <span>
                    {workspaceAction}
                    </span>
                </div>
            </div>

        )
    }


    private reloadWorkspace() {
        const reloadWorkspace='http://che-mini-che.192.168.42.164.nip.io/api/workspace/'+this.props.id;
        fetch(reloadWorkspace).then((response) => response.json())
        .then((data) => {
          this.setState({workspaceStatus:data.status});
    });
    };

    private stopWorkspace() {
        const stopWorkspace='http://che-mini-che.192.168.42.164.nip.io/api/workspace/'+this.props.id+'/runtime';
        fetch(stopWorkspace, {
            headers: new Headers({
                'Content-Type': 'application/json',
       }),
       method: 'DELETE'
          
        });
        const reloadWorkspace='http://che-mini-che.192.168.42.164.nip.io/api/workspace/'+this.props.id;
        fetch(reloadWorkspace).then((response) => response.json())
        .then((data) => {
          this.setState({workspaceStatus:data.status});
    });

    }

    
    private startWorkspace (){
        const startWorkspace='http://che-mini-che.192.168.42.164.nip.io/api/workspace/'+this.props.id+'/runtime';
        fetch(startWorkspace, {
            headers: new Headers({
                'Content-Type': 'application/json',
       }),
       method: 'POST'
          
        }).then((response) => response.json())
        .then((data) => {
          this.setState({workspaceStatus:data.status});
         
    });

         
    };

}

export default WorkspaceCard;