import {Component, Input} from "@angular/core";

@Component({
  selector: 'playground',
  templateUrl: './playground.component.html',
  styleUrls: ['./playground.component.css']
})
export class PlaygroundComponent {
  @Input() map: any;
  @Input() players: any;
  hasWall(cell: any) {
    return cell.hasWall();
  }
  hasFire(cell: any) {
    return cell.hasFire();
  }
  hasBomb(cell: any) {
    return cell.hasBomb();
  }
}
