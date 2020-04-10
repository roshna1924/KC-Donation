import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, NavigationEnd, Router} from '@angular/router';
import {HttpService} from '../http.service';
import {ModalService} from '../modal.service';

@Component({
  selector: 'app-orgadmin',
  templateUrl: './requester.component.html',
  styleUrls: ['./requester.component.css'],
})
export class RequesterComponent implements OnInit {
  public foodName;
  public foodAddress;
  public foodExpiry;
  public foodWeight;
  public foodPrice;
  public username;
  public updateddate;
  temp: any;
  public  previousState;
  arr: any;
  public reqweight;
  public bodyText;
  // @ViewChild('Weight') Weight: ElementRef;
  // tslint:disable-next-line:max-line-length
  constructor(private  route: ActivatedRoute, private router: Router, private httpService: HttpService, private modalService: ModalService) {
    this.router.events.subscribe((event) => { if ( event instanceof NavigationEnd) {
      this.arr = event.url.split('/', 3);
      this.previousState = this.arr[1];
    }
    });
  }
  ngOnInit() {
  }
}
