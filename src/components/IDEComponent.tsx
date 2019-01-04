import * as React from 'react';
import './IDEComponent.css';

interface IProps {
    PcurrentServer : string
    PcurrentWorkspacePerServer : {}
    Pservers : {}
}

class IDEComponent extends React.Component<IProps> {

    constructor(props : IProps) {
        super(props)
        this.state = {}
    }

    public render() {
        let url = '';
        if (this.props.PcurrentServer && this.props.Pservers[this.props.PcurrentServer] &&
            this.props.PcurrentWorkspacePerServer[this.props.PcurrentServer]) {
                        const workspaceInUse = this.props.PcurrentWorkspacePerServer[this.props.PcurrentServer]
                        if (workspaceInUse) {
                            url = workspaceInUse.ideLink
                        }
                    }
        const style = {
            height : '100%',
            width : '100%',
        }
        return (
            <div className="IDEComponent">
                <iframe style={style} src={url} />
            </div>
        )
    }
}

export default IDEComponent;
