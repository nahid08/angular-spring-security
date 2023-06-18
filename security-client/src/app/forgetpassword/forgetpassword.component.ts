import { Component, OnInit } from '@angular/core';
import { AuthService } from '../service/auth.service';
import { CommonService } from '../CommonService';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { FormlyGroup } from '@ngx-formly/core/lib/templates/formly.group';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-forgetpassword',
  templateUrl: './forgetpassword.component.html',
  styleUrls: ['./forgetpassword.component.css']
})
export class ForgetpasswordComponent implements OnInit {

  model = {email: ""};
  form = new FormGroup({})
  fields : FormlyFieldConfig[] = [
    {
      key: 'email',
      type: 'input',
      props: {
        label: 'Email',
        placeHolder: 'Enter Email',
        required: true
      },
      validators: {
        validation: ['email']
      }
      
    },
  ]

  constructor(private authService: AuthService, private commonService: CommonService) {
  }

  ngOnInit(): void {
    this.model.email = "";    
  }


  submitEmail(model: any) {
    this.authService.forgetPassword(model.email).subscribe({
      next: (data: any) => {
        this.commonService.dialogBoxService.open({message: data.message});
      }
    });
  }


}
