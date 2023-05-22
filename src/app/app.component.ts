import {Component} from '@angular/core';
// @ts-ignore
import {init, playground} from "../back/server.js";
import {ClientService} from "./client.service";

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent {
    playground: any;
    clients: any;
    timeout: number;

    constructor(private clientService: ClientService) {
        init();
        this.playground = playground;
        this.clientService.getClients().subscribe(clients => this.clients = clients);
        this.timeout = 1000;
    }

    setTimeout(event: number) {
        this.timeout = event;
    }
}
