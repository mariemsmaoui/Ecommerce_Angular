import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { enviroments } from '../environment/environment';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  constructor(private http: HttpClient) {}

  getAllProducts() {
    return this.http.get(enviroments.baseApi + 'products');
  }
  getAllCategories() {
    return this.http.get(enviroments.baseApi + 'products/categories');
  }
  getProductsByCategory(keyword: string) {
    return this.http.get(enviroments.baseApi + 'products/category/' + keyword);
  }
  
}
