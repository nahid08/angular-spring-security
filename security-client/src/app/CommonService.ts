import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { DialogBoxService } from "./dialogBox/dialogBox.service";



@Injectable({
    providedIn: 'root'
})
export class CommonService {

    router: Router;
    dialogBoxService: DialogBoxService;
    constructor(router: Router, dialogBoxService: DialogBoxService) {
        this.router = router;
        this.dialogBoxService = dialogBoxService;
        
    }
}