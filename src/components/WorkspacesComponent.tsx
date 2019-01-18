import * as React from 'react';
import { Icon } from 'react-fa';
// import IWorkspace from "../models/Workspace";
import './WorkspaceComponent.css';

import WorkspaceComponent from './WorkspaceComponent';

interface IProps {
// Pworkspaces : IWorkspace[],
    PcurrentServer : string,
    Pservers : {},
    PsetCurrentWorkspace : (workspaceID : string) => void,
}

interface IState {
    workspacesPerServers : {}
}

class WorkspacesComponent extends React.Component<IProps, IState> {

    constructor(props : any) {
        super(props);
        this.state = {
        workspacesPerServers : {}
        }
    }

    public renderWorkspaces() {
        const workpsaceComponentsPerServer = {}

        for (const server in this.props.Pservers) {
            if (this.props.Pservers.hasOwnProperty(server) && this.props.Pservers[server]) {
                const workspaceComponents = []
                workspaceComponents.push(
                    <button className="create-workspace"><Icon name="plus" />
            &nbsp;&nbsp;Create Workspace</button>
                )
                if (this.props.Pservers.hasOwnProperty(this.props.PcurrentServer) &&
                this.props.Pservers[this.props.PcurrentServer]) {
                    for (const workspace in
                    this.props.Pservers[this.props.PcurrentServer].workspaces) {
                        if (workspace) {
                        workspaceComponents.push(
                            <WorkspaceComponent
                                key={this.props.Pservers[this.props.PcurrentServer].workspaces[workspace].id}
                                PcurrentServer={this.props.PcurrentServer}
                                PworkspaceInfo={this.props.Pservers[this.props.PcurrentServer].workspaces[workspace]}
                                PsetCurrentWorkspace = {this.props.PsetCurrentWorkspace}
                                Pservers = {this.props.Pservers}
                            />
                            )
                        }
                    }
                    workpsaceComponentsPerServer[server] = workspaceComponents
                }
            }
        }
    return workpsaceComponentsPerServer
    }

    public render() {
        return (
            <div className="workspaces-list" >
            <h4>Workspaces</h4>
            {this.renderWorkspaces()[this.props.PcurrentServer]}
            </div>
        )
    }
}

export default WorkspacesComponent;
