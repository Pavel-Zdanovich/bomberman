import {Component, OnDestroy} from "@angular/core";
// @ts-ignore
import {update} from "../../back/server.js";

@Component({
  selector: 'control',
  templateUrl: './control.component.html',
  styleUrls: ['./control.component.css']
})
export class ControlComponent implements OnDestroy {
  gameIsRunning: boolean = false;
  id: number = -1;
  abortController = new AbortController();
  timeout: number = 1000;
  startAndStop() {
    if (this.gameIsRunning) {
      console.log("stop");
      clearInterval(this.id);
      this.abortController.abort();
    } else {
      console.log("start");
      this.id = setInterval(() => update(this.abortController), this.timeout);
    }
    this.gameIsRunning = !this.gameIsRunning;
  }
  setTimeout(timeout: string) {
    this.timeout = parseInt(timeout);
  };
  ngOnDestroy() {
    clearInterval(this.id);
    this.abortController.abort();
  }
}
