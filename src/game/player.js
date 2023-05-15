import {BOMB, DOWN, FIRE, LEFT, RIGHT, SPACE, UP} from "./alphabet.js";
import {Bomb} from "./bomb.js";

class Player {

    x;

    y;

    name;

    isAlive;

    #updated;

    #action;

    #causeOfDeath

    #playground;

    #bombs;

    constructor(name) {
        if (typeof name !== "string") {
            throw Error(`Invalid name: '${name}'`);
        }
        this.name = name;
        this.isAlive = true;
        this.#updated = 0;
        this.#bombs = [];
    }

    get updated() {
      return this.#updated;
    }

    get action() {
        return this.#action;
    }

    get causeOfDeath() {
        return this.#causeOfDeath;
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

    die(causeOfDeath) {
        this.#updated++;
        this.#action = FIRE;
        if (causeOfDeath) {
            this.#causeOfDeath = causeOfDeath;
        }
        this.isAlive = false;
    }

    takes(action) {
        this.#updated++;
        this.#action = action;
        if (action === SPACE) {
            return this;
        }
        if (action === LEFT) {
            return this.#playground.move(this, this.x - 1, this.y);
        }
        if (action === RIGHT) {
            return this.#playground.move(this, this.x + 1, this.y);
        }
        if (action === UP) {
            return this.#playground.move(this, this.x, this.y - 1);
        }
        if (action === DOWN) {
            return this.#playground.move(this, this.x, this.y + 1);
        }
        if (action[0] === BOMB) {
            let time = 3;
            let power = 2;
            if (action.length > 1) {
                time = parseInt(action[1]);
                power = parseInt(action[2]);
            }
            const bomb = this.#playground.plant(new Bomb(time, power), this.x, this.y);
            if (bomb !== undefined) {
                this.bind(bomb);
                return this;
            } else {
              return;
            }
        }
        throw Error(`Player '${this.name}' attempted to perform an illegal action '${action}'`);
    }

    bind(bomb) {
        bomb.players.push(this);
        this.#bombs.push(bomb);
        this.#playground.bombs.push(bomb);
        bomb.playground = this.#playground;
    }

    unbind() {
        const bombs = [];
        while (this.#bombs.length) {
            const bomb = this.#bombs.shift();
            if (bomb.isExploded()) {
                bomb.unbind();
                bomb.playground = undefined;
            } else {
                bombs.push(bomb);
            }
        }
        this.#bombs = bombs;
    }
}

export {Player};
