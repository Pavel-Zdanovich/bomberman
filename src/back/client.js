class Client {

    player;

    url;

    color;

    #request;

    constructor(player, url, color, request) {
        this.player = player;
        this.url = url;
        this.color = color;
        this.#request = request;
    }

    request(abortController, playground) {
        if (!this.player.isAlive) {
            this.player.spawn();
            return Promise.resolve();
        }
        const promise = this.#request(abortController, this.url, this.player, playground);
        promise.then((action) => {
            if (action) {
                this.player.takes(action)
            }
        });
        return promise;
    }
}

export {Client};
