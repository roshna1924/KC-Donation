import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, NavigationEnd, Router} from '@angular/router';
import {HttpService} from '../http.service';
import {MatDialog} from '@angular/material';
import {DialogComponent} from '../dialog/dialog.component';

@Component({
  selector: 'app-globadmin',
  templateUrl: './donar.component.html',
  styleUrls: ['./donar.component.css']
})
export class DonarComponent implements OnInit {
  public itemCategory;
  public itemName;
  public itemAddress;
  public itemExpiry;
  public itemWeight;
  public itemPrice;
  public username;
  public addeddate;
  public  previousState;
  public referenceID;
  public requesterIds;
  public searchCat = 'All';
  temp: any;
  arr: any;
  loading = false;
  buttionText = 'Send';
  constructor(private  route: ActivatedRoute, private router: Router, private httpService: HttpService, public dialog: MatDialog) {
    this.router.events.subscribe((event) => { if ( event instanceof NavigationEnd) {
      this.arr = event.url.split('/', 3);
      this.previousState = this.arr[1];
    }
    });
  }

  ngOnInit() {
    document.getElementById('myForm').style.display = 'none';
    this.getData(this.searchCat);
    this.username = this.route.snapshot.paramMap.get('username');
    this.addeddate = new Date();
  }
  openDialog(): void {

    const dialogRef = this.dialog.open(DialogComponent, {
      width : '600px',
      data : {username: this.username},
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }
  closeForm() {
    document.getElementById('myForm').style.display = 'none';
    this.searchCat = 'All';
    this.getData(this.searchCat);
  }

  getData(searchCat) {
    this.httpService.getItemData(searchCat).subscribe(data => {
      this.temp = data;
    });
    this.httpService.getRequestersEmail().subscribe(data => {
      this.requesterIds = data;
      // alert('load:' + data);
    });
  }

  deleteItem(itemId) {
    this.httpService.deleteItem(itemId).subscribe(data => {
      // console.log(data.success + ' ' + data.message);
      if (data.success) {
        this.getData(this.searchCat);
      } else {
        alert('Error in deleting Item');
      }
    });
  }

  openForm() {
    document.getElementById('myForm').style.display = 'block';
  }

  goToHistory() {
       this.router.navigate(['/history', this.username, this.previousState]);
  }

  submit(itemData) {
    // tslint:disable-next-line:max-line-length
    console.log('getitemData:' + JSON.stringify(itemData));
    console.log('itemWeight:' + this.itemWeight);
    // tslint:disable-next-line:max-line-length
    if (this.itemName === undefined || this.itemName === '' || this.itemAddress === undefined || this.itemAddress === '' || this.itemCategory === '' || this.itemPrice === undefined || this.itemPrice === '') {
      alert('Please Enter all details');
    } else if (this.itemCategory === 'Food' && (this.itemWeight === undefined || this.itemWeight === '')) {
      alert('Please Enter Food weight');
    } else if (this.itemCategory === 'Food' && (this.itemExpiry === undefined || this.itemExpiry === '')) {
      alert('Please Enter Food expiry date');
      if (this.itemExpiry <= new Date()) {
        alert('Item Expiry should be greater than current date');
      }
    } else {
      document.getElementById('myForm').style.display = 'none';
      this.httpService.submit(itemData).subscribe(data => {
        if (data.success) {
          alert('Item Data added successfully');
          this.getData(this.searchCat);
          this.httpService.addHistory(itemData, data.referenceID).subscribe(data1 => {
            if (data1.success) {
              alert('Item Data added in history table successfully');
              // 04/23 - start
              this.loading = true;
              this.buttionText = 'Sending...';
              const user = {
                email: this.requesterIds,
                subject: 'sendNotificationToReq'
              };
              // alert('user emails object are :' + user.email);
              this.httpService.sendEmail('http://localhost:3000/sendmail', user).subscribe(
                data2 => {
                  const res: any = data2;
                  console.log(
                    `For ${user.email}, mail has been sent and the message id is ${res.messageId}`
                  );
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
              alert('Error in Adding data in history table');
            }
          });
        } else {
          alert('Error in Adding a Item');
        }
      });
    }
  }

}
