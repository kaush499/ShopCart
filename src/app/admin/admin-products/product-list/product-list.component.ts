import { Component, OnInit, OnDestroy, QueryList, ViewChildren } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Product } from 'src/app/shared/product/product.model';
import { Subscription } from 'rxjs';
import { ProductService } from 'src/app/shared/product/product.service';
import { SortTableService, NgbdSortableHeader, SortEvent } from './services/sortable.service';



@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit, OnDestroy {

  products: Product[];
  subscription: Subscription;
  items: Product[];
  itemCount: number;
  pageSize: number = 4;
  page: number;

  @ViewChildren(NgbdSortableHeader) headers: QueryList<NgbdSortableHeader>;


  constructor(private router: Router,
              private route: ActivatedRoute,
              private productService: ProductService,
              private sortTableService: SortTableService) {}

  ngOnInit() {
    this.products = this.productService.getAll();
    this.subscription = this.productService.getProductsUpdated()
    .subscribe(products => {
      this.products = products;
      this.items = this.products; 
    });
    this.items = this.products;
    
  }

  onSort({column, direction}: SortEvent) {
    this.headers.forEach(header => {
      if (header.sortable !== column) {
        header.direction = '';
      }
    });

    this.items = this.sortTableService.SortPrd(this.items, {column, direction});
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
