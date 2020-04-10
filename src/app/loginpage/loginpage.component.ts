import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {HttpService} from '../http.service';

@Component({
  selector: 'app-loginpage',
  templateUrl: './loginpage.component.html',
  styleUrls: ['./loginpage.component.css']
})
export class LoginpageComponent implements OnInit {
public username;
public password;
  constructor(private  route: ActivatedRoute, private router: Router, private httpService: HttpService) { }

  ngOnInit() {
  }
  custLogin(user) {
    if (this.username === undefined || this.password === undefined) {
      // base_pages_login.js - validation code
      alert('Please enter username or password');
    } else {
      console.log('b4 passing');
      this.httpService.custLogin(user).subscribe(data => {
        console.log(data);
        if (data.success) {
          console.log(data.userType);
          if (data.userType === 'Donar') {
            this.router.navigate(['/donar', this.username]);
          } else {
            this.router.navigate(['/requester', this.username]);
          }
        } else {
          window.alert(data.message);
        }
      });
    }
  }
}
