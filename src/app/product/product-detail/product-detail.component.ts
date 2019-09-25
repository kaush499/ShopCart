import { Component, OnInit } from '@angular/core';
import { ProductService } from '../product.service';
import { Product } from '../product.model';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {
  product: Product;
  id: string;

  constructor(private productService: ProductService,
              private router: Router,
              private route: ActivatedRoute) { }

  ngOnInit() {
    this.id = this.route.snapshot.params.id;
    this.product =  this.productService.getProduct(this.id);
  }

  onDelete() {
    this.productService.deleteProduct(this.id);
    this.router.navigate(['../'], {relativeTo: this.route});
  }

  onEdit() {
    this.router.navigate(['edit'], {relativeTo: this.route});
  }

}
