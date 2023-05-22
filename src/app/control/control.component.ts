import {Component, DoCheck, EventEmitter, Input, OnDestroy, Output} from "@angular/core";
// @ts-ignore
import {update} from "../../back/server.js";

@Component({
    selector: 'control',
    templateUrl: './control.component.html',
    styleUrls: ['./control.component.css']
})
export class ControlComponent implements DoCheck, OnDestroy {
    @Input() clients: any;
    @Input() timeout: any;
    @Output() timeoutEvent = new EventEmitter<number>();
    gameIsRunning = false;
    private id = -1;
    private abortController: any;
    min = 0.5;
    max = 2.5;
    step = 0.75;
    speed = 1;

    startAndStop() {
        if (this.gameIsRunning) {
            this.stop();
        } else {
            this.start();
        }
    }

    private stop() {
        console.log("stop");
        this.gameIsRunning = false;
        this.abortController.abort();
        clearInterval(this.id);
    }

    private start() {
        console.log("start");
        this.gameIsRunning = true;
        this.abortController = new AbortController();
        update(this.abortController);
        this.id = setInterval(() => update(this.abortController), this.timeout / this.speed);
    }

    setSpeed(speed: number) {
        this.speed = speed;
        this.timeoutEvent.emit(this.timeout / this.speed);
    };

    ngDoCheck(): void {
        let clients = [];
        let client = this.clients[0];
        let max = this.clients[0].player.score;
        clients.push(client);
        for (let i = 1; i < this.clients.length; i++) {
            client = this.clients[i];
            if (client.player.score > max) {
                clients = [client];
                max = client.player.score;
            } else if (client.player.score === max) {
                clients.push(client);
            }
            client.isLeader = false;
        }
        clients.forEach(client => client.isLeader = true);
    }

    setName(event: { client: any, name: string }) {
        if (this.clients.filter((client: any) => client !== event.client).some((client: any) => client.player.name === event.name)) {
            console.log(`Name '${event.name}' already exists!`);
        } else {
            event.client.player.name = event.name;
        }
    }

    setUrl(event: { client: any, url: string }) {
        if (this.clients.filter((client: any) => client !== event.client).some((client: any) => client.url === event.url)) {
            console.log(`URL '${event.url}' already exists!`);
        } else {
            event.client.url = event.url;
        }
    }

    setColor(event: { client: any, color: string }) {
        if (this.clients.filter((client: any) => client !== event.client).some((client: any) => client.color === event.color)) {
            console.log(`Color '${event.color}' already exists!`);
        } else {
            event.client.color = event.color;
        }
    }

    ngOnDestroy() {
        this.stop();
    }
}
