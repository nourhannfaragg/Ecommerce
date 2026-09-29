import { IProducts } from './../../core/models/iproducts.interface';
import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ProductDetailsService } from './product-details.service';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { CartService } from '../cart/services/cart.service';



@Component({
  selector: 'app-details',
  imports: [CarouselModule, RouterLink],
  templateUrl: './details.component.html',
  styleUrl: './details.component.css'
})
export class DetailsComponent implements OnInit {

  id:string | null = null;

  productDetails:IProducts= {} as IProducts;

  private readonly activatedRoute = inject(ActivatedRoute);

  private readonly productDetailsService = inject(ProductDetailsService);
  private readonly cartService = inject(CartService);




  ngOnInit(): void {
      this.getProductId();
      this.getProductDetailsData();
  }

 getProductSpicificItemTOCart(id:string):void{
  this.cartService.addProductToCart(id).subscribe({
    next:(res)=>{
     console.log(res);
      },
      error:(err)=>{
        console.log(err)
      }
  })

 }

  getProductId():void{
    this.activatedRoute.paramMap.subscribe(  {
      next:(urlParams)=>{
        this.id = urlParams.get('id');
      }
    })
  }




    getProductDetailsData():void{
    this.productDetailsService.getProductDetails(this.id).subscribe({
      next:(res)=>{
        this.productDetails = res.data;
      },
      error:(err)=>{
        console.log(err)
      }
    })
  }

}
