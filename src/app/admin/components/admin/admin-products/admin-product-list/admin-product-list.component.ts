import { Component, OnInit, OnDestroy, QueryList, ViewChildren } from '@angular/core';
import { Product } from 'src/app/shared/models/product/product.model';
import { Subscription } from 'rxjs';
import { DecimalPipe } from '@angular/common';
import { FormControl } from '@angular/forms';
import { startWith, map } from 'rxjs/operators';
import { TableService, NgbdSortableHeader, SortEvent } from 'src/app/admin/services/data-table.service';
import { AdminProuctService } from 'src/app/admin/services/admin-product.service';



@Component({
  selector: 'app-admin-product-list',
  templateUrl: './admin-product-list.component.html',
  styleUrls: ['./admin-product-list.component.css'],
  providers: [DecimalPipe]
})
export class AdminProductListComponent implements OnInit, OnDestroy {

  products: Product[] = [];
  subscription: Subscription;
  items: Product[];
  itemsPag: Product[];
  itemsCount: number;
  pageSize: number = 2;
  page: number = 1;
  filter = new FormControl('');


  @ViewChildren(NgbdSortableHeader) headers: QueryList<NgbdSortableHeader>;


  constructor(private productService: AdminProuctService,
              private tableService: TableService,
              pipe: DecimalPipe) {
      
      // for filtering with the keyword in the search bar
      this.filter.valueChanges.pipe(
        startWith(''),
        map(text => this.tableService.search(text, pipe, [...this.products]))
      ).subscribe(prd => {
        this.items = prd;
        this.itemsCount = this.items.length;
        this.onPageChange();
      })
  }

  ngOnInit() {
    // getting all products from server
    this.products = this.productService.getAllProducts();
    this.subscription = this.productService.getProductsUpdated()
    .subscribe(products => {
      this.products = products;
      this.items = this.products;
      this.itemsCount = this.items.length;
      this.onPageChange(); 
    });
    this.items = this.products;
    this.itemsCount = this.items.length;
    this.onPageChange();
  }

  // for sorting the items respective to column
  onSort({column, direction}: SortEvent) {
    this.headers.forEach(header => {
      if (header.sortable !== column) {
        header.direction = '';
      }
    });

    this.items = this.tableService.SortPrd(this.items, {column, direction});
    this.onPageChange();
  }

  // used for pagination of the product list
  onPageChange() {
    this.itemsPag = this.items.slice((this.page - 1) * this.pageSize, (this.page - 1) * this.pageSize + this.pageSize);
  }


  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
