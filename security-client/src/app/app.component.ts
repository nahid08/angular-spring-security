import { Component, OnInit } from '@angular/core';
import { AuthService } from './service/auth.service';
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

  constructor(private storageService: StorageService, private authService: AuthService) {};

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

}
