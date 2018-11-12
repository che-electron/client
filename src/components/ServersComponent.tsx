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
            "border" : "5px solid green",
            "margin" : "10px",         
        }

        if (localStorage.getItem("CheServerTokens")!=null){
            return (
                <div style={style}>
                    Servers
                </div>
            )
        }else{
            return (
                <div/>
            )
        }
    }

    public render(){
        return this.renderServers()
    }
}

export {ServersComponent, SERVERS_ENUMS}