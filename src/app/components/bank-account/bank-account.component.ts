import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { AccountsService } from 'src/app/services/accounts.service';
import { CustomersService } from 'src/app/services/customers.service';

@Component({
  selector: 'app-bank-account',
  templateUrl: './bank-account.component.html',
  styleUrls: ['./bank-account.component.css']
})
export class BankAccountComponent implements OnInit {

  constructor(private bankAccountService:AccountsService, private customersService :CustomersService,private route: ActivatedRoute) { }
  bankAcounts!:any;
  userId!:number;
  customers!:any;
  


  ngOnInit(): void {

  
   this.userId= this.route.snapshot.params['userId'];
   this.bankAccountService.getUserAccounts(this.userId).subscribe(data=>{
    this.bankAcounts=data;
    console.log(data);
    
   })
  





  }



  deleteAccount(id:number){
    let confirmation=confirm("Are you sure to delete this  bank account customer ? ");
    if(!confirmation) return;
    this.bankAccountService.delete(id).subscribe(data=>{
      this.bankAccountService.getUserAccounts(this.userId).subscribe(data=>{
        this.bankAcounts=data;
        
       })
    })

  }


}
