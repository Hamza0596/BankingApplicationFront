import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CustomersComponent } from './components/customers/customers.component';
import { BankAccountComponent } from './components/bank-account/bank-account.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { ResetPasswordComponent } from './components/reset-password/reset-password.component';
import { AuthenticationGuard } from 'src/authentication.guard';
import { AccountOperationsComponent } from './components/account-operations/account-operations.component';
import { CreateAccountComponent } from './components/create-account/create-account.component';
import { HistoriqueaccountsComponent } from './components/historiqueaccounts/historiqueaccounts.component';
import { RoleGuard } from './guards/role.guard';
import { UnauthorizedComponent } from './components/unauthorized/unauthorized.component';

const routes: Routes = [
  {path:'customers',component:CustomersComponent,canActivate: [AuthenticationGuard,RoleGuard]},
  {path:'bankaccount/:userId',component:BankAccountComponent,canActivate: [AuthenticationGuard]},
  {path:'login',component:LoginComponent},
  {path:'register',component:RegisterComponent },
  {path:'resetpassword/:email/:token',component:ResetPasswordComponent },
  {path:'operations',component:AccountOperationsComponent,canActivate:[AuthenticationGuard] },
  {path:'account/:userId',component:CreateAccountComponent,canActivate:[AuthenticationGuard]},
  {path:'historique',component:HistoriqueaccountsComponent,canActivate:[AuthenticationGuard]},
  {path:'unauthorized',component:UnauthorizedComponent},







];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
