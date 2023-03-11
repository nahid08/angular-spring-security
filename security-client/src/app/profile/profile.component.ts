import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../service/auth.service';
import { FileService } from '../service/file.service';
import { StorageService } from '../service/storage.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  currentUser: any;
  file?: File;

  constructor(private storageService: StorageService, private authService: AuthService, private router: Router
    ,private fileService: FileService) {};
  
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


  fileUpload(e: any): void {
    this.file = e.target.files[0];

  }

  doUpload() {
    this.fileService.imageUplad(this.file).subscribe();
  }



}
