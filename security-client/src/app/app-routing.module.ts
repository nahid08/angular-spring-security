import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BoardAdminComponent } from './board-admin/board-admin.component';
import { BoardModeratorComponent } from './board-moderator/board-moderator.component';
import { BoardUserComponent } from './board-user/board-user.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { ProfileComponent } from './profile/profile.component';
import { RegistrationComponent } from './registration/registration.component';
import { AdminRoleGuard } from './utils/auth/AdminRoleGuard';
import { AuthGuard } from './utils/auth/auth';
import { ConfirmUserComponent } from './confirm-user/confirm-user.component';

const routes: Routes = [
  { path: 'home',component: HomeComponent},
  // { path: 'login', loadChildren: () => import('./login/login.module').then(m => m.LoginModule)},
  { path: 'login', component: LoginComponent},
  {path: 'profile', component: ProfileComponent, canActivate: [AuthGuard]},
  {path: 'user', component: BoardUserComponent, canActivate: [AuthGuard]},
  {path: 'register', component: RegistrationComponent},
  {path: 'mod', component: BoardModeratorComponent, canActivate: [AuthGuard]},
  {path: 'admin', component: BoardAdminComponent, canActivate: [AuthGuard, AdminRoleGuard]},
  {path: 'authenticate', component: ConfirmUserComponent},
   {path: '', redirectTo: 'home', pathMatch: 'full'},
 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
