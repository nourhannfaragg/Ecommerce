import { HttpClient } from '@angular/common/http';
import {  Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class ProudctsService {
  
private readonly httpClient:HttpClient = inject(HttpClient)


getProducts( pageNumber:number = 1):Observable<any>{
  return this.httpClient.get( environment.baseURL +  `products?page=${pageNumber}`);
}
}
