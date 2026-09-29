import { Component, inject, OnInit } from '@angular/core';
import { CardComponent } from "../../../../shared/components/card/card.component";
import { IProducts } from '../../../../core/models/iproducts.interface';
import { ProudctsService } from '../../../../core/services/products/proudcts.service';

@Component({
  selector: 'app-popular-products',
  imports: [CardComponent],
  templateUrl: './popular-products.component.html',
  styleUrl: './popular-products.component.css'
})
export class PopularProductsComponent implements OnInit{
  
  productList:IProducts[]=[];

  private readonly productsService = inject(ProudctsService)

  ngOnInit(): void {
    this.getAllPrductsData();
  }

   getAllPrductsData():void{
    this.productsService.getProducts().subscribe(  {
      next:(res)=> {
        this.productList = res.data;
      },
      error:(err)=> {
        console.log(err)
      }
    })
   }

}
