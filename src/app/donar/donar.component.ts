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
    this.getData();
    this.username = this.route.snapshot.paramMap.get('username');
    this.addeddate = new Date();
  }
  closeForm() {
    document.getElementById('myForm').style.display = 'none';
    this.getData();
  }

  getData() {
    this.httpService.getFoodData().subscribe(data => {
      this.temp = data;
    });
  }

  deleteFood(foodId) {
    this.httpService.deleteFood(foodId).subscribe(data => {
      // console.log(data.success + ' ' + data.message);
      if (data.success) {
        this.getData();
      } else {
        alert('Error in deleting food Item');
      }
    });
  }

  openForm() {
    document.getElementById('myForm').style.display = 'block';
  }

  goToHistory() {
       this.router.navigate(['/history', this.username, this.previousState]);
  }

  submit(FoodData) {
    // tslint:disable-next-line:max-line-length
    console.log('FoodData:' + JSON.stringify(FoodData));
    // tslint:disable-next-line:max-line-length
    if (this.foodName === undefined || this.foodAddress === undefined || this.foodExpiry === undefined || this.foodPrice === undefined || this.foodWeight === undefined) {
      alert('Please Enter all details');
    } else if (this.foodExpiry <= new Date()) {
      alert('Food Expiry should be greater than current date');
    } else {
      this.httpService.submit(FoodData).subscribe(data => {
        if (data.success) {
          alert('Food Data added successfully');
          this.getData();
          this.httpService.addHistory(FoodData, data.referenceID).subscribe(data1 => {
            if (data1.success) {
              alert('Food Data added in history table successfully');
            } else {
              alert('Error in Adding data in history table');
            }
          });
        } else {
          alert('Error in Adding a food Item');
        }
      });
    }
    document.getElementById('myForm').style.display = 'none';
  }

}
