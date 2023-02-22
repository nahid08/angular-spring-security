import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginModule } from './login/login.module';
import { httpInterceptorsProviders } from './utils/http.interceptor';
import { HomeComponent } from './home/home.component';
import { BoardAdminComponent } from './board-admin/board-admin.component';
import { BoardAdminModule } from './board-admin/board-admin.module';
import { HomeModule } from './home/home.module';
import { RegistrationModule } from './registration/registration.module';
import { BoradModeratorComponent } from './borad-moderator/borad-moderator.component';
import { BoardModeratorComponent } from './board-moderator/board-moderator.component';
import { BoardUserComponent } from './board-user/board-user.component';
import { BoradUserComponent } from './borad-user/borad-user.component';

@NgModule({
  declarations: [
    AppComponent,
    BoradModeratorComponent,
    BoardModeratorComponent,
    BoardUserComponent,
    BoradUserComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    LoginModule,
    HttpClientModule,
    FormsModule,
    BoardAdminModule,
    HomeModule,
    RegistrationModule

  ],
  providers: [httpInterceptorsProviders],
  bootstrap: [AppComponent]
})
export class AppModule { }
