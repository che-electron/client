import * as React from "react";

import Server from '../models/Server'

import { Button } from 'reactstrap'

interface IProps {
    server : Server,
    PsetCurrentServer : (server : string) => void,
    key : string
}

class ServerComponent extends React.Component<IProps> {

    constructor(props : IProps){
        super(props)
        this.handleClick = this.handleClick.bind(this)
    }

    public handleClick(event : any){
        this.props.PsetCurrentServer(this.props.server.url)
    }

    public render(){

        return (
            <Button className="server-name" key={this.props.server.url} onClick={this.handleClick}>
                   <span>{this.props.server.url}</span>
            </Button>
        )  
    }
}

export default ServerComponent;