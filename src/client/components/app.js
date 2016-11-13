import "./app.scss";

import React, {Component} from "react";

class AppBase extends Component {
    componentDidMount() {
        console.log("AppBase mounted;");
    }
    render () {
        return (
            <section>
                <h1>Hello World</h1>
                <button onClick={this._click.bind(this)}>I am a button</button>
            </section>
        );
    }

    _click() {
        console.log("Clickie");
    }
}

export default AppBase;