import {Component, Input, OnChanges, SimpleChanges} from '@angular/core';

@Component({
  selector: 'client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.css']
})
export class ClientComponent implements OnChanges {
  @Input() clients: any;
  ngOnChanges(changes: SimpleChanges): void {
    console.log(changes);
  }
}
