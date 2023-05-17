import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import baseUrl from './helper';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  public loginStatusSubject = new Subject<boolean>();

  constructor(private http:HttpClient) { }

  public getCurrentUser()
  {
     return this.http.get(`${baseUrl}/current-user`);
  }

  public generateToken(LoginData:any)
  {
      return this.http.post(`${baseUrl}/generate-token`,LoginData);
  }



  //save token in localstorage
  public loginuser(token:any)
  {
    localStorage.setItem("token",token);
    return true;

  }

  //is userloggedin
  public isLoggedIn()
  {
    let tokenstr = localStorage.getItem('token');
    if(tokenstr == null || tokenstr == '' || tokenstr == undefined)
    {
      return false;
    }
    else
    {
      return true;
    }
  }

  public logout()
  {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    return true;
  }

  public gettoken()
  {
    return localStorage.getItem('token');
  }

  public setUser(user:any)
  {
    localStorage.setItem('user',JSON.stringify(user));
  }

  public getUser()
  {
    let usestr = localStorage.getItem('user');
    if(usestr != null)
    {
        return JSON.parse(usestr);
    }
    else{
      this.logout();
      return null;
    }

  }

  public getUserRole()
  {
    let user = this.getUser();
    return user.authorities[0].authority;
  }

}
