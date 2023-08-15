import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { CommonController } from '../CommonController';
import { AdminService } from '../service/admin.service';
import { CommonService } from '../CommonService';
import {MatTable, MatTableModule} from '@angular/material/table';


@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent extends CommonController implements OnInit {

    @ViewChild("table") tab: MatTable<any> | undefined;

     dataSource: any = [];
     displayedColumns: any[] = [{
         caption: 'Id',
         data: 'userDetailId'
     }, {
        caption: 'Last Logged In',
        data: 'lastLoggedIn'
     }, {
      caption: 'Last Logged Out',
      data: 'lastLoggedOut'
     }];


     columnsToDisplay: string[] = ['userDetailId', 'lastLoggedIn', 'lastLoggedOut'];

     colums: string[] = ['userDetailId', 'lastLoggedIn', 'lastLoggedOut']

     constructor(private adminService: AdminService, private commonService: CommonService) {
        super();
     };

     ngOnInit(): void {
         this.adminService.getAllUser().subscribe((data:any) => {
           if(data?.message) {
             this.commonService.dialogBoxService.open({title: 'Error', message: data.message }) 
            } else {

               let results: any[] = data.userDetailList;
               results.forEach(item => {
                  item.username = item.user.username;
                  item.email = item.user.email;
               })
               this.dataSource = data.userDetailList;
               this.tab?.renderRows();
               

            }
         })
     }

     
}
