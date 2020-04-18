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
    this.getData();
    this.username = this.route.snapshot.paramMap.get('username');
    this.updateddate = new Date();
  }
  getData() {
    console.log('Get Data caalling');
    this.httpService.getFoodData().subscribe(data => {
      this.temp = data;
    });
  }
  openModal(id: string) {
    // alert('hii');
    this.modalService.open(id);
  }
  closeModal(id: string) {
    this.modalService.close(id);
  }
  deleteFood(foodId, foodWeight, username, updateddate) {
    // alert('Food wt: ' + foodWeight + ' Reqested wt: ' + this.reqweight);
    if (confirm('Are you sure to delete ')) {
      console.log('Implement delete functionality here');
    }
    this.httpService.deleteFood(foodId).subscribe(data => {
      // console.log(data.success + ' ' + data.message);
      if (data.success) {
        this.getData();
        alert('Food Data deleted from table successfully');
        this.httpService.upDateHistory(foodId, username, updateddate).subscribe(data1 => {
          if (data1) {
            alert('Food Data updated in history table successfully');
          } else {
            alert('Error in updating data in history table');
          }
        });
      } else {
        alert('Error in deleting food Item');
      }
    });
  }

  goToHistory() {
    this.router.navigate(['/history', this.username, this.previousState]);
  }
}
