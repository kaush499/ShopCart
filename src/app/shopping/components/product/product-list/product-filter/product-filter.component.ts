import { Component, OnInit, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { Category } from 'src/app/shared/models/product/category.model';
import { CategoryService } from 'src/app/shopping/services/category.service';

@Component({
  selector: 'app-product-filter',
  templateUrl: './product-filter.component.html',
  styleUrls: ['./product-filter.component.css']
})

// this component contains all the filters (currently contains only category filter)
export class ProductFilterComponent implements OnInit {
  categories$: Observable<Category[]>;
  @Input('category') category: string;

  constructor(private categoryService: CategoryService) { }

  ngOnInit() {
    this.categories$ = this.categoryService.getAllCategory();
  }

}
