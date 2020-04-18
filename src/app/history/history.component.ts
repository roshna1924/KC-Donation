import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, NavigationEnd, Router} from '@angular/router';
import {HttpService} from '../http.service';


@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css']
})
export class HistoryComponent implements OnInit {
  temp: any;
  public foodName;
  public foodAddress;
  public foodExpiry;
  public foodWeight;
  public foodPrice;
  public username;
  public addeddate;
  public previousState;

  // tslint:disable-next-line:max-line-length
  constructor(private  route: ActivatedRoute, private router: Router, private httpService: HttpService) {
  }

  ngOnInit() {
    this.username = this.route.snapshot.paramMap.get('username');
    this.previousState = this.route.snapshot.paramMap.get('previousState');
    this.getData();
    // alert('previousState : ' + this.previousState);
  }

  goToMainPage() {
    if (this.previousState === 'donar') {
      this.router.navigate(['/donar', this.username]);
    } else {
      this.router.navigate(['/requester', this.username]);
    }
  }

  getData() {
    this.httpService.getUserHistory(this.username, this.previousState).subscribe(data => {
      this.temp = data;
    });
  }
}
