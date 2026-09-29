import { Component, inject, OnInit } from '@angular/core';
import { ProudctsService } from '../../core/services/products/proudcts.service';
import { IProducts } from '../../core/models/iproducts.interface';
import { CardComponent } from "../../shared/components/card/card.component";
import { MainSliderComponent } from "./components/main-slider/main-slider.component";
import { PopularCategoriesComponent } from "./components/popular-categories/popular-categories.component";
import { PopularProductsComponent } from "./components/popular-products/popular-products.component";

@Component({
  selector: 'app-home',
  imports: [ MainSliderComponent, PopularCategoriesComponent, PopularProductsComponent],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  
}
