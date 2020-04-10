import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

interface MyData {
  success: boolean;
  message: string;
  status: number;
  userType: string;
  length: number;
}

interface SaveStatus {
  success: boolean;
  message: string;
  referenceID: object;
}

@Injectable({
  providedIn: 'root'
})

export class HttpService {
  test = 'How r u?';
  constructor(private http: HttpClient) {}

  httpGet(url) {
    return this.http.get(url);
  }

  getFoodData() {
    return this.http.get<MyData>('http://localhost:3000/getFoodData');
  }
  getUserHistory(username, previousState) {
    // alert('inside http' + username);
    return this.http.get<MyData>('http://localhost:3000/getUserHistory/' + username + '/' + previousState);
  }

  deleteFood(foodId) {
    // console.log('in http service deleteFood for:' + foodName);
    return this.http.delete<SaveStatus>('http://localhost:3000/deleteFood/' + foodId);
  }

  upDateHistory(foodId, username, updateddate) {
    console.log('in http service update food  for:' + foodId);
    const head = { Id: foodId, name: username, date: updateddate};
    return this.http.patch<SaveStatus>('http://localhost:3000/upDateHistory/', {headers : head});
  }

  httpPost(url, {}) {
    return this.http.post(url, { name: 'Roshna' });
  }

  sendEmail(url, data) {
    return this.http.post(url, data);
  }

  registerUser(user) {
    this.http.post<SaveStatus>('http://localhost:3000/registration', user).subscribe(res => {
      console.log(res);
    });
  }

  submit(FoodData) {
    // console.log('inside httpservice');
    return this.http.post<SaveStatus>('http://localhost:3000/submitFood', FoodData);
  }

  addHistory(FoodData, referenceID) {
    console.log('inside httpservice :' + JSON.stringify(FoodData) + JSON.stringify(referenceID));
    const head = { referenceId: referenceID };
    console.log('inside httpservice - head :' + JSON.stringify(head));
    return this.http.post<SaveStatus>('http://localhost:3000/addHistory', FoodData, {headers : head});
  }

  custLogin(user) {
    return this.http.post<MyData>('http://localhost:3000/loginpage', user);
  }

  questSet(questName) {
    console.log('questSet : ' + questName);
    return this.http.post<SaveStatus>('http://localhost:3000/questName', {questName});
  }
}
