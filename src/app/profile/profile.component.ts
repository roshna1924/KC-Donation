import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {HttpService} from '../http.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  public existingEmail;
  public currentPass;
  public newPass;
  constructor(private  route: ActivatedRoute, private router: Router, private httpService: HttpService) { }

  ngOnInit() {
  }
  updateProfile(userData) {
    if (this.existingEmail === undefined || this.existingEmail === '') {
      alert('Please enter your email id');
    } else if (this.currentPass === undefined || this.currentPass === '') {
      alert('Please enter your current password');
    } else if (this.newPass === undefined || this.newPass === '') {
      alert('Please enter new password which you want change');
    } else {
      this.httpService.profUpdate(this.existingEmail, this.currentPass, this.newPass).subscribe(data => {
        console.log(data);
        if (data.success) {
          console.log('data coming' + data.message);
          window.alert(data.message);
          this.router.navigate(['/loginpage']);
        } else {
          console.log('data coming error' + data.message);
          window.alert(data.message);
        }
        this.existingEmail = '';
        this.currentPass = '';
        this.newPass = '';
      });
    }
  }
}
