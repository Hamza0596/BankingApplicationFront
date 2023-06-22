import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AccountsService } from 'src/app/services/accounts.service';

@Component({
  selector: 'app-create-account',
  templateUrl: './create-account.component.html',
  styleUrls: ['./create-account.component.css']
})
export class CreateAccountComponent implements OnInit {

  constructor(private accountsService: AccountsService,private toastr: ToastrService,private route: ActivatedRoute,private router: Router) { }
  bankAccountForm!:FormGroup
  userId!:any;
  ngOnInit(): void {
 
    this.userId= this.route.snapshot.params['userId'];
    this.bankAccountForm=new FormGroup({
      balance :  new FormControl('',Validators.required),
      customerId:  new FormControl(this.userId,Validators.required),
      type:   new FormControl('',[Validators.email,Validators.required] ),
      
     })
  }


  createAccount(){
    this.bankAccountForm.value.customerId=this.userId;
    this.accountsService.createAccount(this.userId, this.bankAccountForm.value.balance, this.bankAccountForm.value.type).subscribe(data=>{
      console.log(data);
      
      this.showSuccess();
      this.router.navigate(["/customers"])
    },(error)=>{
      this.failure("error");

    })

 
    

  }

  showSuccess() {
    this.toastr.success('Account added with success!', 'Toastr fun!');
  }

  failure(message:string) {
    this.toastr.error("message", 'Error', {
      timeOut: 3000,
    });  }


}
