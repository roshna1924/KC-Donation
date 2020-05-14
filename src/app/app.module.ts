import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import {AppRoutingModule} from './app-routing.module';
import { LoginpageComponent } from './loginpage/loginpage.component';
import {FormsModule} from '@angular/forms';
import { RegistrationComponent } from './registration/registration.component';
import { ForgotpasswdComponent } from './forgotpasswd/forgotpasswd.component';
import { MainpageComponent } from './mainpage/mainpage.component';
import { DonarComponent } from './donar/donar.component';
import { RequesterComponent } from './requester/requester.component';
import {HttpService} from './http.service';
import { HttpClientModule } from '@angular/common/http';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { HistoryComponent } from './history/history.component';
import { ModalService } from './modal.service';
import { ProfileComponent } from './profile/profile.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDialogModule } from '@angular/material';
import { DialogComponent } from './dialog/dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginpageComponent,
    RegistrationComponent,
    ForgotpasswdComponent,
    MainpageComponent,
    DonarComponent,
    RequesterComponent,
    HistoryComponent,
    ProfileComponent,
    DialogComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    NgbModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatDialogModule
  ],
  // exports: [
  //   MatDialogModule
  // ],

  providers: [HttpService, ModalService],
  bootstrap: [AppComponent],
  entryComponents: [DialogComponent]
})
export class AppModule { }
