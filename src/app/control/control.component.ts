import {Component, OnDestroy} from "@angular/core";
// @ts-ignore
import {update} from "../../back/server.js";

@Component({
  selector: 'control',
  templateUrl: './control.component.html',
  styleUrls: ['./control.component.css']
})
export class ControlComponent implements OnDestroy {
  gameIsRunning = false;
  private id = -1;
  private abortController: any;
  min = 0.2;
  max = 2.0;
  step = 0.6;
  private timeout = 1000;
  startAndStop() {
    if (this.gameIsRunning) {
      this.stop();
    } else {
      this.start();
    }
  }

  private stop() {
    console.log("stop");
    this.abortController.abort();
    clearInterval(this.id);
    this.gameIsRunning = false;
  }

  private start() {
    console.log("start");
    this.abortController = new AbortController();
    this.id = setInterval(() => update(this.abortController), this.timeout);
    this.gameIsRunning = true;
  }

  setTimeout(timeout: string) {
    this.stop();
    this.timeout = 1000 / parseFloat(timeout);
  };
  ngOnDestroy() {
    this.stop();
  }
}
