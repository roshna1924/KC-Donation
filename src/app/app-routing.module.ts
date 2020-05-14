import { NgModule } from '@angular/core';
// import { CommonModule } from '@angular/common';
import {Routes, RouterModule} from '@angular/router';
import {LoginpageComponent} from './loginpage/loginpage.component';
import {RegistrationComponent} from './registration/registration.component';
import {ForgotpasswdComponent} from './forgotpasswd/forgotpasswd.component';
import {DonarComponent} from './donar/donar.component';
import {RequesterComponent} from './requester/requester.component';
import {MainpageComponent} from './mainpage/mainpage.component';
import {HistoryComponent} from './history/history.component';
import {ProfileComponent} from './profile/profile.component';

const routes: Routes = [
  {path: '', redirectTo: '/mainpage', pathMatch: 'full'},
  {path: 'loginpage', component: LoginpageComponent},
  {path: 'registration', component: RegistrationComponent},
  {path: 'forgotpasswd', component: ForgotpasswdComponent},
  {path: 'profile', component: ProfileComponent},
  {path: 'donar/:username', component: DonarComponent},
  {path: 'requester/:username', component: RequesterComponent},
  {path: 'history/:username/:previousState', component: HistoryComponent},
  {path: 'mainpage', component: MainpageComponent}];

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
