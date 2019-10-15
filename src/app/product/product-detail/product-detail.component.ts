import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {
  // product: Product;
  id: string;

  constructor() { }

  ngOnInit() {
    
  }

  onDelete() {
    
  }

  onEdit() {
  }

}
