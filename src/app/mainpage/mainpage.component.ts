import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';

@Component({
  selector: 'app-professor',
  templateUrl: './mainpage.component.html',
  styleUrls: ['./mainpage.component.css']
})
export class MainpageComponent implements OnInit {
  constructor(public http: HttpService, private httpService: HttpService) { }

  ngOnInit() {
  }

  scroll(id) {
      const el = document.getElementById(id);
      el.scrollIntoView({behavior: 'smooth', block: 'center'});
  }
}
