import { HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { CustomersService } from 'src/app/services/customers.service';
import { HttpErrorResponse } from '@angular/common/http';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private authenticaTionService:AuthenticationService,private toastr: ToastrService, private customersService: CustomersService) { }
  loginForm!:FormGroup;
  passwordForm!:FormGroup;

  ngOnInit(): void {

    this.passwordForm=new FormGroup({
      
      email:   new FormControl('hamza.bouachir@talan.com',[Validators.email,Validators.required] )
      
  
     })

    this.loginForm=new FormGroup({
     userName :  new FormControl('',Validators.required),
     password:  new FormControl('',Validators.required)
     
    })
  }
  



  public login() {
    this.authenticaTionService.login(this.loginForm.value).subscribe(data => {
      const token = data.headers.get('Jwt-Token');
      if(token!=null){
        this.authenticaTionService.saveToken(token);
        this.authenticaTionService.addUserToLocalCache(data.body);
      }
      
      console.log(data);
      this.showSuccess();
    }, (error) => {
      this.failure("Verify your credentials please");
    });
  }
  

  showSuccess() {
    this.toastr.success('Hello world!', 'Toastr fun!');
  }

  failure(message:string) {
    this.toastr.error(message, 'Error', {
      timeOut: 3000,
    });  }


 

    resetPassword(){
      this.authenticaTionService.sendEmailForRest(this.passwordForm.value.email).subscribe(data=>{
        console.log(data);
        
      });


    }
  

}
