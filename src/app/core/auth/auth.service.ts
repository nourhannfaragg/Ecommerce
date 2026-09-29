import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment.development';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
import {jwtDecode} from "jwt-decode"

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly httpClient = inject(HttpClient);
  private readonly cookieService = inject(CookieService);
  private readonly router = inject(Router);


  registerForm(data:object):Observable<any>{
    return this.httpClient.post( environment.baseURL + 'auth/signup'  , data) 
  }

   loginrForm(data:object):Observable<any>{
    return this.httpClient.post( environment.baseURL + 'auth/signin'  , data )
  }

  submitVerifyEmail(data:object):Observable<any>{
    return this.httpClient.post(environment.baseURL + `auth/forgotPasswords` , data)
  }

  submitVerifyCode(data:object):Observable<any>{
    return this.httpClient.post(environment.baseURL + `auth/verifyResetCode` , data)
  }

  submitResetPassword(data:object):Observable<any>{
    return this.httpClient.put(environment.baseURL +`auth/resetPassword` , data)
  }

  logOut():void{ //first : remove token cookies
// konty bt3ty object gwa object w msh da al matlop
    this.cookieService.delete('token');
    // navigate to login
    this.router.navigate(['/login']);
  }


   decodeToken(){ // token mowgod in cookies , cookeis in cookieservice
    let token ;
    try{
      token =jwtDecode( this.cookieService.get('token'))
    }
    catch (error){
      this.logOut();
    }
    return token;
   }
}
