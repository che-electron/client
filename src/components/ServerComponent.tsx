import * as React from "react";
import { Button } from 'reactstrap'
import Server from '../models/Server';
import "./ServersComponent.css";

interface IProps {
    server : Server,
    PsetCurrentServer : (server : string) => void,
    key : string
}

interface IState {
    showWorkspaceSidebar : boolean,
}

class ServerComponent extends React.Component<IProps,IState> {

    constructor(props : IProps){
        super(props)
        this.state = {
            showWorkspaceSidebar: false
          };
        this.handleClick = this.handleClick.bind(this);
        this.toggleWorkspaceSidebar=this.toggleWorkspaceSidebar.bind(this);
    }

    

    public render(){

        return (
            <Button className="server-name" key={this.props.server.url} onClick={this.handleClick}>
                   <span>{this.props.server.url}</span>
            </Button>
        )  
    }
    
    private handleClick(){
        // this.props.PsetCurrentServer(this.props.server.url)
        this.toggleWorkspaceSidebar();

        const containerstyle = this.checkWorkspaceSidebar(); 
        
            return(
                <div className="workspace-sidebar" style={containerstyle}/>
                 
            )
        
 
        global.console.log("show workspace sidebar");
    }
    
    private toggleWorkspaceSidebar() {
        this.setState(
          {
            showWorkspaceSidebar: !this.state.showWorkspaceSidebar
          }
        );
      }

    private checkWorkspaceSidebar(){

       const style = {
            "display" : "flex",
            "height" : "960px",
            "width" : "0%",
        }
        if (this.state.showWorkspaceSidebar){
            style.width = "10%"
        }
        return style
        
    }
}

export default ServerComponent;