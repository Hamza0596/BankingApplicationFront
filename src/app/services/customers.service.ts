import { HttpClient, HttpParams} from '@angular/common/http';
import { Injectable, } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Observable, map } from 'rxjs';
import { CustomHttpResponse } from 'src/CustomHttpResponse';


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


  delete(userId:number):Observable<CustomHttpResponse>{
    return this.httpclient.delete<CustomHttpResponse>(`${this.apiUrl}/user/delete/${userId}`);
  }


  getCustomer(userId:number):Observable<any>{
    return this.httpclient.get<any>(`${this.apiUrl}/user/users/${userId}`);
  }

  updateCustomer(customer:any,originalCustomerName:string):Observable<any>{
    var formData: any = new FormData();
    formData.append("currentUserName",originalCustomerName)
    formData.append("newFirstName",customer.firstName)
    formData.append("newLastName",customer.lastName)
    formData.append("newUsername",customer.userName)
    formData.append("newEmail",customer.email)
    formData.append("newJob",customer.job)
    formData.append("newRole",customer.roles)
    formData.append("active",customer.active)
    formData.append("notLocked",customer.notLocked)
    return this.httpclient.post<any>(`${this.apiUrl}/user/update`,formData)
  }

  createCustomer(customer:any){

    var formData: any = new FormData();
    formData.append("firstName",customer.firstName)
    formData.append("lastName",customer.lastName)
    formData.append("userName",customer.userName)
    formData.append("email",customer.email)
    formData.append("job",customer.job)
    formData.append("role",customer.roles)
    formData.append("isActive",customer.active)
    formData.append("isNonLocked",customer.notLocked)
    return this.httpclient.post<any>(`${this.apiUrl}/user/add`,formData)
        return this.httpclient.post<any>(`${this.apiUrl}/user/add`,formData)

  }

  changePassword(ResetPasswordForm:any){
    return this.httpclient.post<any>(`${this.apiUrl}/user/reset`,ResetPasswordForm);

  }

  addUsersToLocalCache(users:any[]){
    localStorage.setItem('users',JSON.stringify(users));
   }

    getUsersFromLocalCache(): any[] {
      let users=localStorage.getItem('users');
    if (users!=null) {
      return JSON.parse(users);
    }
    return null as any;
  }
  
  
}
