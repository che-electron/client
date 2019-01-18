import * as React from 'react';

import { ContextMenu, ContextMenuTrigger } from 'react-contextmenu';

import { Icon } from 'react-fa';

import { Button } from 'reactstrap'

import './WorkspaceComponent.css';

import { reloadWorkspaceApi, startWorkspaceApi, stopWorkspaceApi } from '../apicalls/GetApi';

// import WorkspaceOnRightClickComponent from './WorkspaceOnRightClickComponent';

interface IProps {
    PworkspaceInfo : any
    PcurrentServer : string
    PsetCurrentWorkspace : (workspaceID : string) => void
    Pservers : {}
}

interface IState{
    WorkspaceStatus: string,
}

interface IState{
    WorkspaceStatus: string,
}

class WorkspaceComponent extends React.Component<IProps, IState> {

    constructor(props : IProps) {
        super(props);
        this.reloadWorkspace = this.reloadWorkspace.bind(this);
        this.startWorkspace = this.startWorkspace.bind(this);
        this.stopWorkspace = this.stopWorkspace.bind(this);
        this.handleButton = this.handleButton.bind(this);
        this.state = {
            WorkspaceStatus : this.props.PworkspaceInfo.status
  };
}

    public handleButton() {
        this.props.PsetCurrentWorkspace(this.props.PworkspaceInfo)
    }

    public render() {

        let showIcon;
        if (this.state.WorkspaceStatus === 'STOPPED') {
            showIcon = <i className="workspace-status-stopped" />;
        }else if (this.state.WorkspaceStatus === 'RUNNING') {
            showIcon = <i className="workspace-status-running" />
        }else if (this.state.WorkspaceStatus === 'ERROR') {
            showIcon = <i className="workspace-status-error" />
        }else if (this.state.WorkspaceStatus === 'STOPPING' ||
        this.state.WorkspaceStatus === 'STARTING') {
            showIcon = (
                <span><Icon spin ={true} name="refresh" />
                { this.reloadWorkspace() }
                </span>)
            }

            const onRightClickButton = (this.state.WorkspaceStatus === 'STOPPED' ||
            this.state.WorkspaceStatus === 'STOPPING') ?
            (
                <Button className="start-workspace-button" onClick={this.startWorkspace}>
                <Icon name="play" />&nbsp;Run
                </Button>) :
            (
                <Button className="stop-workspace-button" onClick={this.stopWorkspace}>
                <Icon name="stop" />&nbsp;Stop
                </Button >
            )
            return (
                <div className="workspace-bm-menu" >
                    <nav className="bm-item-list" >
                        <ContextMenuTrigger id="my_menu">
                            <Button
                                className="bm-item"
                                onClick={this.handleButton}
                                contextMenu="mymenu"
                                key={this.props.PworkspaceInfo.id}
                            >
                            {showIcon} &nbsp;
                            <span>{this.props.PworkspaceInfo.config.name}</span>
                            </Button>
                        </ContextMenuTrigger>
                        <ContextMenu id="my_menu">
                            {onRightClickButton}
                        </ContextMenu>
                    </nav>
                </div>
        )
    }

     private reloadWorkspace() {
        fetch(reloadWorkspaceApi(this.props.PcurrentServer, this.props.PworkspaceInfo.id,
            this.props.Pservers[ this.props.PcurrentServer ].authToken), {
            headers: new Headers({
                'Content-Type': 'application/json',
                }),
                method: 'GET'
                 }).then((response) => response.json())
                 .then((data) => {
                    global.console.log('Reload Workspace')
                    this.setState({ WorkspaceStatus : data.status })
                 }
                 );
    }

    private startWorkspace() {
        fetch(startWorkspaceApi(this.props.PcurrentServer, this.props.PworkspaceInfo.id,
            this.props.Pservers[ this.props.PcurrentServer ].authToken), {
            headers: new Headers({
                'Content-Type' : 'application/json',
       }),
       method: 'POST'
        }).then((response) => response.json())
        .then((data) => {
            global.console.log('Start Workspace')
            this.setState({ WorkspaceStatus : data.status });
    });
}

    private stopWorkspace() {
        fetch(stopWorkspaceApi(this.props.PcurrentServer, this.props.PworkspaceInfo.id,
            this.props.Pservers[ this.props.PcurrentServer ].authToken), {
                headers: new Headers({
                    'Content-Type' : 'application/json',
        }),
        method: 'DELETE'
            }).then(() => {
               global.console.log('Stop Workspace')
               this.setState({ WorkspaceStatus : 'STOPPING' })
            }
      );
    }

}

export default WorkspaceComponent;
