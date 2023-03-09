import { Injectable } from "@angular/core";
import { CanActivate, Router, UrlTree } from "@angular/router";
import { Observable } from "rxjs";
import { UserService } from "src/app/service/user.service";



@Injectable({
    providedIn: 'root'
})
export class AdminRoleGuard implements CanActivate {

   constructor(private userService: UserService, private router: Router) {}

    
    canActivate(): Observable<boolean | UrlTree> {
        return this.userService.getAdminBoard() || this.router.parseUrl("home");
    }

}