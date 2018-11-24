import * as React from "react";
import "./IDEComponent.css";

interface IProps {
    PcurrentServer : string
    PcurrentWorkspacePerServer : {} 
    Pservers : {}
}

// interface IState {

// }

class IDEComponent extends React.Component<IProps> {

    constructor(props : IProps){
        super(props)
        this.state = {}
        // this.getIDELink = this.getIDELink.bind(this)
    }

    // public getIDELink(){
        
    // }

    public render(){       
        // this.getIDELink()
        return (
            <div className="IDEComponent">
                IDE
            </div>
        )
    }
}

export default IDEComponent;