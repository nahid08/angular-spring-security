import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";


@Injectable({
    providedIn: 'root'
})
export class SpinnerService {

    visibilty: BehaviorSubject<boolean>;

    constructor() {
        this.visibilty = new BehaviorSubject(false);
    }

    show() {
        this.visibilty.next(true);
    }

    hide() {
        this.visibilty.next(false);
    }

}