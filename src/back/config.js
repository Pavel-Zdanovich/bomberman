function poll(abortController){
    return fetch(
        this.url,
        {
            method: "POST",
            mode: "cors",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({
                x: this.player.x,
                y: this.player.y,
                map: this.playground.map.map(row => row.map(cell => cell.z[0].name)),
                players: this.playground.players,
                bombs: this.playground.bombs,
                fires: this.playground.fires
            }), // body data type must match "Content-Type" header
            signal: abortController.signal
        }
    )
        .then((response) => response.text())
        .catch((error) => {});
}

const map = [
    ['#', '#', '#', '#', '#', '#', '#', '#', '#'],
    ['#', ' ', ' ', ' ', ' ', ' ', ' ', ' ', '#'],
    ['#', ' ', '#', ' ', '#', ' ', '#', ' ', '#'],
    ['#', ' ', ' ', ' ', ' ', ' ', ' ', ' ', '#'],
    ['#', ' ', '#', ' ', '#', ' ', '#', ' ', '#'],
    ['#', ' ', ' ', ' ', ' ', ' ', ' ', ' ', '#'],
    ['#', ' ', '#', ' ', '#', ' ', '#', ' ', '#'],
    ['#', ' ', ' ', ' ', ' ', ' ', ' ', ' ', '#'],
    ['#', '#', '#', '#', '#', '#', '#', '#', '#']
];
const configs = [
    {
        name: 'A',
        x: 3,
        y: 3,
        url: 'http://localhost:8080',
        poll
    },
    {
        name: 'B',
        x: 7,
        y: 1,
        url: 'http://localhost:8081',
        poll
    },
    {
        name: 'C',
        x: 7,
        y: 7,
        url: 'http://localhost:8082',
        poll
    }
];

export {map, configs};