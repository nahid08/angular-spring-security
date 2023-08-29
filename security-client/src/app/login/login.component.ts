import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { catchError, of } from "rxjs";
import { CommonService } from "../CommonService";
import { DialogBoxService } from "../dialogBox/dialogBox.service";
import { AuthService } from "../service/auth.service";
import { StorageService } from "../service/storage.service";

@Component({
    selector: 'login',
    templateUrl: './login.html',
    styleUrls: ['./login.css']
})
export class LoginComponent implements OnInit {

    username: string = "";
    password: string = "";
    isLoggedIn: boolean = false;
    isLoginFailed: boolean = false;
    errorMessage: boolean = false;
    roles: string[] = [];
    passwordFormat: string = "password"

    constructor(private authService: AuthService, private storageService: StorageService,
        private commonService: CommonService) {};

   ngOnInit(): void {
       if(this.storageService.isLoggedIn()) {
        this.isLoggedIn = true;
        this.roles = this.storageService.getUser().roles;
        this.reloadPage();
       }
   }

   onSubmit(): void {

      

    //   this.authService.login(this.username, this.password).subscribe({
    //     next: data => {
    //         this.storageService.saveUser(data);
    //         this.isLoginFailed = false;
    //         this.isLoggedIn = true;
    //         this.roles = this.storageService.getUser().roles;
    //         this.reloadPage();
    //     },
    //     error: err => {
    //         this.errorMessage = err.message;
    //         this.isLoginFailed = true;
    //         this.commonService.dialogBoxService.open({title: 'Error', message: err.message})
    //     }
    //   })

    this.authService.login(this.username, this.password).pipe(
        catchError((err) => {
            this.errorMessage = err.error.message;
            this.isLoginFailed = true;
            this.commonService.dialogBoxService.open({title: 'Error', message: this.errorMessage})
            return of("");
        })
    ).subscribe((data) => {
        if(data) {
            this.storageService.saveUser(data);
            this.isLoginFailed = false;
            this.isLoggedIn = true;
            this.roles = this.storageService.getUser().roles;
            this.reloadPage();
        }
    }
     )
   }

   reloadPage(): void {
    this.commonService.router.navigate(['/profile']);
    
   }

   changePassFormat(): void {
    this.passwordFormat = this.passwordFormat === "password" ? "text" : "password";
   }



}