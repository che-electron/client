import * as React from "react";
// import IWorkspace from "../models/Workspace";
import ServersComponent from "./ServersComponent";
import "./SidebarComponent.css";
import WorkspacesComponent from "./WorkspacesComponent";

interface IProps {
    // PfetchWorkspaces : () => void,
    PsidebarIsActive : boolean,
    PtoggleSidebar : () => void,
    // Pworkspaces : IWorkspace[],
    PtoggleIDELogin : () => void
 
}

interface IState{
    collapsed: boolean,
}

class SidebarComponent extends React.Component<IProps,IState> {

    constructor(props : IProps){
        super(props)
        this.isOpen= this.isOpen.bind(this);
    }

    // public componentWillMount(){    
    //     if (this.props.Pworkspaces.length < 1){
    //         this.props.PfetchWorkspaces()
    //     }
    // }

    public checkSidebar(){
        const style = {
            "display" : "flex",
            "height" : "960px",
            "width" : "18%",
        }
        if (this.props.PsidebarIsActive){
            style.width = "18%"
        } else {
            style.width = "5%"
        }
        return style
    }

    public renderContent() { 
        if (this.props.PsidebarIsActive){    
            const componentstyle = {
                "display" : "flex",
                "height" : "960px",
                "width" : "18%",
            }
  
            return(     
                <div style={componentstyle} className="Sidebar">
                    <div className="flexItem" id="1">    
                        <ServersComponent PsidebarIsActive={this.props.PsidebarIsActive} PtoggleIDELogin={this.props.PtoggleIDELogin}/>
                    </div>
                    <div className="flexItem" id="2">
                        <WorkspacesComponent PsidebarIsActive={this.props.PsidebarIsActive} /* Pworkspaces={this.props.Pworkspaces}*/ />
                    </div>
                </div>
            )
        } else {
            return <div />
        }
    }

    public isOpen(){
        let button;
        if(!this.props.PsidebarIsActive)
            {
                button=<span className="double-right-pointing-angle">&#187;</span>
             
            }
            else{
                button=<span className="double-left-pointing-angle">&#171;</span>
            }
            return button;
    }
    
    public render(){
   
         const containerstyle = this.checkSidebar();    
        
        return (
            <div className="SidebarComponent" style={containerstyle}>
            <button className="toggle-sidebar" onClick={this.props.PtoggleSidebar}>
            {this.isOpen()}
            </button>   
                    
            {this.renderContent()}
                          
            </div>
        )
    }
}

export default SidebarComponent