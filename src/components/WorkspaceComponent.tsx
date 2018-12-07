import * as React from "react";

// import { MenuItem} from "react-contextmenu";

// import {Icon} from 'react-fa';

import { Button } from 'reactstrap'

import "./WorkspaceComponent.css";

interface IProps {
    PworkspaceInfo : any
    PcurrentServer : string
    PsetCurrentWorkspace : (workspaceID : string) => void
}

class WorkspaceComponent extends React.Component<IProps> {

    constructor(props : IProps){
        super(props);
        // }
        // this.reloadWorkspace=this.reloadWorkspace.bind(this);
        // this.startWorkspace=this.startWorkspace.bind(this);
        // this.stopWorkspace=this.stopWorkspace.bind(this);
        this.handleButton=this.handleButton.bind(this);
    }

    public handleButton(){
        this.props.PsetCurrentWorkspace(this.props.PworkspaceInfo.id)
    }

    public render(){
        return (
            <Button className="WorkspaceComponent" onClick={this.handleButton}>
                {this.props.PworkspaceInfo.id}
            </Button>
        )
    }

//     private startWorkspace(){
//         fetch(startWorkspaceApi(this.props.PworkspaceId), {
//             headers: new Headers({
//                 'Content-Type': 'application/json',
//        }),
//        method: 'POST'
//         }).then((response) => response.json())
//         .then((data) => {
//             this.setState({status:data.status});
//     });
// }

//     private stopWorkspace(){
//         fetch(stopWorkspaceApi(this.props.PworkspaceId), {
//                 headers: new Headers({
//                     'Content-Type': 'application/json',
//         }),
//         method: 'DELETE'
//             }).then(() =>
//             this.setState({status:'STOPPING'})
//       );
//     }

//     private reloadWorkspace() {
//         fetch(workspaceApi(this.props.PworkspaceId), {
//             headers: new Headers({
//                 'Content-Type': 'application/json',
//        }),
//        method: 'GET'
//         }).then((response) => response.json())
//         .then((data) =>
//               this.setState(
//                   {status:data.status})
//             );
//     };
}

export default WorkspaceComponent;