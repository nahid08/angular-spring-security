import { Component, OnInit } from "@angular/core";
import { AuthService } from "../service/auth.service";
import { StorageService } from "../service/storage.service";

@Component({
    selector: 'login',
    templateUrl: './login.html',
    styleUrls: []
})
export class LoginComponent implements OnInit {

    username: string = "";
    password: string = "";
    isLoggedIn: boolean = false;
    isLoginFailed: boolean = false;
    errorMessage: boolean = false;
    roles: string[] = [];

    constructor(private authService: AuthService, private storageService: StorageService) {};

   ngOnInit(): void {
       if(this.storageService.isLoggedIn()) {
        this.isLoggedIn = true;
        this.roles = this.storageService.getUser().roles;
       }
   }

   onSubmit(): void {
      this.authService.login(this.username, this.password).subscribe({
        next: data => {
            this.storageService.saveUser(data);

            this.isLoginFailed = false;
            this.isLoggedIn = true;
            this.roles = this.storageService.getUser().roles;
            this.reloadPage();
        },
        error: err => {
            this.errorMessage = err.error.message;
            this.isLoginFailed = true;
        }
      })
   }

   reloadPage(): void {
    window.location.reload();
   }



}