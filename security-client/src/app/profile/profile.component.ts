import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../service/auth.service';
import { FileService } from '../service/file.service';
import { StorageService } from '../service/storage.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit, OnDestroy {

  currentUser: any;
  file?: File;
  imageUrl: string = "";
  displayModal: "block" | "none" = "none";
  preview: any;

  constructor(private storageService: StorageService, private authService: AuthService, private router: Router
    ,private fileService: FileService) {};
  
  ngOnInit(): void {
      this.currentUser = this.storageService.getUser();
      if(window.sessionStorage.getItem("imageUrl")) {
        this.imageUrl = window.sessionStorage.getItem("imageUrl") as string;
      }
     
  }

  ngOnDestroy(): void {
     
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
    this.preview = "";
    this.file = e.target.files[0];
    let reader = new FileReader();

    reader.onload = (e) => {
      this.preview = e.target?.result;
    }

    reader.readAsDataURL(this.file as File);

  }

  doUpload() {
    if(this.file) {


      
      this.fileService.imageUplad(this.file, this.currentUser.username + ".jpg", this.currentUser.id).subscribe({
        next: data => {
          window.sessionStorage.removeItem("imageUrl");
          this.getImageFromS3();
        },
       error: err => {
        console.log(err.message)
       }
      });

    }
   
  }


  getImageFromS3() {
    if(!window.sessionStorage.getItem("imageUrl")) {
      this.fileService.getImageFromS3(29).subscribe({
        next: data => {
          this.imageUrl = data.objectContent.httpRequest.uri
          window.sessionStorage.setItem("imageUrl", this.imageUrl);
          window.location.reload();
        },
        error: err => {
          console.log(err.message);
        }
      });
    }
   
  }

  modalOpen() {
    this.displayModal = 'block';
  }

  closeModal() {
    this.displayModal = 'none'
  }


}
