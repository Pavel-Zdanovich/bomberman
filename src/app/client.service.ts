import {Injectable} from "@angular/core";
// @ts-ignore
import {clients} from "../back/server.js";
import {Observable, of} from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class ClientService {
    getClients(): Observable<any> {
        return of(clients);
    }
}
