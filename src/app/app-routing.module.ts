import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CustomersComponent } from './components/customers/customers.component';
import { BankAccountComponent } from './components/bank-account/bank-account.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';

const routes: Routes = [
  {path:'customers',component:CustomersComponent},
  {path:'bankaccount',component:BankAccountComponent},
  {path:'login',component:LoginComponent},
  {path:'register',component:RegisterComponent }



];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
