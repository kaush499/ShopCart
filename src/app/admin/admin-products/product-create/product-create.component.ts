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
    this.productService.addProduct(newProduct);
  }

  onDelete() {}



 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
  // id: string;
  // editMode: boolean = false;
  // productForm: FormGroup;

  // constructor(private route: ActivatedRoute,
  //             private router: Router) {}

  // ngOnInit() {
  //   if(this.route.snapshot.params['id']){
  //     this.editMode = true;
  //     this.id = this.route.snapshot.params['id'];
  //   }
  //   this.initForm();
  // }

  // private initForm(){
  //   let productCategory = '';
  //   let productTitle = '';
  //   let productImageUrl = '';
  //   let productPrice = 0;

  //   if(this.editMode){
  //     const product = this.productService.getProduct(this.id);
  //     productCategory = product.category;
  //     productTitle = product.title;
  //     productImageUrl = product.imageUrl;
  //     productPrice = product.price;
  //   }

  //   this.productForm = new FormGroup({
  //     'category': new FormControl(productCategory, Validators.required),
  //     'imageUrl': new FormControl(productImageUrl, Validators.required),
  //     'title': new FormControl(productTitle, Validators.required),
  //     'price': new FormControl(productPrice, Validators.required),
  //   });
  // }

  // onSubmit(){
  //   const title = this.productForm.value.title;
  //   const category = this.productForm.value.category;
  //   const price = this.productForm.value.price
  //   const imageUrl = this.productForm.value.imageUrl
  //   if(this.editMode){
  //     const newProduct = new Product(this.id, category, title, imageUrl, price, false);
  //     this.productService.updateProduct(this.id, newProduct);
  //   } else {
  //     const newProduct = new Product(null, category, title, imageUrl, price, false);
  //     this.productService.addProduct(newProduct);
  //   }
  //   this.router.navigate(['../'], {relativeTo: this.route});
  // }

  // onCancel(){
  //   this.router.navigate(['../'], {relativeTo: this.route});
  // }

}
