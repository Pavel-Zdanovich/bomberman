import {playground} from "../back/server.js";

const set = (gameIsRunning, timeout, abortController, main) => {
    let id;
    const startButtonElement = document.createElement("button");
    startButtonElement.textContent = ">";
    startButtonElement.addEventListener("click", () => {
        if (gameIsRunning) {
            startButtonElement.textContent = ">";
            clearInterval(id);
            abortController.abort();
        } else {
            startButtonElement.textContent = "||";
            id = setInterval(main, timeout);
        }
        gameIsRunning = !gameIsRunning;
    });
    document.body.append(startButtonElement);

    const timeoutLabelElement = document.createElement("label");
    timeoutLabelElement.setAttribute("for", "timeout");
    timeoutLabelElement.textContent = "timeout";
    const timeoutInputElement = document.createElement("input");
    timeoutInputElement.setAttribute("id", "timeout");
    timeoutInputElement.setAttribute("name", "timeout");
    document.body.append(timeoutLabelElement, timeoutInputElement);
    timeoutInputElement.addEventListener("focusout", () => {
        const input = parseInt(timeoutInputElement.value);
        if (!isNaN(input)) {
            timeout = input;
            console.log(timeout);
            main();
        }
    });

    const inputs = [];
    for (const player of playground.players) {
        const labelElement = document.createElement("label");
        labelElement.setAttribute("for", player.name);
        labelElement.textContent = player.name;
        const inputElement = document.createElement("input");
        inputElement.setAttribute("id", player.name);
        inputElement.setAttribute("name", player.name);
        document.body.append(labelElement, inputElement);
        inputs.push(inputElement);
    }
    document.body.addEventListener("keypress", (event) => {
        if (event.key === "Enter") {
            main();
        }
    })
}

export {set};