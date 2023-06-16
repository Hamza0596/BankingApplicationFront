import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AuthenticationService } from '../services/authentication.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private authenticationService: AuthenticationService) {}
  url=environment.apiUrl;

  intercept(httpRequest: HttpRequest<any>, httpHandler: HttpHandler): Observable<HttpEvent<any>> {
    if (httpRequest.url.includes(`${this.url}/user/login`)) {
      
      return httpHandler.handle(httpRequest);
    }

    if (httpRequest.url.includes(`${this.url}/user/register`)) {
      
      return httpHandler.handle(httpRequest);
    }
    this.authenticationService.loadToken();
    const token = this.authenticationService.getToken();
    const request = httpRequest.clone({ setHeaders: { Authorization: `Bearer ${token}` }});

    return httpHandler.handle(httpRequest);
  }
}
