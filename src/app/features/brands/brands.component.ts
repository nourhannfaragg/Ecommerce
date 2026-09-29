import { Component, inject, OnInit } from '@angular/core';
import { BrandsService } from './services/brands.service';
import { Brand } from './models/brand.interface';
import { FormsModule } from "@angular/forms";
import { SearchPipe } from '../../shared/pipes/search-pipe';

@Component({
  selector: 'app-brands',
  imports: [FormsModule , SearchPipe],
  templateUrl: './brands.component.html',
  styleUrl: './brands.component.css'
})
export class BrandsComponent implements OnInit {
  private readonly brandsService = inject(BrandsService)
  text:string =''
  brandsList:Brand [] = [] 

  ngOnInit(): void {
      this.getAllBrands()
  }


  getAllBrands():void{
    this.brandsService.getBrands().subscribe({
      next:(res)=>{
        this.brandsList = res.data;
      }
    })
  }
}
