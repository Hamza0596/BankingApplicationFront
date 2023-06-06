import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private authenticaTionService:AuthenticationService) { }
  loginForm!:FormGroup;

  ngOnInit(): void {

    this.loginForm=new FormGroup({
     userName :  new FormControl('',Validators.required),
     password:  new FormControl('',Validators.required)
     
    })
  }
  

  public login(){
    this.authenticaTionService.login(this.loginForm.value).subscribe(data=>{
      console.log(data);
      
    })
  }

  

}
