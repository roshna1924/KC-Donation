import {Component, Inject, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {HttpService} from '../http.service';
import {MatDialogRef, MAT_DIALOG_DATA, MatDialog} from '@angular/material';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent implements OnInit {
  public itemCategory;
  public itemName;
  public itemAddress;
  public itemExpiry;
  public itemWeight;
  public itemPrice;
  public addeddate;
  public referenceID;
  public requesterIds;
  public username;
  public searchCat = 'All';
  temp: any;
  arr: any;
  loading = false;
  buttionText = 'Send';
  // tslint:disable-next-line:max-line-length
  constructor(private  route: ActivatedRoute, private router: Router, private httpService: HttpService, public dialogRef: MatDialogRef<DialogComponent>, @Inject(MAT_DIALOG_DATA) public data: any) {
  }

  ngOnInit() {
    this.getData(this.searchCat);
    this.addeddate = new Date();
    this.username = this.route.snapshot.paramMap.get('username');
  }
  getData(searchCat) {
    this.httpService.getItemData(searchCat, this.username).subscribe(data => {
      this.temp = data;
    });
    this.httpService.getRequestersEmail().subscribe(data => {
      this.requesterIds = data;
      // alert('load:' + data);
    });
  }
  submitToDiag(itemData) {
    // tslint:disable-next-line:max-line-length
    console.log('getitemData: ' + JSON.stringify(itemData));
    console.log('itemWeight: ' + this.itemWeight);
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
      this.closeForm();
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

  closeForm() {
    this.dialogRef.close();
    this.searchCat = 'All';
    this.getData(this.searchCat);
  }
}
