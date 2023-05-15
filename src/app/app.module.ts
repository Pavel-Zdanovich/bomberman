import {NgModule, NO_ERRORS_SCHEMA} from "@angular/core";
import {BrowserModule} from "@angular/platform-browser";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {MatIconModule} from "@angular/material/icon";
import {AppComponent} from "./app.component";
import {ClientComponent} from "./client/client.component";
import {ControlComponent} from "./control/control.component";
import {PlaygroundComponent} from "./playground/playground.component";
import {PlayerComponent} from "./playground/player/player.component";

@NgModule({
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        MatIconModule
    ],
  declarations: [
    AppComponent,
    ControlComponent,
    ClientComponent,
    PlaygroundComponent,
    PlayerComponent
  ],
  bootstrap: [AppComponent],
  schemas: [
    NO_ERRORS_SCHEMA
  ]
})
export class AppModule { }