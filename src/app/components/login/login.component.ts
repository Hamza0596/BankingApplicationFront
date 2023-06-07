import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private authenticaTionService:AuthenticationService,private toastr: ToastrService) { }
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
      this.showSuccess();
    },(error)=>{
      this.failure("Verify your credentials please")
    })
  }

  showSuccess() {
    this.toastr.success('Hello world!', 'Toastr fun!');
  }

  failure(message:string) {
    this.toastr.error(message, 'Error', {
      timeOut: 3000,
    });  }

  

}
