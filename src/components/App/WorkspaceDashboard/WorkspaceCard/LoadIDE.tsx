import * as React from "react";

export interface ILoadWorkspace extends React.Props<any>{
    url : string;
}


class LoadIDE extends React.Component <ILoadWorkspace,any>{
    constructor(props:any){
        super(props);
        this.state = {
            loadUrl : this.props.url,
        }
    }
        public render()
        {
            global.console.log("loading ide");
            return(
                <div><iframe src={this.state.loadUrl} width="1500" height="950"/></div>
            );
        }
}
export default LoadIDE;