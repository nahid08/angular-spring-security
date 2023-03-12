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
  imageUrl: string = "";

  constructor(private storageService: StorageService, private authService: AuthService, private router: Router
    ,private fileService: FileService) {};
  
  ngOnInit(): void {
      this.currentUser = this.storageService.getUser();
      if(window.sessionStorage.getItem("imageUrl")) {
        this.imageUrl = window.sessionStorage.getItem("imageUrl") as string;
      }
     
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
    if(this.file) {
      
      this.fileService.imageUplad(this.file, this.currentUser.username + ".jpg").subscribe({
        next: data => {
          window.sessionStorage.removeItem("imageUrl");
        },
       error: err => {
        console.log(err.message)
       }
      });

    }
   
  }


  getImageFromS3() {
    if(!window.sessionStorage.getItem("imageUrl")) {
      this.fileService.getImageFromS3(17).subscribe({
        next: data => {
          this.imageUrl = data.objectContent.httpRequest.uri
          window.sessionStorage.setItem("imageUrl", this.imageUrl);
        },
        error: err => {
          console.log(err.message);
        }
      });
    }
   
  }



}
