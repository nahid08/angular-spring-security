import { Component, OnInit } from '@angular/core';
import { CommonService } from '../CommonService';

@Component({
  selector: 'app-confirm-user',
  templateUrl: './confirm-user.component.html',
  styleUrls: ['./confirm-user.component.css']
})
export class ConfirmUserComponent implements OnInit {

  constructor(private commonService: CommonService) {};

  ngOnInit(): void {
      this.commonService.router.navigate(['/login']);
  }
}
