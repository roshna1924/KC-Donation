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

  getItemData(searchCat) {
    return this.http.get<MyData>('http://localhost:3000/getItemData/' + searchCat);
  }
  getRequestersEmail() {
    return this.http.get<MyData>('http://localhost:3000/getRequestersEmail');
  }
  getUserHistory(username, previousState) {
    // alert('inside http' + username);
    return this.http.get<MyData>('http://localhost:3000/getUserHistory/' + username + '/' + previousState);
  }

  deleteItem(itemId) {
    // console.log('in http service deleteItem for:' + itemName);
    return this.http.delete<SaveStatus>('http://localhost:3000/deleteItem/' + itemId);
  }

  upDateHistory(itemId, username, updateddate) {
    console.log('in http service update item  for:' + itemId);
    const head = { Id: itemId, name: username, date: updateddate};
    return this.http.patch<SaveStatus>('http://localhost:3000/upDateHistory/', {headers : head});
  }
  upDatePassword(email, randomNum) {
    console.log('in http service update password  for:' + email);
    const head = { emailID: email, randomNumber: randomNum};
    return this.http.patch<SaveStatus>('http://localhost:3000/upDatePassword/', {headers : head});
  }
  profUpdate(existingEmail, currentPass, newPass) {
    console.log('in http service for profile update');
    const head = { exEmail: existingEmail, currPass: currentPass, nPass: newPass};
    return this.http.patch<SaveStatus>('http://localhost:3000/profUpdate/', {headers : head});
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

  submit(ItemData) {
    // console.log('inside httpservice');
    return this.http.post<SaveStatus>('http://localhost:3000/submitItem', ItemData);
  }

  addHistory(itemData, referenceID) {
    console.log('inside httpservice :' + JSON.stringify(itemData) + JSON.stringify(referenceID));
    const head = { refID: referenceID };
    console.log('inside httpservice - head :' + JSON.stringify(head));
    return this.http.post<SaveStatus>('http://localhost:3000/addHistory', itemData, {headers : head});
  }

  custLogin(user) {
    return this.http.post<MyData>('http://localhost:3000/loginpage', user);
  }
  custExist(user) {
    return this.http.post<MyData>('http://localhost:3000/custExist', user);
  }
}
