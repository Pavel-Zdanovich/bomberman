import {Playground} from "../game/playground.js";
import {Player} from "../game/player.js";
import {Client} from "./client.js";
import {configs, map} from "./config.js";

let playground;
const clients = [];
const init = () => {
    playground = new Playground(map);
    for (const {name, x, y, url, poll} of configs) {
        const player = new Player(name);
        playground.spawn(player, x, y);
        playground.players.push(player);
        player.playground = playground;
        const client = new Client(playground, player, url, poll);
        clients.push(client);
    }
}

const update = (abortController) => {
    const promises = [];
    try {
        for (const client of clients) {
            const promise = client.poll(abortController);
            promises.push(promise);
        }
        return Promise.allSettled(promises).then(() => playground.calculate());

    } catch (e) {
        console.log(e);
    }
    return Promise.reject();
}

export {init, update, playground};