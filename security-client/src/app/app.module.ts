import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginModule } from './login/login.module';
import { httpInterceptorsProviders } from './utils/http.interceptor';
import { BoardAdminModule } from './board-admin/board-admin.module';
import { HomeModule } from './home/home.module';
import { RegistrationModule } from './registration/registration.module';
import { CommonModule } from '@angular/common';
import { DialogBoxModule } from './dialogBox/dialogBox.module';
import { MatProgressSpinnerModule, MatSpinner } from '@angular/material/progress-spinner';
import { urlProvider } from './utils/token/config';
import { ForgetPasswordModule } from './forgetpassword/forgetpassword.module';
import { ResetPasswordModule } from './resetpassword/resetpassword.module';
import { ChartModule } from './chart/chart.module';
import { ProfileModule } from './confirm-user/confirm-user-module';
import { UserListComponent } from './user-list/user-list.component';
import { MatTableModule } from '@angular/material/table';
import { UserListModule } from './user-list/user-list.module';


@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    CommonModule,
    AppRoutingModule,
    LoginModule,
    HttpClientModule,
    FormsModule,
    BoardAdminModule,
    HomeModule,
    RegistrationModule, 
    DialogBoxModule,
    MatProgressSpinnerModule,
    FormsModule,
    ForgetPasswordModule,
    ResetPasswordModule,
    ChartModule,
    MatTableModule,
    UserListModule
    

  ],
  providers: [httpInterceptorsProviders, urlProvider],
  bootstrap: [AppComponent]
})
export class AppModule { }
