import "./client.scss";

import React from "react";
import ReactDOM from "react-dom";
import {Router, browserHistory as History} from "react-router";

//-------------------------------------------
// Render
function main() {
    const routes = require("./routes").default();
    ReactDOM.render(
        <Router history={History}>
            {routes}
        </Router>,
        document.getElementById("mount"));
}

//-------------------------------------------
// Misc
if (module.hot) {
    module.hot.accept("./components/app", () => {
        main();
    });
}

//-------------------------------------------
// Execute

main();