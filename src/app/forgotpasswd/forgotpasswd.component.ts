import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {HttpService} from '../http.service';

@Component({
  selector: 'app-forgotpasswd',
  templateUrl: './forgotpasswd.component.html',
  styleUrls: ['./forgotpasswd.component.css']
})
export class ForgotpasswdComponent implements OnInit {
  public reminderEmail;
  public randomNum;
  public randomPass = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  loading = false;
  buttionText = 'Send';
  constructor(private  route: ActivatedRoute, private router: Router, private httpService: HttpService) { }

  ngOnInit() {
    this.randomNum = this.getRandomPassword();
    // alert(this.randomNum);
  }
  getRandomPassword() {
    let password = '';
    let n = 5;
    while ( n > 0 ) {
      password += this.randomPass.charAt(this.randomInt(0, 61));
      n--;
    }
    return password;
  }
  randomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
  custLogin(emailID) {
    if (this.reminderEmail === undefined) {
      // base_pages_login.js - validation code
      alert('Please enter your email id');
    } else {
      // alert(emailID.reminderEmail);
      this.httpService.custExist(emailID).subscribe(data => {
        console.log(data);
        if (data.success) {
          console.log(data.message);
          // 04/23 - start
          this.loading = true;
          this.buttionText = 'Sending...';
          const user = {
            email: emailID.reminderEmail,
            subject: 'forgotPass',
            randomNum: this.randomNum
          };
          this.httpService.sendEmail('http://localhost:3000/sendmail', user).subscribe(
            data2 => {
              const res: any = data2;
              console.log(`For ${user.email}, mail has been sent and the message id is ${res.messageId}`);
              this.httpService.upDatePassword(user.email, user.randomNum).subscribe(data1 => {
                if (data1) {
                  alert('Password updated in user table successfully');
                } else {
                  alert('Error in updating password in user table');
                }
              });
            },
            err => {
              console.log(err);
              this.loading = false;
              this.buttionText = 'Send';
            }, () => {
              this.loading = false;
              this.buttionText = 'Send';
            }
          );
          // 04/23 - end
        } else {
          window.alert(data.message);
        }
        this.reminderEmail = '';
      });
    }
  }
}
