import { Component, OnInit } from '@angular/core';
import { CommonService } from '../CommonService';
import { ActivatedRoute } from '@angular/router';
import { filter } from 'rxjs';
import { AuthService } from '../service/auth.service';
import { FormlyFieldConfig } from '@ngx-formly/core';

@Component({
  selector: 'app-resetpassword',
  templateUrl: './resetpassword.component.html',
  styleUrls: ['./resetpassword.component.css']
})
export class ResetpasswordComponent implements OnInit {


  token: string = "";
  model = {password: ""};
  constructor(private commonService: CommonService, private authService : AuthService) {};
  fields : FormlyFieldConfig[] = [
    {
      key: 'password',
      type: 'input',
      templateOptions: {
        type: 'password' 
      } ,
      props: {
        label: 'Password',
        placeHolder: 'Enter Password',
        required: true
      },
      validators: {
        validation: ['password']
      }
    },
  ]

  ngOnInit(): void {
      this.model.password = "";
      this.commonService.activatedRoute.queryParams.pipe(
      ).subscribe((param: any) => {
        this.token = param.token;
       
      })
  }

  changePassword(model: any) {

    this.authService.changePassword(model.password, this.token).subscribe({
      next: (data: any) => {
        this.commonService.router.navigate(['/login']);
      }
    })

  }

  



}
