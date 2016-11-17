import "./client.scss";

import _ from "lodash";
import React from "react";
import ReactDOM from "react-dom";
import {Router, browserHistory as History} from "react-router";

import * as A from "./actions";
import {Dispatcher} from "shared/dispatcher";
import {StoreProvider} from "./lib/component";
import createStores from "./stores";

//-------------------------------------------
// Services
const dispatcher = new Dispatcher();
const services = {dispatcher};

if (IS_DEVELOPMENT) {
    dispatcher.on("*", printAction);
}

//-------------------------------------------
// Stores
const stores = createStores(services);

//-------------------------------------------
// Render
function main() {
    const routes = require("./routes").default();
    ReactDOM.render(
        <StoreProvider stores={stores} services={services}>
        <Router history={History}>
            {routes}
        </Router>
        </StoreProvider>,
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

//-------------------------------------------
// Helpers
function printAction(action) {
    if (action.hasOwnProperty("status")) {
        let style = null;
        switch(action.status) {
            case A.STATUS_REQUEST: style="color:blue";break;
            case A.STATUS_FAIL: style="color:red";break;
            case A.STATUS_SUCCESS: style="color:green";break;
        }
        
        console.log(`%c${action.type}`, `${style}; font-weight:bold;background:#eee;width:100%:display:block;`);
    } else {
        console.log(`%c${action.type}`, "background: #ddd");
    }
    
    const result = _.omit(action, ["type", "status"]);
    
    if (_.keys(result).length) {
        console.log(result);
    }
}