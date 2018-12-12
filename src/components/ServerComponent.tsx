import * as React from 'react';
import { Button } from 'reactstrap'
import Server from '../models/Server';
import './ServersComponent.css';

interface IProps {
    Pservers : {},
    server : Server,
    PsetCurrentServer : (server : string) => void,
    key : string
    PcurrentServer : string,
    PupdateWorkspacesList : (server : string) => void,
    // PsetCurrentWorkspace : (workspace : string) => void,
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
    }

    public render() {
        return(
            <div className="flex-item">
                <Button className="server-name" onClick={this.handleClick}>{this.props.server.url} </Button>
            </div>
        )
    }

    private handleClick() {
        this.props.PsetCurrentServer(this.props.server.url)
        this.props.PupdateWorkspacesList(this.props.PcurrentServer)
    }
}

export default ServerComponent ;
