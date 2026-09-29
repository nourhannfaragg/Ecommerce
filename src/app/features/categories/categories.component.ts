import { Component, inject, OnInit } from '@angular/core';
import { CategoriesService } from '../../core/services/categories.service';
import { Category } from '../../core/models/category.interface';
import { SearchPipe } from '../../shared/pipes/search-pipe';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-categories',
  imports: [SearchPipe , FormsModule],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.css'
})
export class CategoriesComponent implements OnInit {
  private readonly categoriesService = inject(CategoriesService)
  categoreDetails:Category[] = [];
  text:string = '';

  ngOnInit(): void {
      this.getDataOfCategories();
  }
  
  getDataOfCategories():void{
    this.categoriesService.getAllCategories().subscribe({
      next:(res)=>{
        this.categoreDetails=res.data;
      }
    })
  }
}
