import { HttpClient, HttpParams} from '@angular/common/http';
import { Injectable, } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Observable, map } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class CustomersService {

  apiUrl=environment.apiUrl;

  constructor(private httpclient:HttpClient) { }

  getCustomers(pageNumber:number, size: number):Observable<any[]>{
    return this.httpclient.get<any>(`${this.apiUrl}/user/users/${pageNumber}/${size}`);

  }

  getRoles():Observable<any[]>{
    return this.httpclient.get<any>(`${this.apiUrl}/user/users/roles`);

  }



  searchByQuery(query:string , pageNumber:number, size:number):Observable<any[]>{
    let params=new HttpParams();
    params=params.append('query',query);
    return this.httpclient.get<any>(`${this.apiUrl}/user/search/${pageNumber}/${size}`,{params});
  }


  delete(userId:number){
    return this.httpclient.delete<any>(`${this.apiUrl}/customer/delete/${userId}`);
  }


  getCustomer(userId:number):Observable<any>{
    return this.httpclient.get<any>(`${this.apiUrl}/user/users/${userId}`);
  }

  updateCustomer(customer:any, id:number):Observable<any>{
    return this.httpclient.post<any>(`${this.apiUrl}/customer/customers/update/${id}`,customer)
  }

  createCustomer(customer:any){
    return this.httpclient.post<any>(`${this.apiUrl}/customer/customers/`,customer)
    
  }
  
}
