import {Component} from '@angular/core';
// @ts-ignore
import {init, playground, clients} from "../back/server.js";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  playground;
  clients;
  constructor() {
    init();
    this.playground = playground;
    this.clients = clients;
  }
}
