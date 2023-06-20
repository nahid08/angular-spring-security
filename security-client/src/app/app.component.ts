import { Component, OnInit } from '@angular/core';
import { CommonService } from './CommonService';
import { AuthService } from './service/auth.service';
import { SpinnerService } from './service/spinner.service';
import { StorageService } from './service/storage.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'security-client';
  private roles: string[] = [];
  isLoggedIn: boolean = false;
  showAdminBoard: boolean = false;
  showModeratorBoard: boolean = false;
  username?: string;

  constructor(public storageService: StorageService, private authService: AuthService,private commonService: CommonService,
    public spinnerService: SpinnerService) {};

  ngOnInit(): void {
      this.isLoggedIn = this.storageService.isLoggedIn();
      if(this.isLoggedIn) {
        const user = this.storageService.getUser();
        this.roles = user.roles;

        this.showAdminBoard = this.roles.includes('ROLE_ADMIN');
        this.showModeratorBoard = this.roles.includes('ROLE_MODERATOR');

        this.username = user.username;
      }
  }


  doLogOut(): void {
    this.authService.logout().subscribe({
      next: res => {
        console.log(res);
        this.storageService.clean();
        this.commonService.router.navigate(["/login"]);
      },

      error: err => {
        this.commonService.dialogBoxService.open({title: 'Error', message: err.message})
      }
    })
  }

  // hideNav() {
  //   return this.commonService.router.url.includes("home") || this.commonService.router.url.includes("profile");
  // }


}
