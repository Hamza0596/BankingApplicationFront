import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { AccountsService } from 'src/app/services/accounts.service';
import { CustomersService } from 'src/app/services/customers.service';


@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.css']
})
export class CustomersComponent implements OnInit {

  constructor(private customersService:CustomersService, private accountsService: AccountsService,    private toastr: ToastrService,
    private router : Router) { }
  displayedColumns: string[] = ['id', 'firstName','lastName', 'job','email','creationDate'];
   customers!:any;
   value!:string;
   pageNumber:number=0;
   pageSize:number=2;
    numbers!: number[] ;
    customerForm!:FormGroup;
    changepass!:FormGroup;

    customer!:any;
    updateMessage!:string;
    roleNames!: any[];
    bankAccountForm !:FormGroup;




  ngOnInit(): void {


    this.bankAccountForm=new FormGroup({
     balance :  new FormControl('',Validators.required),
     customerId:  new FormControl('',Validators.required),
     type:   new FormControl('',[Validators.email,Validators.required] ),
     
    })
    


  this.getCustomers(this.pageNumber,this.pageSize);
   this.customerForm=new FormGroup({
    firstName :  new FormControl('',Validators.required),
    lastName:  new FormControl('',Validators.required),
    email:   new FormControl('',[Validators.email,Validators.required] ),
    job :   new FormControl('',Validators.required),
    userName:new FormControl('',Validators.required),
    roles:new FormControl('',Validators.required),
    notLocked:new FormControl('',Validators.required),
    active:new FormControl('',Validators.required)


   })

   

  }


  getCustomers(pageNumber:number, size:number){
    this.customersService.getCustomers(pageNumber,size).subscribe(data=>{
      this.customers=data
      this.numbers=new Array(this.customers.totalPages);
      console.log(data);
      

      
    })
  }


  searchCustomer(value:string){

      this.customersService.searchByQuery(value,this.pageNumber,this.pageSize).subscribe(data=>{
        this.customers=data;
        this.numbers=new Array(this.customers.totalPages);

      })
    }

    onPageChange(pageNumber:number, pageSize:number){
      this.pageNumber=pageNumber;
      
      if(!this.value){
        this.getCustomers(pageNumber,pageSize);
      }else{
        this.searchCustomer(this.value);
      }
    }

    getRoles(){
      this.customersService.getRoles().subscribe(dataRoles=>{
        this.roleNames=dataRoles;
        console.log(this.roleNames);
        
      
      })       
    }


    getCustomer(id: number): void {

      this.customersService.getCustomer(id).subscribe(
        
        (data) => {
        this.customer=data;   
        
        
        },
        (error) => {
          // Handle any errors that occur during the request
          console.error(error);
        }
      );
    }
    

    deleteUser(userId:number){
      let confirmation=confirm("Are you sure to delete this  customer ? ");
      if(!confirmation) return;
      this.customersService.delete(userId).subscribe(data=>{
        console.log(data);
        
        this.getCustomers(this.pageNumber,this.pageSize);
      });
    }

    openUpdateModal(id: number){
      this.getRoles();

       this.customersService.getCustomer(id).subscribe(
        (data) => {
        this.customer=data; 
        for (let i = 0; i < this.roleNames.length; i++) {
          
          
          
          if(this.roleNames[i]==this.customer?.roles){
            this.roleNames=this.roleNames.filter((_, j) => j !== i);

            
          }
          
        }
         

        this.customerForm.patchValue({
          firstName:this.customer.firstName,
          lastName:this.customer.lastName,
          email:this.customer.email,
          job:this.customer.job,
          userName:this.customer.userName,
          roles:this.customer.roles,
          notLocked:this.customer.notLocked,
          active:this.customer.active


        })

                
        },
        (error) => {
          // Handle any errors that occur during the request
          console.error(error);
        }
      );     

    }

    createCustomer(){

      this.customersService.createCustomer(this.customerForm.value).subscribe(data=>{
        
        this.getCustomers(this.pageNumber,this.pageSize);

      }
        
      );
    }

    updateCustomer(originalCustomerName:string){
      this.customersService.updateCustomer(this.customerForm.value,originalCustomerName).subscribe(data=>{
        this.updateMessage='ok'
        console.log(this.customerForm.value);
        
        this.getCustomers(this.pageNumber,this.pageSize);
      },
      (error)=>{
        this.updateMessage='no'

      });     

    }


    resetForm() {
      
      this.customerForm.reset();
    
  }


  isCurrentPage(pageNum:number):boolean{
     return (this.customers?.pageable.pageNumber==pageNum)
  }


  
  
   
  accounts(id:number){
    this.router.navigateByUrl('bankaccount/'+id);
    console.log("hello");
    

  }


  showSuccess() {
    this.toastr.success('Account added with success!', 'Toastr fun!');
  }

  failure(message:string) {
    this.toastr.error("message", 'Error', {
      timeOut: 3000,
    });  }


    createAccount(userId:number){
      this.router.navigateByUrl('account/'+userId);

    }

}
