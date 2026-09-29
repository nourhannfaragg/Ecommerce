import { Token } from './../../../../../node_modules/lightningcss/node/ast.d';
import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal, WritableSignal } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment.development';
import { CookieService } from 'ngx-cookie-service';


@Injectable({
  providedIn: 'root'
})
export class CartService {
  private readonly httpClient = inject(HttpClient)
  private readonly cookieService = inject(CookieService)
  
  countNumber:WritableSignal<number> = signal(0)
  
  myHeaders: object={
        headers:{
          token: this.cookieService.get('token')
        }
  }

  addProductToCart(id:string):Observable<any>{
    return this.httpClient.post(  environment.baseURL + 'cart' , 
      { 
        productId:id,
      },
    this.myHeaders
    );
  }

  getLoggedUserCart():Observable<any>{   // call awel ma adkhol in cart component
 return this.httpClient.get(environment.baseURL + 'cart' ,
  this.myHeaders
)
  }

  removeSpecificCartItem(id:string):Observable<any>{
    return this.httpClient.delete(environment.baseURL + `cart/${id}`,

      this.myHeaders
    )
  }


  updateCartCount(id:string , count:number):Observable<any>{
    return this.httpClient.put( environment.baseURL + `cart/${id}` ,
      { // body
          count: count
      },
      this.myHeaders
    )
  }

  checkOutSession(id:string | null , data:object):Observable<any>{ //payment by visa

    return this.httpClient.post(environment.baseURL + `orders/checkout-session/${id}?url=http://localhost:4200` 
      , data 
    )
  }

  checkOutByCash( id:string | null , data:object):Observable<any>{
    return this.httpClient.post( environment.baseURL +`orders/${id}` , data)
  }

}
