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

  public getAccounts():Observable<any>{
    
    return this.httpClient.get<any>(`${this.apiUrl}/bankaccount/bankaccounts`)
  }


  public getAccount(accountId:string,page:number, size:number):Observable<any>{
    let params=new HttpParams();
    params=params.append('page',page)
    params=params.append('size',size)
    
    return this.httpClient.get<any>(`${this.apiUrl}/bankaccount/accounts/${accountId}/pageoperations`,{params})
  }




  public createAccount(customerId:any,balance:any,type:string):Observable<any>{
    let params=new HttpParams();
    params=params.append('type',type)
    params=params.append("customerId",customerId);
    params=params.append('balance',balance);
    
   return this.httpClient.post<any>(`${this.apiUrl}/bankaccount/bankAccount`,null,{params})
  }

  public delete(id:number):Observable<any>{
    return this.httpClient.delete<any>(`${this.apiUrl}/bankaccount/delete/${id}`);
  }

  public debit(data:any):Observable<any>{
    let params=new HttpParams();
    params=params.append('accountId',data.accountId)
    params=params.append('amount',data.amount);
    params=params.append('description',data.description);

    return this.httpClient.post<any>(`${this.apiUrl}/bankaccount/debit`,null,{params:params});
  }

  public credit(data:any):Observable<any>{
    let params=new HttpParams();
    params=params.append('accountId',data.accountId)
    params=params.append('amount',data.amount);
    params=params.append('description',data.description);

    return this.httpClient.post<any>(`${this.apiUrl}/bankaccount/credit`,null,{params:params});
  }

  public verify(data:any):Observable<any>{
    let params=new HttpParams();
    params=params.append('accountId',data.accountId)
    params=params.append('amount',data.amount);
    params=params.append('description',data.description);

    return this.httpClient.post<any>(`${this.apiUrl}/bankaccount/verify`,null,{params:params});
  }

  public transfer(data:any):Observable<any>{
    let params=new HttpParams();
    params=params.append('accountIdSource',data.accountId)
    params=params.append('amount',data.amount);
    params=params.append('accoundIdDestinatin',data.accoundIdDestinatin);

    return this.httpClient.post<any>(`${this.apiUrl}/bankaccount/transfert`,null,{params:params});
  }
}
