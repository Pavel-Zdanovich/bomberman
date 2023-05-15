import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  DoCheck,
  ElementRef,
  Input,
  OnInit,
  ViewChild
} from "@angular/core";
import {animate, AnimationBuilder, AnimationMetadata, keyframes, style} from "@angular/animations";
// @ts-ignore
import {BOMB, DOWN, FIRE, LEFT, RIGHT, SPACE, UP} from "../../../game/alphabet.js";

@Component({
  selector: '[player-component]',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.css']
})
export class PlayerComponent implements OnInit, DoCheck, AfterViewInit {
  // @ts-ignore
  @ViewChild('element', { read: ElementRef }) element: ElementRef;
  @Input() svg: any;
  @Input() map: any;
  @Input() clients: any;
  @Input() i: any;
  private client: any;
  private player: any;
  private updated: number = -1;
  private action: string = '';
  constructor(
    private animationBuilder: AnimationBuilder,
    private cdr: ChangeDetectorRef
  ) {}
  ngOnInit() {
    this.client = this.clients[this.i];
    this.player = this.client.player;
    this.updated = this.player.updated;
    this.action = this.player.action;
  }
  ngDoCheck() {
    if (this.updated < this.player.updated) {
      console.log(`'${this.player.name}' '${this.player.action}'`);
      this.updated = this.player.updated;
      this.anim(this.player.action, '300ms');
    }
  }
  anim(action: string, timings: string | number) {
    let animation: AnimationMetadata | AnimationMetadata[];
    switch (action) {
      case SPACE: {
        animation = [
          animate(timings, style({ opacity: '1' }))
        ];
        break;
      }
      case LEFT: {
        animation = [
          animate(timings, style({
            opacity: '1',
            transform: `translate(${this.player.x * 100}px, ${this.player.y * 100}px)`
          }))
        ];
        break;
      }
      case RIGHT: {
        animation = [
          animate(timings, style({
            opacity: '1',
            transform: `translate(${this.player.x * 100}px, ${this.player.y * 100}px)`
          }))
        ];
        break;
      }
      case UP: {
        animation = [
          animate(timings, style({
            opacity: '1',
            transform: `translate(${this.player.x * 100}px, ${this.player.y * 100}px)`
          }))
        ];
        break;
      }
      case DOWN: {
        animation = [
          animate(timings, style({
            opacity: '1',
            transform: `translate(${this.player.x * 100}px, ${this.player.y * 100}px)`
          }))
        ];
        break;
      }
      case BOMB: {
        animation = [
          animate(timings, style({
            opacity: '1',
            transform: `translate(${this.player.x * 100}px, ${this.player.y * 100}px)`
          }))
        ];
        break;
      }
      case FIRE: {
        animation = [
          animate(timings, style({ opacity: '0' }))
        ];
        break;
      }
      default: {
        console.log(`Unknown action: '${action}'`);
        return;
      }
    }
    const animationFactory = this.animationBuilder.build(animation);
    const animationPlayer = animationFactory.create(this.element.nativeElement);
    animationPlayer.play();
  }
  ngAfterViewInit() {
    this.element.nativeElement.style.fill = this.client.color;
    let offsetX = 0;
    let offsetY = 0;
    this.element.nativeElement.style.transform = `translate(${(this.player.x * 100) + offsetX}px, ${(this.player.y * 100) + offsetY}px)`;
  }
}
