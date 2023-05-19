import { Component, OnInit } from '@angular/core';
import { AccountsService } from 'src/app/services/accounts.service';

@Component({
  selector: 'app-bank-account',
  templateUrl: './bank-account.component.html',
  styleUrls: ['./bank-account.component.css']
})
export class BankAccountComponent implements OnInit {

  constructor(private bankAccountService:AccountsService) { }

  ngOnInit(): void {
    this.bankAccountService.getUserAccounts(11).subscribe(data=>{
      console.log(data);
      
    })

    this.bankAccountService.getAccount("21dc8976-3cbd-439f-b39e-36cc25b9e160",0,1).subscribe(data=>{
      console.log(data);
      
    })

  }

}
