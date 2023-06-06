import { HttpClient, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  apiUrl=environment.apiUrl;


  constructor(private httpClient :HttpClient ) { }

  public login(user:any):Observable<HttpResponse<any>|HttpErrorResponse>{
     return this.httpClient.post<HttpResponse<any>|HttpErrorResponse>(`${this.apiUrl}/user/login`,user,{observe:'response'});
  }

  public register(user: any): Observable<any> {
    return this.httpClient.post<any>(`${this.apiUrl}/user/register`, user);
  }
}

