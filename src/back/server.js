import {Playground} from "../game/playground.js";
import {Player} from "../game/player.js";
import {Client} from "./client.js";
import {configs, map} from "./config.js";

let playground;
const clients = [];
const init = () => {
    console.log(`init`);
    playground = new Playground(map);
    for (const {name, x, y, url, color, request} of configs) {
        const player = new Player(name, playground);
        player.spawn(x, y);
        const client = new Client(player, url, color, request, playground);
        clients.push(client);
    }
}

const update = (abortController) => {
    console.log(`update`);
    const promises = [];
    try {
        for (const client of clients) {
            const promise = client.request(abortController, playground);
            promises.push(promise);
        }
        return Promise.allSettled(promises).then(() => playground.calculate());

    } catch (e) {
        console.log(e);
    }
    return Promise.reject();
}

export {init, update, playground, clients};
