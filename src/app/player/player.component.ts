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
import {animate, AnimationBuilder, AnimationMetadata, style} from "@angular/animations";
// @ts-ignore
import {BOMB, DOWN, LEFT, RIGHT, SPACE, UP} from "../../game/alphabet.js";

@Component({
  selector: '[player-component]',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.css']
})
export class PlayerComponent implements OnInit, DoCheck, AfterViewInit {
  // @ts-ignore
  @ViewChild('path', { read: ElementRef }) path: ElementRef;
  @Input() stepX: any;
  @Input() stepY: any;
  @Input() player: any;
  private updated: number | undefined;
  private action: string | undefined;
  constructor(
    private animationBuilder: AnimationBuilder,
    private cdr: ChangeDetectorRef
  ) {}
  ngOnInit() {
    this.updated = this.player.updated;
    this.action = this.player.action;
  }
  ngDoCheck() {
    if (this.updated !== this.player.updated) {
      console.log(`'${this.player.name}' '${this.player.action}'`);
      this.updated = this.player.updated;
      this.anim(this.player.action, '250ms');
    }
  }
  anim(action: string, timings: string | number) {
    let animation: AnimationMetadata | AnimationMetadata[];
    switch (action) {
      case SPACE: {
        animation = [
          animate(timings, style({
            stroke: 'red'
          }))
        ];
        break;
      }
      case LEFT: {
        animation = [
          animate(timings, style({
            stroke: 'orange',
            transform: `translate(${this.stepX * this.player.x}px, ${this.stepY * this.player.y}px)`
          }))
        ];
        break;
      }
      case RIGHT: {
        animation = [
          animate(timings, style({
            stroke: 'yellow',
            transform: `translate(${this.stepX * this.player.x}px, ${this.stepY * this.player.y}px)`
          }))
        ];
        break;
      }
      case UP: {
        animation = [
          animate(timings, style({
            stroke: 'green',
            transform: `translate(${this.stepX * this.player.x}px, ${this.stepY * this.player.y}px)`
          }))
        ];
        break;
      }
      case DOWN: {
        animation = [
          animate(timings, style({
            stroke: 'blue',
            transform: `translate(${this.stepX * this.player.x}px, ${this.stepY * this.player.y}px)`
          }))
        ];
        break;
      }
      case BOMB: {
        animation = [
          animate(timings, style({ stroke: 'purple' }))
        ];
        break;
      }
      default: {
        console.log(`Unknown action: '${action}'`);
        return;
      }
    }
    const animationFactory = this.animationBuilder.build(animation);
    const animationPlayer = animationFactory.create(this.path.nativeElement);
    animationPlayer.play();
  }
  ngAfterViewInit() {
    this.path.nativeElement.style.transform = `translate(${this.stepX * this.player.x}px, ${this.stepY * this.player.y}px)`;
    // this.path.nativeElement.style.transformOrigin = `${this.stepX * this.player.x}px ${this.stepY * this.player.y}px`;
  }
}
