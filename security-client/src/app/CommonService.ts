import { Injectable } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { DialogBoxService } from "./dialogBox/dialogBox.service";



@Injectable({
    providedIn: 'root'
})
export class CommonService {

    router: Router;
    dialogBoxService: DialogBoxService;
    activatedRoute: ActivatedRoute;
    constructor(router: Router, dialogBoxService: DialogBoxService, activatedRoute: ActivatedRoute) {
        this.router = router;
        this.dialogBoxService = dialogBoxService;
        this.activatedRoute = activatedRoute;
    }
}