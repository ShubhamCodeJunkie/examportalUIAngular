import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  constructor(private snak:MatSnackBar,private loginService:LoginService,private router:Router)
  {

  }

  LoginData =
    {
      username : '',
      password : ''
    }

    loginformsumbit()
    {

       console.log(this.LoginData.password);
      if(this.LoginData.username.trim() == '' || this.LoginData.username == null)
      {
          this.snak.open('User name canoot be empty','',{
            duration:3000
          })
          return;
      }
      if(this.LoginData.password.trim() == '' || this.LoginData.password == null)
      {
          this.snak.open('password field canoot be empty','',{
            duration:3000
          })
          return;
      }

        this.loginService.generateToken(this.LoginData).subscribe(
          (data:any)=>{
            console.log(data);

            //save token in localStorage
            this.loginService.loginuser(data.token);
            //save current user in localstorage
            this.loginService.getCurrentUser().subscribe((user:any)=>{
              this.loginService.setUser(user);
              console.log(user);

              if(this.loginService.getUserRole() == "ADMIN")
              {
               // window.location.href = '/admin';
                this.router.navigate(['admin']);
                this.loginService.loginStatusSubject.next(true);
              }
              else if(this.loginService.getUserRole() == "NORMAL")
              {
               // window.location.href = '/user';
                this.router.navigate(['user']);
                this.loginService.loginStatusSubject.next(true);
              }
              else
              {
                this.loginService.logout();
              }

            })




          },(error)=>{
            console.log(error);
            this.snak.open('invalid users details','',{
              duration:3000
            })
          }
          )
        ;

    }



}
