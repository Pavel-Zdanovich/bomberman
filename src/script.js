import {init, update} from "./back/server.js";
import {set} from "./front/input.js";
import {render} from "./front/output.js";

let gameIsRunning = false;
let timeout = 1000;
const abortController = new AbortController();

init();
render();
const main = () => {
    update(abortController).then(render);
};
set(gameIsRunning, timeout, abortController, main);