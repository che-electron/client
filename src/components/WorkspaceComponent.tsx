import * as React from "react";

// import { MenuItem} from "react-contextmenu";

// import {Icon} from 'react-fa';

import "./WorkspaceComponent.css";

interface IProps {
    PworkspaceInfo : any
    PcurrentServer : string
}

class WorkspaceComponent extends React.Component<IProps> {

    constructor(props : IProps){
        super(props);
        // }
        // this.reloadWorkspace=this.reloadWorkspace.bind(this);
        // this.startWorkspace=this.startWorkspace.bind(this);
        // this.stopWorkspace=this.stopWorkspace.bind(this);
    }


    public render(){       
        return (
            <div className="WorkspaceComponent">
                {JSON.stringify(this.props.PworkspaceInfo.id)}
            </div>
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