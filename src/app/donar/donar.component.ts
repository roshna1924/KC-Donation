import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, NavigationEnd, Router} from '@angular/router';
import {HttpService} from '../http.service';

@Component({
  selector: 'app-globadmin',
  templateUrl: './donar.component.html',
  styleUrls: ['./donar.component.css']
})
export class DonarComponent implements OnInit {
  public foodName;
  public foodAddress;
  public foodExpiry;
  public foodWeight;
  public foodPrice;
  public username;
  public addeddate;
  public  previousState;
  public referenceID;
  temp: any;
  arr: any;
  constructor(private  route: ActivatedRoute, private router: Router, private httpService: HttpService) {
    this.router.events.subscribe((event) => { if ( event instanceof NavigationEnd) {
      this.arr = event.url.split('/', 3);
      this.previousState = this.arr[1];
    }
    });
  }

  ngOnInit() {
    document.getElementById('myForm').style.display = 'none';
    this.username = this.route.snapshot.paramMap.get('username');
    this.addeddate = new Date();
  }

}
