import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
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

    constructor(private authService: AuthService, private storageService: StorageService, private router: Router) {};

   ngOnInit(): void {
       if(this.storageService.isLoggedIn()) {
        this.isLoggedIn = true;
        this.roles = this.storageService.getUser().roles;
        this.reloadPage();
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
            this.errorMessage = err.message;
            this.isLoginFailed = true;
        }
      })
   }

   reloadPage(): void {
    this.router.navigate(['/profile']);
    
   }



}