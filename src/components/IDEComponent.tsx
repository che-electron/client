import * as React from 'react';
import './IDEComponent.css';

interface IProps {
    PcurrentServer : string
    PcurrentWorkspacePerServer : {}
    Pservers : {}
}

// interface IState {

// }

class IDEComponent extends React.Component<IProps> {

    constructor(props : IProps) {
        super(props)
        this.state = {}
    }

    public render() {
        return (
            <div className="IDEComponent">
                IDE {JSON.stringify(this.props.PcurrentServer)} {JSON.stringify(this.props.PcurrentWorkspacePerServer)}
            </div>
        )
    }
}

export default IDEComponent;
