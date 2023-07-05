import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthenticationService } from '../services/authentication.service';

@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivate {

  constructor(private authenticationService:AuthenticationService, private router:Router){

  }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.isAdmin();
  }

  isAdmin():boolean{
    console.log("hillo");
    
    let user=localStorage.getItem('user');
    if(user && JSON.parse(user).roles=='ROLE_ADMIN'){
    return true;
    }
   
    this.router.navigate(['/unauthorized']);
    return false; // Deny access to the route
  }
  
}
