import * as React from "react";

class IDEComponent extends React.Component<any,any> {
    public render(){

        const style = {
            "backgroundColor" : '#FFF', 
            "border" : "5px solid blue",
            "height" : "100%",
            "margin" : "10px",
            "top" : "0",
            "width" : "100%",
        }


        return (
            <div style={style} className="IDE">
                IDE
            </div>
        )
    }
}

export default IDEComponent;