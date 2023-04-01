import { Component, OnInit } from '@angular/core';
import { Route, Router } from '@angular/router';
import { CommonService } from '../CommonService';
import { AuthService } from '../service/auth.service';
import { StorageService } from '../service/storage.service';
import { AbstractControl, FormGroup} from '@angular/forms'
import { FormlyFieldConfig } from '@ngx-formly/core';

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

  form = new FormGroup({});
  model = {name: '', password: '', email: ''}
  fields : FormlyFieldConfig[] = [
    {
      key: 'name',
      type: 'input',
      props: {
        label: 'Name',
        placeHolder: 'Enter Name',
        required: true,
        minLength: 3
      },

    },
    {
      key: 'password',
      type: 'input',
      props: {
        label: 'Password',
        placeHolder: 'Enter Password',
        required: true
      }
    },
    {
      key: 'email',
      type: 'input',
      props: {
        label: 'Email',
        placeHolder: 'Enter Email',
        required: true
      },
      validators: {
        validation: ['ip']
      }
      
    },

  ]


  constructor(private authService: AuthService, private storageService: StorageService, private commonService: CommonService) {};

  ngOnInit(): void {
    if(this.storageService.isLoggedIn()) {
      this.commonService.router.navigate(['/profile']);

    }
  }

  onSubmit(model: any): void {
    this.username = model.name;
    this.email = model.email
    this.password = model.password;

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
