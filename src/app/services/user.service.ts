import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import baseUrl from './helper';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private httpclient:HttpClient) { }

  adduser(user :any)
  {
     return this.httpclient.post(`${baseUrl}/user/`,user);

  }

  
}
