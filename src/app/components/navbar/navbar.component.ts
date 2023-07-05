import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(private authService:AuthenticationService, private router:Router,private location: Location) { }
  loginStatus:any=false;
  role!:any;

  ngOnInit(): void {
  let user= localStorage.getItem('user');
  if(user){
    this.loginStatus=true;
    this.role=JSON.parse(user).roles 
  }    
   }

  logout(){
    this.authService.logOut();
    this.loginStatus=false;
    this.router.navigateByUrl("/login")
  }

 
}
