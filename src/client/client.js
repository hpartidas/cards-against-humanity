import "./client.scss";

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