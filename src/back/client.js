class Client {

    playground;

    player;

    url;

    #poll;

    constructor(playground, player, url, poll) {
        this.playground = playground;
        this.player = player;
        this.url = url;
        this.#poll = poll;
    }

    poll(abort) {
        if (!this.player.isAlive) {
            this.player.isAlive = true;
            this.playground.spawn(this.player);
            return Promise.resolve();
        }
        const promise = this.#poll(abort);
        promise.then((action) => {
            if (action) {
                this.player.takes(action);
            }
        });
        return promise;
    }
}

export {Client};