import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Category } from './category.model';
import { map } from "rxjs/operators";

@Injectable({ providedIn: "root" })

export class CategoryService {

    constructor(private http: HttpClient) {}

    getAllCategory() {
        return this.http
        .get<{category: Category[]}>("http://localhost:3000/products/category")
        .pipe(
            map(response => {
                return response.category;
            })
        )
    }

}