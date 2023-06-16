import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { CustomersComponent } from './components/customers/customers.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { BankAccountComponent } from './components/bank-account/bank-account.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ResetPasswordComponent } from './components/reset-password/reset-password.component';
import { AuthInterceptor } from './Interceptors/auth.interceptor';
import { AuthenticationGuard } from 'src/authentication.guard';




@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    CustomersComponent,
    BankAccountComponent,
    LoginComponent,
    RegisterComponent,
    ResetPasswordComponent,
      ],
  imports: [
    BrowserModule,
    AppRoutingModule,
   ReactiveFormsModule,
   ReactiveFormsModule,
   HttpClientModule,
   FormsModule,
   BrowserAnimationsModule,
   ToastrModule.forRoot(), // ToastrModule added

  ],
  providers: [
    AuthenticationGuard,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
