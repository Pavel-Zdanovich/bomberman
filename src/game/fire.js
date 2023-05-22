import {FIRE} from "./alphabet.js";

class Fire {

    x;

    y;

    time;

    #playground;

    #bombs;

    constructor(time) {
        this.time = time;
        this.#bombs = [];
    }

    get name() {
        return FIRE;
    }

    get playground() {
        return this.#playground;
    }

    set playground(playground) {
        this.#playground = playground;
    }

    get bombs() {
        return this.#bombs;
    }

    countdown() {
        this.time--;
    }
}

export {Fire};
