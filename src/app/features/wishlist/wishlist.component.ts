import { Component, inject, OnInit } from '@angular/core';
import { WishlistService } from './wishlist.service';
import { ToastrService } from 'ngx-toastr';
import { Wishlist } from './wishlist.interface';

@Component({
  selector: 'app-wishlist',
  imports: [],
  templateUrl: './wishlist.component.html',
  styleUrl: './wishlist.component.css'
})
export class WishlistComponent implements OnInit {
  private readonly wishlistService = inject(WishlistService)
  wishlistDetails:Wishlist[]= []

  ngOnInit(): void {
      this.getProductToWishlist()
  }
  
  getProductToWishlist():void{
    this.wishlistService.getProduct().subscribe({
      next:(res)=>{
        this.wishlistDetails = res.data;
      }
    })
  }

  deleteProductFromWishlist(id:string):void{
    this.wishlistService.removeProduct(id).subscribe({
      next:(res)=>{
        console.log(res);
        this.wishlistDetails = res.data;
      }
    })
  }

  
}
