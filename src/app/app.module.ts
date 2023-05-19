import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { CustomersComponent } from './components/customers/customers.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { BankAccountComponent } from './components/bank-account/bank-account.component';




@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    CustomersComponent,
    BankAccountComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
   ReactiveFormsModule,
   ReactiveFormsModule,
   HttpClientModule,
   FormsModule

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
