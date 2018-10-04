import * as React from "react";
import {Icon} from 'react-fa';
import {Button} from "reactstrap";
import "./WorkspaceCard.css";

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
        this.getMinishiftIp= this.getMinishiftIp.bind(this);
        this.reloadWorkspace = this.reloadWorkspace.bind(this);
        this.startWorkspace=this.startWorkspace.bind(this);
        this.stopWorkspace=this.stopWorkspace.bind(this);
    }

    public render(){

        let workspaceAction;

        if (this.state.workspaceStatus === "STOPPED"){
            workspaceAction = <Button className="Start_Workspace" onClick={this.startWorkspace}>Start Workspace</Button>;
        }if(this.state.workspaceStatus === "RUNNING"){
            workspaceAction = <div><Button className="Stop_Workspace" onClick={this.stopWorkspace}>Stop Workspace</Button><Button href={this.props.url} className="button">View Workspace</Button></div>;
        }if (this.state.workspaceStatus === "STARTING")
        {
            workspaceAction =<div><Icon spin ={true} name="refresh" />
            { this.reloadWorkspace() }
            <span  className="sr-only"/>
            </div>;
        }if (this.state.workspaceStatus === "STOPPING")
        {
            workspaceAction = <div ><Icon spin = {true} name="refresh" />
            {this.reloadWorkspace()}
            <span  className="sr-only"/></div>;
        }
        
        return(
            <div className="card col-sm-2">
                <div className="card-body">
                    <h4 className="card-title">{this.props.name}</h4>
                    <h6 className="id">{this.props.id}</h6>
                    <h5 className="status">{this.state.workspaceStatus}</h5>
                    <span>
                    {workspaceAction}
                    </span>
                </div>
            </div>

        )
    }


   private reloadWorkspace() {
        if(this.state.workspaceStatus === 'STARTING' || this.state.workspaceStatus === 'STOPPING')
        {
            const minishiftIp=this.getMinishiftIp();
            const reloadWorkspace='http://che-mini-che.'+{minishiftIp}+'.nip.io/api/workspace/'+this.props.id;
        fetch(reloadWorkspace, {
            headers: new Headers({
                'Content-Type': 'application/json',
       }),
       method: 'GET'
          
        }).then((response) => response.json())
        .then((data) => 
              this.setState(
                  {workspaceStatus:data.status})
    );
}    
    };

    private stopWorkspace() {
        const minishiftIp=this.getMinishiftIp();
        const stopWorkspace='http://che-mini-che.'+{minishiftIp}+'.nip.io/api/workspace/'+this.props.id+'/runtime';
        fetch(stopWorkspace, {
            headers: new Headers({
                'Content-Type': 'application/json',
       }),
       method: 'DELETE'
          
        }).then(() =>
       
          this.setState({workspaceStatus:'STOPPING'})
    );
         

    }

    private startWorkspace (){
        const minishiftIp=this.getMinishiftIp();
        const startWorkspace='http://che-mini-che.'+{minishiftIp}+'.nip.io/api/workspace/'+this.props.id+'/runtime';
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