import { CartService } from './../cart/services/cart.service';
import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../../core/auth/auth.service';

@Component({
  selector: 'app-checkout',
  imports: [ ReactiveFormsModule],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.css'
})
export class CheckoutComponent implements OnInit {
  private readonly fb = inject(FormBuilder)
  private readonly activatedRoute = inject(ActivatedRoute) //information of id
  private readonly cartService = inject(CartService)
  private readonly authService = inject(AuthService)

  checkOutForm!:FormGroup ;
  id :string | null = null ;
  

  ngOnInit(): void {
      this.initForm();
      this.getCartId();
  }

  initForm():void{
 this.checkOutForm = this.fb.group({
   shippingAddress: this.fb.group({
    details:[null , [Validators.required ]],
    phone: [null , [ Validators.required , Validators.pattern(/^01[0125][0-9]{8}$/) ]],
    city : [null , [Validators.required]]
   })
 })
  }

//   getUserId():string | null{
//     const decoded: any = this.authService.decodeToken(); // هيفك التوكن

//   if (decoded && decoded.id) {
//     return decoded.id; 
//   }

//   return null; 
// }
  

  getCartId():void{
    this.activatedRoute.paramMap.subscribe({
      next:(urlParams)=>{
        this.id= urlParams.get('id');
        console.log(this.id)
      },
      error:(err)=>{
        console.log(err)
      }
    })
  }

  paymentByVisa():void{
    if(this.checkOutForm.valid){
      this.cartService.checkOutSession(this.id ,this.checkOutForm.value ).subscribe({
        next:(res)=>{
          console.log(res)
          if(res.status === 'success'){    //open url stripe (window.open)
            window.open(res.session.url , '_self')  //self (the same bage)
          }
        }
      })
    }
  }

  paymentByCash():void{
    if(this.checkOutForm.valid){
      this.cartService.checkOutByCash(this.id , this.checkOutForm.value).subscribe({
        next:(res)=>{
          console.log(res)
          
        }
    })
    }
  }
}
