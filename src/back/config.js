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
        color: '#AB4C40',
        request,
    },
    {
        name: 'B',
        x: 7,
        y: 1,
        url: 'http://localhost:8081',
        color: '#6B8644',
        request,
    },
    {
        name: 'C',
        x: 7,
        y: 7,
        url: 'http://localhost:8082',
        color: '#5259AB',
        request,
    }
];

function request(abortController, url, player, playground) {
    return fetch(
        url,
        {
            method: "POST",
            mode: "cors",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({
                x: player.x,
                y: player.y,
                map: playground.map.map(row => row.map(cell => cell.z[0].name)),
                players: playground.players,
                bombs: playground.bombs,
                fires: playground.fires
            }),
            signal: abortController.signal
        }
    )
        .then((response) => response.text())
        .catch((error) => {});
}

export {map, configs};
