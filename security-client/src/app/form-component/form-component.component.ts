import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormlyFieldConfig } from '@ngx-formly/core';

@Component({
  selector: 'app-form-component',
  templateUrl: './form-component.component.html',
  styleUrls: ['./form-component.component.css']
})
export class FormComponentComponent {

     @Input() fields : FormlyFieldConfig[] = [];
     @Input() model: any;
     @Input() form: any;
    // form = new FormGroup({});
     @Output() onOkClicked = new EventEmitter<any>();

     onSubmit( model: any) {
      this.onOkClicked.emit(this.model);
     }


}
