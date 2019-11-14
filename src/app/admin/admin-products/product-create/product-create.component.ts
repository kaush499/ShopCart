import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoryService } from 'src/app/shared/category/category.service';
import { NgForm } from '@angular/forms';
import { Category } from 'src/app/shared/category/category.model';
import { AdminProuctService } from '../admin-product.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-product-create',
  templateUrl: './product-create.component.html',
  styleUrls: ['./product-create.component.css']
})
export class ProductCreateComponent implements OnInit, OnDestroy {
  categories: Category[];
  product = {};
  id;
  suscription: Subscription

  constructor(private router: Router,
              private route: ActivatedRoute,
              private categoryService: CategoryService,
              private productService: AdminProuctService) {}

  ngOnInit() {
    this.suscription = this.categoryService.getAllCategory()
    .subscribe(categories => {
      this.categories = categories;
    })

    this.id = this.route.snapshot.paramMap.get('id');
    if(this.id) {
      this.product = this.productService.getProductById(this.id);
    }

  }

  onSave(productForm: NgForm) {
    let newProduct = productForm.value;
    const selectedCategory = this.categories.find(c => {
       return c.categoryId == newProduct.category; 
    })
    newProduct.categoryName = selectedCategory.categoryName;
    if(this.id){
      this.productService.editProduct(newProduct, this.id);
    }else {
      this.productService.addProduct(newProduct);
    }
    
  }

  onDelete() {
    if (!confirm('Are you sure you want to delete this product?')) return;

    this.productService.deleteProduct(this.id);
  }

  onCancel() {
    this.router.navigate(['../'],{relativeTo: this.route});
  }

  ngOnDestroy() {
    this.suscription.unsubscribe();
  }

}
