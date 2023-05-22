import {BOMB, DOWN, FIRE, LEFT, RIGHT, SPACE, UP} from "./alphabet.js";
import {Bomb} from "./bomb.js";

class Player {

    name;

    x;

    y;

    isAlive;

    score;

    #updated;

    #action;

    #causeOfDeath

    #bombs;

    #playground;

    constructor(name, playground) {
        if (typeof name !== "string") {
            throw Error(`Invalid name: '${name}'`);
        }
        this.name = name;
        this.x = -1;
        this.y = -1;
        this.isAlive = true;
        this.score = 0;
        this.#updated = 0;
        this.#action = undefined;
        this.#bombs = [];
        this.#playground = playground;
        this.#playground.players.push(this);
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

    get bombs() {
        return this.#bombs;
    }

    die(causeOfDeath) {
        this.isAlive = false;
        this.#updated++;
        this.#action = FIRE;
        if (causeOfDeath) {
            this.#causeOfDeath = causeOfDeath;
        }
    }

    spawn(x, y) {
        this.isAlive = true;
        this.#updated++;
        this.#action = SPACE;
        this.#causeOfDeath = undefined;
        this.#playground.spawn(this, x, y);
    }

    takes(action) {
        if (action === SPACE) {
            this.#updated++;
            this.#action = action;
            return this;
        }
        if (action === LEFT) {
            if (this.#playground.move(this, this.x - 1, this.y)) {
                this.score = this.score + 1;
                this.#updated++;
                this.#action = action;
                return this;
            } else {
                return;
            }
        }
        if (action === RIGHT) {
            if (this.#playground.move(this, this.x + 1, this.y)) {
                this.score = this.score + 1;
                this.#updated++;
                this.#action = action;
                return this;
            } else {
                return;
            }
        }
        if (action === UP) {
            if (this.#playground.move(this, this.x, this.y - 1)) {
                this.score = this.score + 1;
                this.#updated++;
                this.#action = action;
                return this;
            } else {
                return;
            }
        }
        if (action === DOWN) {
            if (this.#playground.move(this, this.x, this.y + 1)) {
                this.score = this.score + 1;
                this.#updated++;
                this.#action = action;
                return this;
            } else {
                return;
            }
        }
        if (action[0] === BOMB) {
            let time = 3;
            let power = 2;
            if (action.length > 1) {
                time = parseInt(action[1]);
                power = parseInt(action[2]);
            }
            const bomb = this.#playground.plant(new Bomb(time, power), this.x, this.y);
            if (bomb) {
                this.score = this.score + 2;
                this.bind(bomb);
                this.#updated++;
                this.#action = action[0];
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
