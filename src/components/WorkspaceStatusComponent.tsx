import * as React from "react";
import { MenuItem} from "react-contextmenu";
import {Icon} from 'react-fa';
import "./WorkspaceStatusComponent.css";

interface IProps {
    PworkspaceId : string,
    PworkspaceStatus : string,
}

class WorkspaceStatusComponent extends React.Component<IProps> {

    constructor(props : IProps){
        super(props);
        this.startWorkspace=this.startWorkspace.bind(this);
        this.stopWorkspace=this.stopWorkspace.bind(this);
    }

    public render(){
        let showButton;
        if(this.props.PworkspaceStatus === 'STOPPED' || this.props.PworkspaceStatus === 'STOPPING')
        {
            showButton=<MenuItem><button className="start-workspace-button" onClick={this.startWorkspace}><Icon name="play" />&nbsp;Run</button ></MenuItem>;
        }
        else
        {
            showButton=<MenuItem><button className="stop-workspace-button" onClick={this.stopWorkspace}><Icon name="stop" />&nbsp;Stop</button ></MenuItem>;
        }
       
        return (
            <div className="StartWorkspaceButton">
            {showButton}
            </div>
        )
    }

    private startWorkspace(){
        const startWorkspace="https://che.openshift.io/api/workspace/"+this.props.PworkspaceId+"/runtime+?token="+localStorage.OSIOAuthToken;
        fetch(startWorkspace, {
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
        const stopWorkspace="https://che.openshift.io/api/workspace/"+this.props.PworkspaceId+"/runtime+?token="+localStorage.OSIOAuthToken;
        fetch(stopWorkspace, {
                headers: new Headers({
                    'Content-Type': 'application/json',
        }),
        method: 'DELETE'
            
            }).then(() =>
       
            this.setState({status:'STOPPING'})
      );
    }
}
export default WorkspaceStatusComponent;