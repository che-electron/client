import * as React from 'react';
import { Button } from 'reactstrap'
import Server from '../models/Server';
import './ServersComponent.css';
import WorkspacesComponent from './WorkspacesComponent';

interface IProps {
    Pservers : {},
    server : Server,
    PsetCurrentServer : (server : string) => void,
    key : string
    PcurrentServer : string,
    PupdateWorkspacesList : (server : string) => void,
    PsetCurrentWorkspace : (workspace : string) => void,
}

interface IState {
    showWorkspaceSidebar : boolean,
}

class ServerComponent extends React.Component<IProps, IState> {

    constructor(props : IProps) {
        super(props)
        this.state = {
            showWorkspaceSidebar: false
          };
        this.handleClick = this.handleClick.bind(this);
        this.toggleWorkspaceSidebar = this.toggleWorkspaceSidebar.bind(this);
    }

    public render() {

        let showWorkspaces;
        const componentstyle = {
            'width' : '20px',
        }
        if (this.state.showWorkspaceSidebar) {
        showWorkspaces = (
        <WorkspacesComponent
            PcurrentServer = {this.props.PcurrentServer}
            PupdateWorkspacesList = {this.props.PupdateWorkspacesList}
            Pservers = {this.props.Pservers}
            PsetCurrentWorkspace = {this.props.PsetCurrentWorkspace}
        />
        )
        } else {
          showWorkspaces = <div />
        }

    return(
        <div className="flex-item">
        <div>
            <span className="server-name">{this.props.server.url}</span>&nbsp;
            <Button className="fa fa-angle-down" key={this.props.server.url} onClick={this.handleClick} />
        </div>
        <div style={componentstyle} >
            {showWorkspaces}
        </div>
        </div>
    )
    }

    private handleClick() {
        this.props.PsetCurrentServer(this.props.server.url)
        this.toggleWorkspaceSidebar();

    }

    private toggleWorkspaceSidebar() {
        this.setState(
          {
            showWorkspaceSidebar : !this.state.showWorkspaceSidebar
          }
        );
      }
}

export default ServerComponent;
