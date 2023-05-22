import {Cell} from "./cell.js";

class Playground {

    #map;

    #players;

    #bombs;

    #fires;

    constructor(map) {
        this.#map = new Array(map.length);
        for (let y = 0; y < map.length; y++) {
            this.#map[y] = new Array(map[y].length);
            for (let x = 0; x < map[y].length; x++) {
                this.#map[y][x] = new Cell(x, y, map[y][x], this);
            }
        }
        this.#players = [];
        this.#bombs = [];
        this.#fires = [];
    }

    #find() {
        const possibleCells = [];
        for (let y = 0; y < this.#map.length; y++) {
            for (let x = 0; x < this.#map[y].length; x++) {
                const cell = this.#map[y][x];
                if (cell.hasSpace()) {
                    possibleCells.push(cell);
                }
            }
        }
        if (possibleCells.length > 0) {
            const random = Math.floor(Math.random() * possibleCells.length);
            const cell = possibleCells[random];
            return [cell.x, cell.y];
        }
        throw Error("No free cell!");
    }

    #reorient(x, y) {
        if (x < 0) {
            x = this.#map[0].length - 1;
        }
        if (x > this.#map[0].length - 1) {
            x = 0;
        }
        if (y < 0) {
            y = this.#map.length - 1;
        }
        if (y > this.#map.length - 1) {
            y = 0;
        }
        return [x, y];
    }

    move(player, x, y) {
        [x, y] = this.#reorient(x, y);
        const cell = this.#map[y][x];
        player = cell.add(player);
        if (!player) {
            return;
        }
        const previousCell = this.#map[player.y][player.x];
        previousCell.remove(player); //cover the tracks on the previous cell
        player.x = x;
        player.y = y;
        return player;
    }

    plant(bomb, x, y) {
        [x, y] = this.#reorient(x, y);
        const cell = this.#map[y][x];
        bomb = cell.put(bomb);
        if (!bomb) {
            return;
        }
        bomb.x = x;
        bomb.y = y;
        return bomb;
    }

    set(fire, x, y) {
        [x, y] = this.#reorient(x, y);
        const cell = this.#map[y][x];
        fire = cell.light(fire);
        if (!fire) {
            return;
        }
        fire.x = x;
        fire.y = y;
        return fire;
    }

    spawn(player, x, y) {
        if (x === undefined || y === undefined) {
            [x, y] = this.#find();
        } else {
            [x, y] = this.#reorient(x, y);
        }
        const cell = this.#map[y][x];
        player = cell.add(player);
        player.x = cell.x;
        player.y = cell.y;
        return player;
    }

    calculate() {
        console.log(`calculate`);
        const bombs = [];
        while (this.#bombs.length) {
            const bomb = this.#bombs.shift();
            if (bomb.isPlanted()) {
                bomb.switchToTicking();
                bombs.push(bomb);
                continue;
            }
            if (bomb.isTicking()) {
                if (bomb.time === 1) {
                    bomb.explode(); //chain explosion with bombs that should explode on the countdown
                } else {
                    bomb.countdown();
                    bombs.push(bomb);
                }
            }
        }
        this.#bombs = bombs;

        const fires = [];
        while (this.#fires.length) {
            const fire = this.#fires.shift();
            if (fire.time === 1) {
                const cell = this.#map[fire.y][fire.x];
                cell.freeUp();
            } else {
                fire.countdown();
                fires.push(fire);
            }
        }
        this.#fires = fires;

        for (let i = 0; i < this.#players.length; i++) {
            const player = this.#players[i];
            if (!player.isAlive) {
                const fire = player.causeOfDeath;
                for (const bomb of fire.bombs) {
                    if (bomb.time === 1) {
                        // console.log(`'${player.name}' killed by '${bomb.players.map(p => p.name)}'`);
                        bomb.players.filter(p => p !== player).forEach(p => {
                            p.score = p.score + 10;
                        });
                    } else {
                        // console.log(`'${player.name}' killed with the assistance of '${bomb.players.map(p => p.name)}'`);
                        bomb.players.filter(p => p !== player).forEach(p => {
                            p.score = p.score + 5;
                        });
                    }
                }
            }
            player.unbind();
        }
    }

    get map() {
        return this.#map;
    }

    get players() {
        return this.#players;
    }

    get bombs() {
        return this.#bombs;
    }

    get fires() {
        return this.#fires;
    }

    isPlayers(z) {
        return z.every(player => this.#players.includes(player));
    }
}

export {Playground};
