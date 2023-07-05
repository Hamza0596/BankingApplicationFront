import { HttpClient, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, map } from 'rxjs';
import { environment } from 'src/environments/environment';
import { JwtHelperService } from '@auth0/angular-jwt';



@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private token!: any;
  private loggedInUsername!: any;
  apiUrl=environment.apiUrl;
  private jwtHelper = new JwtHelperService();

   private isLoggedInSubject = new BehaviorSubject<boolean>(false);
  public isLoggedIn$ = this.isLoggedInSubject.asObservable();




  constructor(private httpClient :HttpClient ) {
  
   }

  login(user: any): Observable<any> {
    return this.httpClient.post<HttpResponse<any> | HttpErrorResponse>(`${this.apiUrl}/user/login`, user, { observe: 'response' })
      .pipe(
        map((response: HttpResponse<any> | HttpErrorResponse) => {
          if (response instanceof HttpResponse) {
            this.isLoggedInSubject.next(true);

          }
          return response;
        })
      );
  }

  public register(user: any): Observable<any> {
    return this.httpClient.post<any>(`${this.apiUrl}/user/register`, user);
  }
  public logOut() {
    this.token = null;
    this.loggedInUsername = null;
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    localStorage.removeItem('users');
    this.isLoggedInSubject.next(false);


  }
  public saveToken(token: string): void {
    this.token = token;
    localStorage.setItem('token', token);
  }

  public addUserToLocalCache(user: any): void {
    localStorage.setItem('user', JSON.stringify(user));
  }

  public getUserFromLocalCache(): any {
    const userString = localStorage.getItem('user');
    if (userString !== null) {
      return JSON.parse(userString);
    }
    return null; // Ou renvoyez une valeur par défaut appropriée si nécessaire
  }
  public loadToken(): void {
    this.token = localStorage.getItem('token');
  }

  public getToken(): string {
    return this.token;
  }

  public isUserLoggedIn(): boolean {
    this.loadToken();
    if (this.token != null && this.token !== ''){
      if (this.jwtHelper.decodeToken(this.token).sub != null || '') {
        if (!this.jwtHelper.isTokenExpired(this.token)) {
          this.loggedInUsername = this.jwtHelper.decodeToken(this.token).sub;
          return true;
        }
      }
    } 
      this.logOut();
      return false;
    
  }

  sendEmailForRest(email:string){
    return this.httpClient.get<any>(`${this.apiUrl}/user/reset/mail/${email}`);

  }

  resetPassword(email:string,token:string){
    return this.httpClient.get<any>(`${this.apiUrl}/user/reset/${email}/${token}`);

  }
}

