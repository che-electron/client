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

        if (this.state.workspaceStatus === "STOPPED"){
            workspaceAction = <button className="Start_Workspace" onClick={this.startWorkspace}>Start Workspace</button>;
        }if(this.state.workspaceStatus === "RUNNING"){
            workspaceAction = <div><button className="Stop_Workspace" onClick={this.stopWorkspace}>Stop Workspace</button><a href={this.props.url} className="button">View Workspace</a></div>;
        }if (this.state.workspaceStatus === "STARTING")
        {
            workspaceAction = <button className="Reload_Workspace" onClick={this.reloadWorkspace}>Reload</button>;
        }if (this.state.workspaceStatus === "STOPPING")
        {
            workspaceAction = <button className="Reload_Workspace" onClick={this.reloadWorkspace}>Reload</button>;
        }
        
        return(
            <div className="card col-sm-2">
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
        const reloadWorkspace='http://che-mini-che.'+this.getMinishiftIp+'.nip.io/api/workspace/'+this.props.id;
        fetch(reloadWorkspace).then((response) => response.json())
        .then((data) => {
          this.setState({workspaceStatus:data.status});
    });
    };

    private stopWorkspace() {
        const stopWorkspace='http://che-mini-che.'+this.getMinishiftIp+'.nip.io/api/workspace/'+this.props.id+'/runtime';
        fetch(stopWorkspace, {
            headers: new Headers({
                'Content-Type': 'application/json',
       }),
       method: 'DELETE'
          
        });
       
          this.setState({workspaceStatus:'STOPPING'});

    }

    
    private startWorkspace (){
        const startWorkspace='http://che-mini-che.'+this.getMinishiftIp+'.nip.io/api/workspace/'+this.props.id+'/runtime';
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

    private getMinishiftIp()
    {
        return '';
    }
}

export default WorkspaceCard;