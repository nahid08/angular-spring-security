import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { CommonController } from '../CommonController';
import { AdminService } from '../service/admin.service';
import { CommonService } from '../CommonService';
import {MatTable, MatTableDataSource, MatTableModule} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';


@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent extends CommonController implements OnInit, AfterViewInit  {

    @ViewChild("table") tab: MatTable<any> | undefined;
    @ViewChild(MatPaginator) paginator: MatPaginator | undefined;

     dataSource = new MatTableDataSource<any>([]);;
     displayedColumns: any[] = [{
         caption: 'Id',
         data: 'userDetailId'
     }, {
        caption: 'Last Logged In',
        data: 'lastLoggedIn'
     }, {
      caption: 'Last Logged Out',
      data: 'lastLoggedOut'
     }, {
      caption: 'Username',
      data: 'username'
     },{
      caption: 'Email',
      data: 'email'
     } 
      ];


     columnsToDisplay: string[] = ['userDetailId', 'lastLoggedIn', 'lastLoggedOut','username', 'email'];

     colums: string[] = ['userDetailId', 'lastLoggedIn', 'lastLoggedOut', 'username', 'email']

     constructor(private adminService: AdminService, private commonService: CommonService) {
        super();
     };

     ngOnInit(): void {
    
     }

     ngAfterViewInit(): void {
      this.adminService.getAllUser().subscribe((data:any) => {
         if(data?.message) {
           this.commonService.dialogBoxService.open({title: 'Error', message: data.message }) 
          } else {

             let results: any[] = data.userDetailList;
             results.forEach(item => {
                item.username = item.user.username;
                item.email = item.user.email;
             })
             this.dataSource.data = results;
             this.dataSource.paginator = this.paginator as any;
             this.tab?.renderRows();
             
          }
       })
       
        
     }

     
}
