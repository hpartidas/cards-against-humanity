/**
 * Always import React if using JSX
 */
import React from "react";
import {Route, IndexRoute, Redirect} from "react-router";

import AppBase from "./components/app";
import Lobby from "./components/lobby";
import Game from "./components/game";


export default function() {
    return (
        <Route path="/" component={AppBase}>
            <IndexRoute components={Lobby}/>
            <Route path="/game/:gameId" components={Game}/>
            <Redirect from="*" to="/" />
        </Route>
    );
}