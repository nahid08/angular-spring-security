import { Component, OnInit } from '@angular/core';
import { Route, Router } from '@angular/router';
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

  constructor(private authService: AuthService, private storageService: StorageService, private router: Router) {};

  ngOnInit(): void {
    if(this.storageService.isLoggedIn()) {
      this.router.navigate(['/profile']);

    }
  }

  onSubmit(): void {

    this.authService.register(this.username, this.email, this.password).subscribe({
      next: data => {
        console.log(data);
        this.isSuccessful = true;
        this.isSignUpFailed = false;
      },
      error: err => {
        this.errorMessage = err.error.message,
        this.isSignUpFailed = true
      }
    })
  }

}
