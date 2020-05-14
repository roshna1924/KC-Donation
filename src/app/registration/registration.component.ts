import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {HttpService} from '../http.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {
  public userType;
  public registerUsername;
  public registerPassword;
  public registerEmail;
  public registerPassword2;

  constructor(private router: Router, private httpService: HttpService) { }

  ngOnInit() {
  }

  registerUser(user) {
  // tslint:disable-next-line:max-line-length
     if (this.userType === undefined || this.registerUsername === undefined || this.registerPassword === undefined || this.registerEmail === undefined || this.registerPassword2 === undefined) {
       alert('Please Enter all details');
     } else if (this.registerUsername.length < 3) {
       alert('Username length should be greater than 3');
     } else if (this.registerPassword.length < 5) {
       alert('Password length should be greater than 5');
     } else if (this.registerPassword !== this.registerPassword2) {
         alert('Password does not match');
     } else {
         this.httpService.registerUser(user);
         alert('Successful Registration');
         this.router.navigate(['/mainpage']);
     } // else block
   }

}
