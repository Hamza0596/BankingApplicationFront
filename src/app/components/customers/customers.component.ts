import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { CustomersService } from 'src/app/services/customers.service';


@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.css']
})
export class CustomersComponent implements OnInit {

  constructor(private customersService:CustomersService) { }
  displayedColumns: string[] = ['id', 'firstName','lastName', 'job','email','creationDate'];
   customers!:any;
   value!:string;
   pageNumber:number=0;
   pageSize:number=5;
    numbers!: number[] ;
    customerForm!:FormGroup;
    customer!:any;
    updateMessage!:string;




  ngOnInit(): void {
  this.getCustomers(this.pageNumber,this.pageSize);

   this.customerForm=new FormGroup({
    firstName :  new FormControl('',Validators.required),
    lastName:  new FormControl('',Validators.required),
    email:   new FormControl('',[Validators.email,Validators.required] ),
    job :   new FormControl('',Validators.required)
       

   })

   

  }


  getCustomers(pageNumber:number, size:number){
    this.customersService.getCustomers(pageNumber,size).subscribe(data=>{
      this.customers=data
      this.numbers=new Array(this.customers.totalPages);

      
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
        this.getCustomers(this.pageNumber,this.pageSize);
      });
    }

    openUpdateModal(id: number){
       this.customersService.getCustomer(id).subscribe(
        (data) => {
        this.customer=data;  

        this.customerForm.patchValue({
          firstName:this.customer.firstName,
          lastName:this.customer.lastName,
          email:this.customer.email,
          job:this.customer.job
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

    updateCustomer(id :number){
      this.customersService.updateCustomer(this.customerForm.value,id).subscribe(data=>{
        this.updateMessage='ok'
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
  
 
     
      


}
