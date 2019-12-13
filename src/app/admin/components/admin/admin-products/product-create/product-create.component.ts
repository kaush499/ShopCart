import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoryService } from 'src/app/shopping/services/category.service';
import { NgForm } from '@angular/forms';
import { Category } from 'src/app/shared/models/product/category.model';
import { Subscription } from 'rxjs';
import { AdminProuctService } from 'src/app/admin/services/admin-product.service';
import { ThrowStmt } from '@angular/compiler';
import { PageNotFoundComponent } from 'src/app/error/components/page-not-found/page-not-found.component';

@Component({
  selector: 'app-product-create',
  templateUrl: './product-create.component.html',
  styleUrls: ['./product-create.component.css']
})
export class ProductCreateComponent implements OnInit, OnDestroy {
  categories: Category[];
  product = {};
  id: any;
  categorySubs: Subscription;
  isLoading: boolean = false;
  errorSubs: Subscription;

  constructor(private router: Router,
              private route: ActivatedRoute,
              private categoryService: CategoryService,
              private productService: AdminProuctService) {}

  async ngOnInit() {
    // for retrieving all the categories
    this.categorySubs = this.categoryService.getAllCategory()
    .subscribe(categories => {
      this.categories = categories;
    })

    // if this in edit mode it takes id from url and then fetches the product from server
    this.id = this.route.snapshot.paramMap.get('id');
    if(this.id) {
      this.isLoading = true;
      this.productService.getProductById(this.id)
      .subscribe(product => {
        this.product = product;
        this.isLoading = false;
      },err => {
        this.isLoading = false;
      })
    }

    this.errorSubs = this.productService.getAdminPrdError()
      .subscribe(val => {
        this.isLoading = false;
      })

  }

  // saves the new product or updates the edited product
  onSave(productForm: NgForm) {
    let newProduct = productForm.value;

    // selects the category from category id 
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

  // deletes the edited product
  onDelete() {
    if (!confirm('Are you sure you want to delete this product?')) return;

    this.productService.deleteProduct(this.id);
  }

  // takes back to list of admin products list
  onCancel() {
    this.router.navigate(['../'],{relativeTo: this.route});
  }

  ngOnDestroy() {
    this.categorySubs.unsubscribe();
  }

}
