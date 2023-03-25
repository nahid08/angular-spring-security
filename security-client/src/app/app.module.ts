import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
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
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { urlProvider } from './utils/token/config';
import { SocketIoConfig } from 'ngx-socket-io';
import { SocketIoModule } from 'ngx-socket-io';
import { ProfileModule } from './profile/profile.module';


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

  ],
  providers: [httpInterceptorsProviders, urlProvider],
  bootstrap: [AppComponent]
})
export class AppModule { }
