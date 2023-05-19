import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CustomersComponent } from './components/customers/customers.component';
import { BankAccountComponent } from './components/bank-account/bank-account.component';

const routes: Routes = [
  {path:'customers',component:CustomersComponent},
  {path:'bankaccount',component:BankAccountComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
