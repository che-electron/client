import * as React from "react";

const SERVERS_ENUMS = {

}

interface IProps {
    PsidebarIsActive : boolean
}

class ServersComponent extends React.Component<IProps> {

    constructor(props:any){
        super(props)
    }

    public renderServers(){

        const style = {
            "margin" : "10px",         
        }

        return (
            <div style={style}>
                Servers
            </div>
        )
        
    }

    public render(){
        return this.renderServers()
    }
}

export {ServersComponent, SERVERS_ENUMS}