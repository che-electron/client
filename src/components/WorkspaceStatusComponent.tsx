import * as React from "react";

import { MenuItem} from "react-contextmenu";

import {Icon} from 'react-fa';

import "./WorkspaceStatusComponent.css";

import {startWorkspaceApi, stopWorkspaceApi, workspaceApi} from '../apicalls/GetApi';

interface IProps {
    PworkspaceId : string,
    PworkspaceStatus : string,
}

class WorkspaceStatusComponent extends React.Component<IProps> {

    constructor(props : IProps){
        super(props);
        this.state = {
            status : this.props.PworkspaceStatus,
        }
        this.reloadWorkspace=this.reloadWorkspace.bind(this);
        this.startWorkspace=this.startWorkspace.bind(this);
        this.stopWorkspace=this.stopWorkspace.bind(this);
    }


    public render(){
        let showButton;
         global.console.log("render");
        if(status === 'STOPPED' || status === 'STOPPING')
        {
            showButton=<MenuItem><button className="start-workspace-button" onClick={this.startWorkspace}><Icon name="play" />&nbsp;Run</button></MenuItem>;
        }
        else
        {
            showButton=<MenuItem><button className="stop-workspace-button" onClick={this.stopWorkspace}><Icon name="stop" />&nbsp;Stop</button ></MenuItem>;
        }
       
        return (
            <div className="WorkspaceButton">
            {showButton}
            </div>
        )
    }

    private startWorkspace(){
        fetch(startWorkspaceApi(this.props.PworkspaceId), {
            headers: new Headers({
                'Content-Type': 'application/json',
       }),
       method: 'POST'
          
        }).then((response) => response.json())
        .then((data) => {
            this.setState({status:data.status});
         
    });
}

    private stopWorkspace(){
        fetch(stopWorkspaceApi(this.props.PworkspaceId), {
                headers: new Headers({
                    'Content-Type': 'application/json',
        }),
        method: 'DELETE'
            
            }).then(() =>
       
            this.setState({status:'STOPPING'})
      );
    }

    private reloadWorkspace() {
        fetch(workspaceApi(this.props.PworkspaceId), {
            headers: new Headers({
                'Content-Type': 'application/json',
       }),
       method: 'GET'
          
        }).then((response) => response.json())
        .then((data) => 
              this.setState(
                  {status:data.status})
            );  
    };
}
export default WorkspaceStatusComponent;