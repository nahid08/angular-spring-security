import { Component, OnInit } from '@angular/core';
import { Route, Router } from '@angular/router';
import { CommonService } from '../CommonService';
import { AuthService } from '../service/auth.service';
import { StorageService } from '../service/storage.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',

})
export class RegistrationComponent implements OnInit {

  username: string = "";
  email: string = "";
  password: string = "";
  isSuccessful: boolean = false;
  isSignUpFailed: boolean = false;
  errorMessage: string = "";
  roles :string[] = ["admin", "mod"];
  role: string[] = ["mod"];


  constructor(private authService: AuthService, private storageService: StorageService, private commonService: CommonService) {};

  ngOnInit(): void {
    if(this.storageService.isLoggedIn()) {
      this.commonService.router.navigate(['/profile']);

    }
  }

  onSubmit(): void {

    this.authService.register(this.username, this.email, this.password, this.role).subscribe({
      next: data => {
        console.log(data);
        this.isSuccessful = true;
        this.isSignUpFailed = false;
        this.commonService.router.navigate(['/profile']);
      },
      error: err => {
        this.errorMessage = err.error.message,
        this.isSignUpFailed = true
        this.commonService.dialogBoxService.open({title: 'Error', message: err.message})
      }
    })
  }

}
