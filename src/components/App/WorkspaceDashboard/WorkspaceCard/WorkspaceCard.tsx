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
            buttonState : false
        }
        this.handleButton = this.handleButton.bind(this);
    }

    public handleButton(){
        this.setState({
            buttonState : !this.state.buttonState
        });
    }

    public render(){

        let workspaceAction = "";

        if (this.state.buttonState){
            workspaceAction = "Start Workspace"
        }else{
            workspaceAction = "Stop Workspace"
        }

        return(
            <div className="card">
                <div className="card-body">
                    <h4 className="card-title">{this.props.name}</h4>
                    <h6 className="id">{this.props.id}</h6>
                    <h5 className="status">{this.props.status}</h5>
                    <span>
                    <button className="btn btn-primary" onClick={this.handleButton}>{workspaceAction}</button>
                    </span>
                </div>
            </div>

        )
    }
}

export default WorkspaceCard;