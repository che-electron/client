import * as React from 'react';

import { ContextMenu, ContextMenuTrigger, MenuItem } from 'react-contextmenu';

import { Icon } from 'react-fa';

import { Button } from 'reactstrap'

import './WorkspaceComponent.css';

interface IProps {
    PworkspaceInfo : any
    PcurrentServer : string
    PsetCurrentWorkspace : (workspaceID : string) => void
    Pservers : {}
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
    }

    public handleButton() {
        this.props.PsetCurrentWorkspace(this.props.PworkspaceInfo)
    }

    public render() {

        let showIcon;
        if (this.props.PworkspaceInfo.status === 'STOPPED') {
            showIcon = <i className="workspace-status-stopped" />;
        }else if (this.props.PworkspaceInfo.status === 'RUNNING') {
            showIcon = <i className="workspace-status-running" />
        }else if (this.props.PworkspaceInfo.status === 'ERROR') {
            showIcon = <i className="workspace-status-error" />
        }else if (this.props.PworkspaceInfo.status === 'STOPPING' ||
        this.props.PworkspaceInfo.status === 'STARTING') {
            showIcon = (
                <span><Icon spin ={true} name="refresh" />
                { this.reloadWorkspace() }
                </span>)
}
            const workspaceStatus = (this.props.PworkspaceInfo.status === 'STOPPED' ||
            this.props.PworkspaceInfo.status === 'STOPPING') ?
            (
            <MenuItem>
            <button className="start-workspace-button" onClick={this.startWorkspace}>
                <Icon name="play" />&nbsp;Run
            </button >
            </MenuItem>) :
            (
            <MenuItem>
            <button className="stop-workspace-button" onClick={this.stopWorkspace}>
                <Icon name="stop" />&nbsp;Stop
            </button >
            </MenuItem>)

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
                            {workspaceStatus}
                        </ContextMenu>
                    </nav>
                </div>
        )
    }

     private startWorkspace() {
         fetch('http://' + this.props.PcurrentServer + '/api/workspace' + this.props.PworkspaceInfo.id + '/runtime?token=' +
         this.props.Pservers[ this.props.PcurrentServer ].authToken, {
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
         fetch('http://' + this.props.PcurrentServer + '/api/workspace' + this.props.PworkspaceInfo.id + '/runtime?token=' +
         this.props.Pservers[ this.props.PcurrentServer ].authToken, {
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

     private reloadWorkspace() {
        fetch('http://' + this.props.PcurrentServer + '/api/workspace' + this.props.PworkspaceInfo.id + '?token=' +
        this.props.Pservers[ this.props.PcurrentServer ].authToken, {
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
}

export default WorkspaceComponent;
