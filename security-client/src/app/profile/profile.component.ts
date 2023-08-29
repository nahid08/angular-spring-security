import { Component, OnDestroy, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Observable, map } from 'rxjs';
import { CommonService } from '../CommonService';
import { AuthService } from '../service/auth.service';
import { FileService } from '../service/file.service';
import { StorageService } from '../service/storage.service';
import { ExtService } from '../service/ext.service';

const image = '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';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit, OnDestroy {

  currentUser: any;
  file?: File;
  imageUrl: string = image;
  displayModal: "block" | "none" = "none";
  preview: any;

  constructor(private storageService: StorageService, private authService: AuthService
    ,private fileService: FileService, private commonService: CommonService, private domSanitizer: DomSanitizer, private extService: ExtService) {
      
    };
  
  ngOnInit(): void {
    console.log('hello profile')
      this.currentUser = this.storageService.getUser();
      if(window.sessionStorage.getItem("imageUrl")) {
        this.imageUrl = window.sessionStorage.getItem("imageUrl") as string;
      }


      this.commonService.rxStompService.watch("/topic/greetings").subscribe(message => {
         this.commonService.dialogBoxService.open({title: 'Greetings', message: JSON.parse(message.body).content})
      })
    
  }

  ngOnDestroy(): void {
     
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
    this.closeModal();
    if(this.file) {
      this.fileService.imageUplad(this.file, this.currentUser.username + ".jpg", this.currentUser.id).subscribe(data => {
        if(data.message) {
          this.commonService.dialogBoxService.open({title: 'Error', message: data.message})
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
          this.commonService.dialogBoxService.open({title: 'Error', message: data.response})
        } else {
          this.imageUrl = data.imgStr
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
    this.commonService.dialogBoxService.open({title: "testing", message: "message is ok"});
  }



  getImage() {
    let image = `data:image/*;base64, ${this.imageUrl}`
    return this.domSanitizer.bypassSecurityTrustResourceUrl(image);
  }


  sendSms() {
    this.extService.sendSms().subscribe(data => {
      alert("Sms is sent successfully");
    })

  }

  downloadInfo() {
    this.fileService.pdfDownLoad().subscribe((data) => {

      let blobData = new Blob([data], {type: "application/pdf"});
      let url = window.URL.createObjectURL(blobData);
      window.open(url)

    });
  }

  sendMessage() {
      const message = "Hello Socket";
      this.commonService.rxStompService.publish({destination: '/app/hello', body: JSON.stringify({'name': message})})
  }


}
