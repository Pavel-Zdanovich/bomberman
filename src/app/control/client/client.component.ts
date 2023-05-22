import {Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
    selector: 'client',
    templateUrl: './client.component.html',
    styleUrls: ['./client.component.css']
})
export class ClientComponent {
    @Input() client: any;
    @Output() nameEvent = new EventEmitter();
    @Output() urlEvent = new EventEmitter();
    @Output() colorEvent = new EventEmitter();

    setName(name: string) {
        this.nameEvent.emit({client: this.client, name});
    }

    setUrl(url: string) {
        this.urlEvent.emit({client: this.client, url});
    }

    setColor(color: string) {
        this.colorEvent.emit({client: this.client, color});
    }
}
