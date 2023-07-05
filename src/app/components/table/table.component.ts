import { Component, Input, OnInit } from '@angular/core';
import { AccountsService } from 'src/app/services/accounts.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {

  constructor(private accountService : AccountsService) { }
  operations!:any;
  accounts!:any;
  historiqueForm!:FormGroup;
  
  @Input() userId!: number;


  ngOnInit(): void {
    this.historiqueForm=new FormGroup({
      accountId :  new FormControl('',Validators.required),
     })

    this.accountService.getUserAccounts(this.userId).subscribe(data=>{
     console.log(this.userId);
      this.accounts=data;
      console.log(data);
    })

    if(this.historiqueForm.value.accountId!=''){
      this.accountService.getAccount(this.historiqueForm.value.accountId,0,3).subscribe(data=>{
        this.operations=data;
        console.log(data);
        
        
      })
    }

   
  }

  getHistorque(){
    this.accountService.getAccount(this.historiqueForm.value.accountId,0,3).subscribe(data=>{
      this.operations=data;
      console.log(data);
      console.log(data.balance);

      
    })
  }

}
