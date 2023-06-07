import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(private authenticaTionService:AuthenticationService, private router:Router,private toastr: ToastrService) { }
  regiserForm!:FormGroup;

  ngOnInit(): void {
    this.regiserForm=new FormGroup({
      firstName :  new FormControl('',Validators.required),
      lastName:  new FormControl('',Validators.required),
      userName :  new FormControl('',Validators.required),
      job:  new FormControl('',Validators.required),
      email :  new FormControl('',[Validators.required,Validators.email]),
      isNonLocked:  new FormControl(true,Validators.required),
      isActive:  new FormControl(true,Validators.required),

    
      
     })

  }


  public register(){
    this.authenticaTionService.register(this.regiserForm.value).subscribe(data=>{
    console.log(data);
    this.showSuccess()
    this.router.navigateByUrl('login');

 
    },(error)=>{
console.log (error.error.message);
  this.failure(error.error.message);      

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
