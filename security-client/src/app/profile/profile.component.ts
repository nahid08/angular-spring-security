import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DialogBoxService } from '../dialogBox/dialogBox.service';
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
    ,private fileService: FileService, private dialogBoxService: DialogBoxService) {};
  
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
        this.dialogBoxService.open({title: 'Error', message: err.message})
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
      this.fileService.imageUplad(this.file, this.currentUser.username + ".jpg", this.currentUser.id).subscribe(data => {
        if(data.message) {
          this.dialogBoxService.open({title: 'Error', message: data.message})
        } else {
          window.sessionStorage.removeItem("imageUrl");
          this.getImageFromS3();
        }
      })
    }
   
  }


  getImageFromS3() {
    if(!window.sessionStorage.getItem("imageUrl")) {
      this.fileService.getImageFromS3(this.currentUser.id).subscribe(data => {
        if(data.response) {
          this.closeModal();
          this.dialogBoxService.open({title: 'Error', message: data.response})
        } else {
          this.imageUrl = data.s3.objectContent.httpRequest.uri
          window.sessionStorage.setItem("imageUrl", this.imageUrl);
          window.location.reload();
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


  openDIalog() {
    this.dialogBoxService.open({title: "testing", message: "message is ok"});
  }


}
