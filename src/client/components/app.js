import "./app.scss";

import React, {Component} from "react";

class AppBase extends Component {
    componentDidMount() {
        console.log("AppBase mounted;");
    }
    render () {
        const {main, sidebar} = this.props;
        return (
            <div className={`c-application`}>
                <div className="inner">
                    <div className="sidebar">
                        {sidebar}
                    </div>
                    <div className="main">
                        {main}
                    </div>
                </div>
            </div>
        );
    }

    _click() {
        console.log("Clickie");
    }
}

export default AppBase;