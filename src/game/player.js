import {BOMB, DOWN, LEFT, RIGHT, SPACE, UP} from "./alphabet.js";
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
        if (causeOfDeath) {
            this.#causeOfDeath = causeOfDeath;
        }
        this.isAlive = false;
    }

    takes(action) {
        this.#updated++;
        this.#action = undefined;
        if (action === SPACE) {
            this.#action = action;
            return this;
        }
        if (action === LEFT) {
          if (this.#playground.move(this, this.x - 1, this.y)) {
            this.#action = action;
            return this;
          } else {
            return;
          }
        }
        if (action === RIGHT) {
            if (this.#playground.move(this, this.x + 1, this.y)) {
              this.#action = action;
              return this;
            } else {
              return;
            }
        }
        if (action === UP) {
            if (this.#playground.move(this, this.x, this.y - 1)) {
              this.#action = action;
              return this;
            } else {
              return;
            }
        }
        if (action === DOWN) {
            if (this.#playground.move(this, this.x, this.y + 1)) {
              this.#action = action;
              return;
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
            if (bomb !== undefined) {
                this.#action = action;
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
