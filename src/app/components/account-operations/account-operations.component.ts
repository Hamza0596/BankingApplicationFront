import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AccountsService } from 'src/app/services/accounts.service';

@Component({
  selector: 'app-account-operations',
  templateUrl: './account-operations.component.html',
  styleUrls: ['./account-operations.component.css']
})
export class AccountOperationsComponent implements OnInit {
  transactionForm!:FormGroup;
  userId!:number;
  accounts!:any;
  userRole!:any;
  status!:any;

  constructor(private formBuilder: FormBuilder, private accountsService:AccountsService, private toastr: ToastrService) { }

  ngOnInit(): void {

    let user=localStorage.getItem('user');
    if(user!=null){
      this.userId=JSON.parse(user).id;
      this.userRole=JSON.parse(user).roles;
      
     if(this.userRole=="ROLE_USER"){
      this.status="transfer"
     }
      
    }
    this. getUserAccounts(this.userId);

    
    this.transactionForm = this.formBuilder.group({
      accountId: ['',Validators.required],
      accoundIdDestinatin:['',this.accoundIdDestinatinValidator],
      operationGroup: this.formBuilder.group({
        operation: [this.status,Validators.required]
      }),
      amount: ['',Validators.required],
      description: ['']
    });
    
  }


    getUserAccounts(userId:number){
      if(this.userRole=="ROLE_USER")
      this.accountsService.getUserAccounts(userId).subscribe(data=>{
        this.accounts=data;
        
      })
      if(this.userRole=="ROLE_ADMIN"){
        this.accountsService.getAccounts().subscribe(data=>{
          this.accounts=data;
          console.log(data);
        })
      }

    }

    accoundIdDestinatinValidator(control: AbstractControl): { [key: string]: any } | null {
      const operation = control.parent?.get('operationGroup.operation')?.value;
      const accoundIdDestinatin = control.value;
  
      if (operation === 'transfer' && !accoundIdDestinatin) {
        return { required: true };
      }
      return null;
    }

    

    executeOperation(){
      if(this.transactionForm.value.operationGroup.operation==("debit")||this.transactionForm.value.operationGroup.operation==("transfer")){
        this.accountsService.verify(this.transactionForm.value).subscribe(verifyData=>{
          console.log(verifyData);
          if(verifyData.message=="Sufficient balance" ){
            if(this.transactionForm.value.operationGroup.operation==("debit")){
              this.accountsService.debit(this.transactionForm.value).subscribe(data=>{ 
                this.showSuccess();
              },(error)=>{
                this.failure("Operation failed. Please try again.")
              })
            }
            if(this.transactionForm.value.operationGroup.operation==("transfer")){
              this.accountsService.transfer(this.transactionForm.value).subscribe(data=>{ 
                this.showSuccess();
              },(error)=>{
                this.failure("Operation failed. Please try again.")
              })
            }
          
          }else if(verifyData.message=="Insufficient balance"){
            let confirmation=confirm("You don't have enough funds in your account. Would you like to enter into overdraft?");
            if(!confirmation) return;
            if(this.transactionForm.value.operationGroup.operation==("debit")){
              this.accountsService.debit(this.transactionForm.value).subscribe(data=>{ 
                this.showSuccess();
              },(error)=>{
                this.failure("Operation failed. Please try again.")
              })
            }
            if(this.transactionForm.value.operationGroup.operation==("transfer")){
              this.accountsService.transfer(this.transactionForm.value).subscribe(data=>{ 
                this.showSuccess();
              },(error)=>{
                this.failure("Operation failed. Please try again.")
              })
            }
  
          }
  
        })
      }else if(this.transactionForm.value.operationGroup.operation=="credit"){
        this.accountsService.credit(this.transactionForm.value).subscribe(creditData=>{
          console.log("hello");
          
      
        })

      }
      
      

    }

    showSuccess() {
      this.toastr.success('Operation executed with success!', 'Toastr fun!');
    }
  
    failure(message:string) {
      this.toastr.error("message", 'Error', {
        timeOut: 3000,
      });  }

}
