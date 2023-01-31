import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import {HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from './user';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
const API = 'https://5af93d25edf5520014cbd24b.mockapi.io/api/v1/';
@Injectable()
export class UserService {
  private actionUrl: string;
  users: Observable<User[]>;
  constructor(public http: Http) {
    this.actionUrl = API + 'user';
  }

  //get all user
  getAllUser() :Observable<User[]>{
     return this.http.get(this.actionUrl)
      .map(this.extractData)
      .catch(this.handleErrorObservable);
  }
  //add user
  //get all user
  addUser(data: User):Observable<User> {
    return this.http.post(this.actionUrl, data)
      .map(this.extractData)
      .catch(this.handleErrorObservable);
  }
  //add user
  //get all user
  editUser(data: User) {
    return this.http.put(this.actionUrl+`/${data.id}`, data)
      .map(this.extractData)
      .catch(this.handleErrorObservable);
  }

  //get all user
  deleteUser(id):Observable<User> {
    return this.http.delete(this.actionUrl+`/${id}`)
      .map(this.extractData)
      .catch(this.handleErrorObservable);
  }
  private extractData(res: Response) {
    let body = res.json();
    console.log(body);
    return body;
  }
  private handleErrorObservable(error: Response | any) {
    return Observable.throw(error.message || error);
  }
}
