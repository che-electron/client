import * as React from "react";
import {Icon} from 'react-fa';
import LoadIDE from "./LoadIDE";
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
            showIDE : false,
            workspaceStatus : this.props.status,
        }
        this.loadIDE=this.loadIDE.bind(this);
        this.reloadWorkspace = this.reloadWorkspace.bind(this);
        this.startWorkspace=this.startWorkspace.bind(this);
        this.stopWorkspace=this.stopWorkspace.bind(this);
        this.getMinishiftIp=this.getMinishiftIp.bind(this);
    }

    public render(){
        let workspaceAction;

        if (this.state.workspaceStatus === "STOPPED"){
            workspaceAction = <button className="btn btn-lg btn-block Start_Workspace" onClick={this.startWorkspace}>Start Workspace</button >;
        }if(this.state.workspaceStatus === "RUNNING"){
            workspaceAction = <div><button  className="Stop_Workspace btn btn-lg btn-block btn-secondary" onClick={this.stopWorkspace}>Stop Workspace</button><button onClick={this.loadIDE} className="btn btn-primary btn-lg btn-block">View Workspace</button></div>;
        }if ((this.state.workspaceStatus === "STARTING") ||  (this.state.workspaceStatus === "STOPPING"))
        {
            workspaceAction =<div><Icon spin ={true} name="refresh" />
            { this.reloadWorkspace() }
            <span  className="sr-only"/>
            </div>;
        } if(this.state.showIDE === true)
        {
            workspaceAction = <LoadIDE url={this.props.url}/>;
        }
        
        return(
            <div className="card-deck ml-3 mr-3 mt-2 mb-2">
                 <div className= { (this.state.workspaceStatus === 'STOPPED')? "card text-center  border-secondary text-secondary" : "card text-center ml-3 mr-3 mt-3 mb-3 border-primary text-primary"}>
                <div className="card-body">
                    <h4 className="card-title">{this.props.name}</h4>
                    <h6 className="id">{this.props.id}</h6>
                    <h5 className={ (this.state.workspaceStatus === 'STOPPED')? "badge badge-danger":"badge badge-success"}>{this.state.workspaceStatus}</h5>
                    <div>
                    {workspaceAction}
                    </div>
                </div>
            </div>
            </div>



        )
    }


   private reloadWorkspace() {
        if(this.state.workspaceStatus === 'STARTING' || this.state.workspaceStatus === 'STOPPING')
        {
            const minishiftIp=this.getMinishiftIp();
            const reloadWorkspace='http://che-mini-che.'+minishiftIp+'.nip.io/api/workspace/'+this.props.id;
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
        const stopWorkspace='http://che-mini-che.'+minishiftIp+'.nip.io/api/workspace/'+this.props.id+'/runtime';
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
        const startWorkspace='http://che-mini-che.'+minishiftIp+'.nip.io/api/workspace/'+this.props.id+'/runtime';
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

    private loadIDE(){
        
        this.setState({showIDE: true})
    };

     private getMinishiftIp()
     {
         return '';
     };

}

export default WorkspaceCard;