import { Component, inject, OnInit } from '@angular/core';
import { CardComponent } from "../../shared/components/card/card.component";
import { IProducts } from '../../core/models/iproducts.interface';
import { ProudctsService } from '../../core/services/products/proudcts.service';
import {NgxPaginationModule} from 'ngx-pagination'; 
import { SearchPipe } from '../../shared/pipes/search-pipe';
import { FormsModule, ɵInternalFormsSharedModule } from "@angular/forms";

@Component({
  selector: 'app-products',
  imports: [CardComponent, NgxPaginationModule, SearchPipe, FormsModule],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductsComponent implements OnInit {
  productList:IProducts[]=[];
  text:string = ''
  pageSize!:number;
  p!:number;
  total!:number;

  private readonly productsService = inject(ProudctsService)

  ngOnInit(): void {
    this.getAllPrductsData();
  }

   getAllPrductsData(bageNumber:number = 1):void{
    this.productsService.getProducts(bageNumber).subscribe(  {
      next:(res)=> {
        this.productList = res.data;
        this.pageSize= res.metadata.limit;
        this.p=res.metadata.currentpage;
        this.total=res.results;
      }
    })
   }

}
