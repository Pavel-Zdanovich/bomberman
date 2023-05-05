import {playground} from "../back/server.js";

const tableElement = document.getElementsByTagName("table").item(0);
const render = () => { //TODO change full rewrite to hot replace
    tableElement.innerText = "";
    for (let y = 0; y < playground.map.length; y++) {
        const rowElement = document.createElement("tr");
        for (let x = 0; x < playground.map[y].length; x++) {
            const cellElement = document.createElement("td");
            cellElement.innerText = playground.map[y][x].z.map(o => o.name);
            rowElement.append(cellElement);
        }
        tableElement.append(rowElement);
    }
};

export {render};