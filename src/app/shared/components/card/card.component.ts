import { WishlistService } from './../../../features/wishlist/wishlist.service';
import { Component, inject, Input } from '@angular/core';
import { IProducts } from '../../../core/models/iproducts.interface';
import { RouterLink } from '@angular/router';
import { CartService } from '../../../features/cart/services/cart.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-card',
  imports: [RouterLink],
  templateUrl: './card.component.html',
  styleUrl: './card.component.css'
})
export class CardComponent{
  @Input( {required:true}) product:IProducts = {} as IProducts;
  private readonly cartService = inject(CartService)
  private readonly toastrService = inject(ToastrService)
  private readonly wishlistService = inject(WishlistService)

  addProductItemToWishlist(id:string):void{
    this.wishlistService.addProductToWishlist(id).subscribe({
      next:(res)=>{
        console.log(res);

        if(res.status === "success"){
          this.toastrService.success(res.message , 'WishList')
        }
      }
    })
  }

  addProductItemToCart(id:string):void{
    this.cartService.addProductToCart(id).subscribe({
      next:(res)=>{
     console.log(res);
     this.cartService.countNumber.set(res.numOfCartItems)

     if(res.status === "success"){ // if product itdaf successfly show alret
      this.toastrService.success(res.message , 'FreshCart')
     }
      },
      error:(err)=>{
        console.log(err)
      }
    })
  }



}
