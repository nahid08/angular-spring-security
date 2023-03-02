import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../service/auth.service';
import { StorageService } from '../service/storage.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  currentUser: any;

  constructor(private storageService: StorageService, private authService: AuthService, private router: Router) {};
  
  ngOnInit(): void {
      this.currentUser = this.storageService.getUser();
  }

  doLogOut(): void {
    this.authService.logout().subscribe({
      next: res => {
        console.log(res);
        this.storageService.clean();
        this.router.navigate(["/login"]);
      },

      error: err => {
        alert(err.message);
      }
    })
  }



}
