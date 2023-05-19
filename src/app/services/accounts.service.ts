import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AccountsService {
  apiUrl=environment.apiUrl;
  constructor(private httpClient: HttpClient) { }


  public getUserAccounts(userId:number):Observable<any>{
    
    return this.httpClient.get<any>(`${this.apiUrl}/bankaccount/bankaccounts/users/${userId}`)
  }


  public getAccount(accountId:string,page:number, size:number):Observable<any>{
    let params=new HttpParams();
    params=params.append('page',page)
    params=params.append('size',size)
    
    return this.httpClient.get<any>(`${this.apiUrl}/bankaccount/accounts/${accountId}/pageoperations`,{params})
  }
}
