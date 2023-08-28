import { Injectable } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { DialogBoxService } from "./dialogBox/dialogBox.service";
import { RxStompService } from "./service/rx-stomp.service";



@Injectable({
    providedIn: 'root'
})
export class CommonService {

    router: Router;
    dialogBoxService: DialogBoxService;
    activatedRoute: ActivatedRoute;
    rxStompService: RxStompService;
    constructor(router: Router, dialogBoxService: DialogBoxService, activatedRoute: ActivatedRoute, rxStompService: RxStompService) {
        this.router = router;
        this.dialogBoxService = dialogBoxService;
        this.activatedRoute = activatedRoute;
        this.rxStompService = rxStompService;
    }
}