import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Category } from './category.model';

@Injectable({ providedIn: "root" })

export class CategoryService {
    private category: Category[] = [];

    constructor(private http: HttpClient) {}

    getCategory() {
        this.http
        .get<{category: Category[]}>("http://localhost:3000/products/category/all")
        .subscribe(response => {
            this.category = response.category;
        })
    }

}