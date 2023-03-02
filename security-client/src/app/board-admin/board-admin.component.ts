import { Component, OnInit } from '@angular/core';
import { UserService } from '../service/user.service';

@Component({
  selector: 'app-board-admin',
  templateUrl: './board-admin.component.html',
  styleUrls: ['./board-admin.component.css']
})
export class BoardAdminComponent implements OnInit {

  content?: string;

  constructor(private userService: UserService) {};

  ngOnInit(): void {
      this.userService.getAdminBoard().subscribe({
        next: data => {
          this.content = data
        },
        error: err => {
          console.log(err);
          if(err) {
            this.content = err.message;
          } else {
            this.content = "Error with status: " + err.status
          }
        }
      })
  }

}
