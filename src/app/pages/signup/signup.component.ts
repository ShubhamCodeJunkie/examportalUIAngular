import { Component ,OnInit} from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit  {
  ngOnInit(): void {

  }

  constructor(private userService:UserService,private snackbar:MatSnackBar){

  }

  public user = {
    username:'',
    password:'',
    firstname:'',
    lastname:'',
    email:'',
    phone:''
  }

  formSubmit()
  {
    console.log(this.user);
    if(this.user.username == '' || this.user.username == null)
    {
    //alert('user is required !!');
    this.snackbar.open('username is required !!','',{
      duration:3000,
    });
    return;
    }

    this.userService.adduser(this.user).subscribe(
      (data:any)=>{
        console.log(data);
      Swal.fire('Success','User Registered successfully','success');
      },
      (error:any)=>{
        console.log(error);
     
       this.snackbar.open('User already exits!','',{
        duration:3000
       })
      }
    )


  }



}
