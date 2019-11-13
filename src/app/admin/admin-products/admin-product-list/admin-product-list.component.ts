import { Component, OnInit, OnDestroy, QueryList, ViewChildren } from '@angular/core';
import { Product } from 'src/app/shared/product/product.model';
import { Subscription } from 'rxjs';
import { TableService, NgbdSortableHeader, SortEvent } from './data-table.service';
import { DecimalPipe } from '@angular/common';
import { FormControl } from '@angular/forms';
import { startWith, map } from 'rxjs/operators';
import { AdminProuctService } from '../admin-product.service';



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
    this.products = this.productService.getAll();
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

  onSort({column, direction}: SortEvent) {
    this.headers.forEach(header => {
      if (header.sortable !== column) {
        header.direction = '';
      }
    });

    this.items = this.tableService.SortPrd(this.items, {column, direction});
    this.onPageChange();
  }

  onPageChange() {
    this.itemsPag = this.items.slice((this.page - 1) * this.pageSize, (this.page - 1) * this.pageSize + this.pageSize);
  }


  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
