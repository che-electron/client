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

    public getIDELink() {

        let ideLink = ''

        if (this.props.Pservers) {
            if (this.props.PcurrentServer) {
                if (this.props.PcurrentWorkspacePerServer) {
                    if (this.props.Pservers[this.props.PcurrentServer] &&
                        this.props.PcurrentWorkspacePerServer[this.props.PcurrentServer]) {
                        const workspaceInUse = this.props.PcurrentWorkspacePerServer[this.props.PcurrentServer]
                        global.console.log(workspaceInUse + '" using "')
                        let workspace : any
                        for (workspace in this.props.Pservers[this.props.PcurrentServer].workspaces) {
                            if (workspaceInUse === this.props.Pservers[this.props.PcurrentServer].workspaces[workspace].id) {
                                ideLink = this.props.Pservers[this.props.PcurrentServer].workspaces[workspace].ideLink
                            }
                        }
                    }
                }
            }
        }

        return ideLink
    }

    public render() {

        const style = {
            height : '100%',
            width : '100%',
        }

        return (
            <div className="IDEComponent">
                <iframe style={style} src={this.getIDELink()} />
            </div>
        )
    }
}

export default IDEComponent;
