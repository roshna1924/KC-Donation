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
  public itemCategory;
  public itemName;
  public itemAddress;
  public itemExpiry;
  public itemWeight;
  public itemPrice;
  public username;
  public updateddate;
  public searchCat;
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
    this.searchCat = 'All';
    this.getData(this.searchCat);
    this.username = this.route.snapshot.paramMap.get('username');
    this.updateddate = new Date();
  }
  getData(searchCat) {
    console.log('Get Data calling');
    this.httpService.getItemData(searchCat).subscribe(data => {
      this.temp = data;
    });
  }
  showCategoryCards() {
  // alert('val is:' + this.itemCategory);
  this.httpService.getItemData(this.itemCategory).subscribe(data => {
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
  deleteItem(itemId, itemWeight, username, updateddate) {
    // alert('Item wt: ' + itemWeight + ' Reqested wt: ' + this.reqweight);
    if (confirm('Are you sure to delete ')) {
      console.log('Implement delete functionality here');
      this.httpService.deleteItem(itemId).subscribe(data => {
        // console.log(data.success + ' ' + data.message);
        if (data.success) {
          this.getData(this.searchCat);
          alert('Item Data deleted from table successfully');
          this.httpService.upDateHistory(itemId, username, updateddate).subscribe(data1 => {
            if (data1) {
              alert('Item Data updated in history table successfully');
            } else {
              alert('Error in updating data in history table');
            }
          });
        } else {
          alert('Error in deleting Item');
        }
      });
    }
  }

  goToHistory() {
    this.router.navigate(['/history', this.username, this.previousState]);
  }
}
