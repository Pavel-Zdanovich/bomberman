import {Fire} from "./fire.js";
import {BOMB} from "./alphabet.js";

const State = Object.freeze(
    {
        PLANTED: "PLANTED",
        TICKING: "TICKING",
        EXPLODED: "EXPLODED"
    }
);

class Bomb {

    x;

    y;

    time;

    power;

    #state;

    #playground;

    #players;

    #fires;

    constructor(time, power) {
        if (isNaN(time) || time < 1 || time > 9) {
            throw Error(`Invalid time: '${time}'`);
        }
        this.time = time;
        if (isNaN(power) || power < 1 || power > 9) {
            throw Error(`Invalid power: '${power}'`);
        }
        this.power = power;
        this.#state = State.PLANTED;
        this.#players = [];
        this.#fires = [];
    }

    get name() {
        return BOMB;
    }

    static isBomb(c) {
        return c.name === BOMB;
    }

    isPlanted() {
        return this.#state === State.PLANTED;
    }

    switchToTicking() {
        this.#state = State.TICKING;
    }

    isTicking() {
        return this.#state === State.TICKING;
    }

    isExploded() {
        return this.#state === State.EXPLODED;
    }

    get playground() {
        return this.#playground;
    }

    set playground(playground) {
        this.#playground = playground;
    }

    get players() {
        return this.#players;
    }

    get fires() {
        return this.#fires;
    }

    countdown() {
        this.time--;
    }

    explode(fire) {
        if (this.#state !== State.EXPLODED) {
            this.#state = State.EXPLODED;
            const time = 2;
            if (!fire) {
                fire = new Fire(time);
            }
            this.#put(fire, this.x, this.y);

            for (let i = this.y - 1; i > this.y - this.power; i--) { //U
                if (!this.#put(new Fire(time), this.x, i)) {
                    break;
                }
            }
            for (let i = this.x - 1; i > this.x - this.power; i--) { //L
                if (!this.#put(new Fire(time), i, this.y)) {
                    break;
                }
            }
            for (let i = this.y + 1; i < this.y + this.power; i++) { //D
                if (!this.#put(new Fire(time), this.x, i)) {
                    break;
                }
            }
            for (let i = this.x + 1; i < this.x + this.power; i++) { //R
                if (!this.#put(new Fire(time), i, this.y)) {
                    break;
                }
            }
        }
        return fire;
    }

    #put(fire, x, y) {
        fire = this.#playground.set(fire, x, y);
        if (fire !== undefined) {
            this.bind(fire);
            return true;
        } else {
            return false;
        }
    }

    bind(fire) {
        fire.bombs.push(this);
        this.#fires.push(fire);
        if (!this.#playground.fires.includes(fire)) {
            this.#playground.fires.push(fire);
            fire.playground = this.#playground;
        }
    }

    unbind() {
        const fires = [];
        while (this.#fires.length) {
            const fire = this.#fires.shift();
            if (fire.time === 1) {
                fire.playground = undefined;
            } else {
                fires.push(fire);
            }
        }
        this.#fires = fires;
    }
}

export {Bomb};