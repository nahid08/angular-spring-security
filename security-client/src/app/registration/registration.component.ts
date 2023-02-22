import { Component, OnInit } from '@angular/core';
import { AuthService } from '../service/auth.service';

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

  constructor(private authService: AuthService) {};

  ngOnInit(): void {
      
  }

  onSubmit(): void {
    let param = {
      username: this.username,
      password: this.password,
      email: this.email
    }

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
