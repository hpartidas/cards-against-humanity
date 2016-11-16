
import "./lobby.scss";

import React from "react";
import * as A from "../actions";
import {ContainerBase} from "../lib/component";
import Chat from "./chat";

class LobbyContainer extends ContainerBase {
    constructor (props) {
        super(props);

        this._joinGame = (game) => {
            console.log(`TODO: JOIN GAME ${game.title}`);
        };

        this._sendMessage = (message) => {
            console.log(`Sending ${message}`);
        };
    }
    render() {
        const games = [
            {title: "Game 1", id: 1, players: ["one", "two", "three"]},
            {title: "Game 2", id: 2, players: ["one", "two", "three"]},
            {title: "Game 3", id: 3, players: ["one", "two", "three"]},
            {title: "Game 4", id: 4, players: ["one", "two", "three"]},
        ];

        const opSendMessage = {can: true, inProgress: false};
        const messages = [
            {index: 1, name: "Person", message: "bleh"},
            {index: 2, name: "Person", message: "bleh, bleh"},
            {index: 3, name: "Dracula", message: "bleh, bleh, bleh, bleh"}
        ];

        return (
            <div className="c-lobby">
                <GameList games={games} joinGame={this._joinGame} />
                <Chat
                    messages={messages}
                    opSendMessage={opSendMessage}
                    sendMessage={this._sendMessage}
                />
            </div>
        );
    }
}

class LobbySidebar extends ContainerBase {
    constructor (props) {
        super(props);

        this._login = () => {
            this.dispatch(A.dialogSet(A.DIALOG_LOGIN, true));
        };

        this._createGame = () => {
            console.log("TODO: CREATE Game");
        };
    }

    render() {
        const canLogin = true;
        const canCreateGame = true;
        const createGameInProgress = false;

        return (
            <section className="c-lobby-sidebar">
                <div className="m-sidebar-buttons">
                    {
                        !canLogin
                            ? null
                            : <button className="m-button primary" onClick={this._login}>Login</button>
                    }
                    {
                        !canCreateGame
                        ? null
                        : <button
                            onClick={this._createGame}
                            disabled={createGameInProgress}
                            className="m-button good">
                            Create Game
                        </button>
                    }
                </div>
            </section>
        );
    }
}

function GameList({games, joinGame}) {
    return (
        <section className="c-game-list">
            {games.length > 0 ? null : <div className="no-games">There are no games yet :(</div> }
            {games.map(game =>
                <div className="game" key={game.id} onClick={() => joinGame(game)}>
                    <div className="title">{game.title}</div>
                    <div className="players">
                        {game.players.join(", ")}
                    </div>
                    <div className="join-game">Join Game</div>
                </div>
            )}
        </section>
    );
}

export default {
    main: LobbyContainer,
    sidebar: LobbySidebar
};