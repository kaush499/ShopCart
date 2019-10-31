import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoryService } from 'src/app/shared/category/category.service';
import { ProductService } from 'src/app/shared/product/product.service';
import { NgForm } from '@angular/forms';
import { Category } from 'src/app/shared/category/category.model';

@Component({
  selector: 'app-product-create',
  templateUrl: './product-create.component.html',
  styleUrls: ['./product-create.component.css']
})
export class ProductCreateComponent implements OnInit {
  categories: Category[];
  product = {};
  id;

  constructor(private router: Router,
              private route: ActivatedRoute,
              private categoryService: CategoryService,
              private productService: ProductService) {}

  ngOnInit() {
    this.categoryService.getAllCategory()
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

}
