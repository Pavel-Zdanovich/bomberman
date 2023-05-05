import {FIRE, SPACE, WALL} from "./alphabet.js";
import {Space} from "./space.js";
import {Wall} from "./wall.js";
import {Bomb} from "./bomb.js";

class Cell {

    x;

    y;

    z;

    #playground;

    constructor(x, y, z, playground) {
        this.x = x;
        this.y = y;
        this.z = [];
        this.#playground = playground;
        if (z.length === 1) {
            const c = z[0];
            if (c === SPACE) {
                this.z.push(new Space());
                return;
            }
            if (c === WALL) {
                this.z.push(new Wall());
                return;
            }
        }
        throw Error(`Invalid game object '${z}' for cell initialization. Use cell methods instead.`);
    }

    freeUp() {
        const c = this.z[0];
        if (c.name === SPACE) {
            return; //TODO
        }
        if (c.name === WALL) {
            return; //TODO
        }
        if (c.name === FIRE) {
            this.z = [new Space()];
            return; //TODO
        }
        if (this.z.length === 1) {
            if (Bomb.isBomb(c)) {
                throw Error(`Free up space in the cell [${this.x}, ${this.y}] with bomb '${JSON.stringify(c)}'`);
            }
        }
        if (this.#playground.isPlayers(this.z)) {
            throw Error(`Free up space in the cell [${this.x}, ${this.y}] with players '${JSON.stringify(this.z)}'`);
        }
        const z = this.z.slice(1);
        if (Bomb.isBomb(c) && this.#playground.isPlayers(z)) {
            throw Error(`Free up space in the cell [${this.x}, ${this.y}] with bomb '${JSON.stringify(c)}' and players '${JSON.stringify(z)}'`);
        }
    }

    build(wall) {
        const c = this.z[0];
        if (c.name === SPACE) {
            throw Error(`Build the wall in the cell [${this.x}, ${this.y}] with space '${JSON.stringify(c)}'`);
        }
        if (c.name === WALL) {
            throw Error(`Build the wall in the cell [${this.x}, ${this.y}] with wall '${JSON.stringify(c)}'`);
        }
        if (c.name === FIRE) {
            throw Error(`Build the wall in the cell [${this.x}, ${this.y}] with fire '${JSON.stringify(c)}'`);
        }
        if (this.z.length === 1) {
            if (Bomb.isBomb(c)) {
                throw Error(`Build the wall in the cell [${this.x}, ${this.y}] with bomb '${JSON.stringify(c)}'`);
            }
        }
        if (this.#playground.isPlayers(this.z)) {
            throw Error(`Build the wall in the cell [${this.x}, ${this.y}] with players '${JSON.stringify(this.z)}'`);
        }
        const z = this.z.slice(1);
        if (Bomb.isBomb(c) && this.#playground.isPlayers(z)) {
            throw Error(`Build the wall in the cell [${this.x}, ${this.y}] with bomb '${JSON.stringify(c)}' and players '${JSON.stringify(z)}'`);
        }
    }

    light(fire) {
        const c = this.z[0];
        if (c.name === SPACE) {
            this.z = [fire];
            return fire;
        }
        if (c.name === WALL) {
            return; //TODO
        }
        if (c.name === FIRE) {
            return c; //TODO
        }
        if (this.z.length === 1) {
            if (Bomb.isBomb(c)) {
                fire = c.explode(fire);
                this.z = [fire];
                return fire;
            }
        }
        if (this.#playground.isPlayers(this.z)) {
            for (const player of this.z) {
                player.die(fire);
            }
            this.z = [fire];
            return fire;
        }
        const z = this.z.slice(1);
        if (Bomb.isBomb(c) && this.#playground.isPlayers(z)) {
            fire = c.explode(fire);
            for (const player of z) {
                player.die(fire);
            }
            this.z = [fire];
            return fire;
        }
    }

    put(bomb) {
        const c = this.z[0];
        if (c.name === SPACE) {
            throw Error(`Plant the bomb '${JSON.stringify(bomb)}' in the cell [${this.x}, ${this.y}] with space '${JSON.stringify(c)}'`);
        }
        if (c.name === WALL) {
            throw Error(`Plant the bomb '${JSON.stringify(bomb)}' in the cell [${this.x}, ${this.y}] with wall '${JSON.stringify(c)}'`);
        }
        if (c.name === FIRE) {
            throw Error(`Plant the bomb '${JSON.stringify(bomb)}' in the cell [${this.x}, ${this.y}] with fire '${JSON.stringify(c)}'`);
        }
        if (this.z.length === 1) {
            if (Bomb.isBomb(c)) {
                throw Error(`Plant the bomb '${JSON.stringify(bomb)}' in the cell [${this.x}, ${this.y}] with bomb '${JSON.stringify(c)}'`);
            }
        }
        if (this.#playground.isPlayers(this.z)) {
            this.z.unshift(bomb);
            return bomb;
        }
        const z = this.z.slice(1);
        if (Bomb.isBomb(c) && this.#playground.isPlayers(z)) {
            // throw Error(`Plant the bomb '${JSON.stringify(bomb)}' in the cell [${this.x}, ${this.y}] with bomb and players '${this.z}'`);
            return;
        }
    }

    add(player) {
        const c = this.z[0];
        if (c.name === SPACE) {
            this.z = [player];
            return player;
        }
        if (c.name === WALL) {
            return; //TODO
        }
        if (c.name === FIRE) {
            return; //TODO
        }
        if (this.z.length === 1) {
            if (Bomb.isBomb(c)) {
                return; //TODO
            }
        }
        if (this.#playground.isPlayers(this.z)) {
            this.z.push(player);
            return player;
        }
        const z = this.z.slice(1);
        if (Bomb.isBomb(c) && this.#playground.isPlayers(z)) {
            return; //TODO
        }
    }

    remove(player) {
        const c = this.z[0];
        if (c.name === SPACE) {
            throw Error(`Remove the player '${JSON.stringify(player)}' from the cell [${this.x}, ${this.y}] with space '${JSON.stringify(c)}'`);
        }
        if (c.name === WALL) {
            throw Error(`Remove the player '${JSON.stringify(player)}' from the cell [${this.x}, ${this.y}] with wall '${JSON.stringify(c)}'`);
        }
        if (c.name === FIRE) {
            throw Error(`Remove the player '${JSON.stringify(player)}' from the cell [${this.x}, ${this.y}] with fire '${JSON.stringify(c)}'`);
        }
        if (this.z.length === 1) {
            if (Bomb.isBomb(c)) {
                throw Error(`Remove the player '${JSON.stringify(player)}' from the cell [${this.x}, ${this.y}] with bomb '${JSON.stringify(c)}'`);
            }
        }
        if (this.#playground.isPlayers(this.z)) {
            if (this.z.length === 1) {
                this.z = [new Space()];
                return; //TODO
            } else {
                const index = this.z.indexOf(player);
                this.z.splice(index, 1);
                return; //TODO
            }
        }
        const z = this.z.slice(1);
        if (Bomb.isBomb(c) && this.#playground.isPlayers(z)) {
            const index = this.z.indexOf(player);
            this.z.splice(index, 1);
            return; //TODO
        }
    }

    isSpace() {
        return this.z[0].name === SPACE;
    }
}

export {Cell};