import { keyframes } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { error } from 'jquery';
import { ProductService } from 'src/app/services/product.service';
import { tap } from 'rxjs/operators';

interface Food {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css'],
})
export class ProductComponent implements OnInit {
  foods: Food[] = [
    { value: 'steak-0', viewValue: 'Steak' },
    { value: 'pizza-1', viewValue: 'Pizza' },
    { value: 'tacos-2', viewValue: 'Tacos' },
  ];
  //store the reception of the data
  products: any[] = [];
  categories: any[] = [];

  //dependence injection
  constructor(private service: ProductService) {}

  ngOnInit(): void {
    this.getProducts();
    this.getCategories();
  }
  getProducts() {
    this.service
      .getAllProducts()
      .pipe(
        tap((res: any) => {
          this.products = res;
        })
      )
      .subscribe();
  }
  getCategories() {
    this.service
      .getAllCategories()
      .pipe(tap((res: any) => console.log(res)))
      .subscribe({
        next: (res: any) => {
          this.categories = res;
        },
        error: (error) => {
          console.log(error.message);
        },
      });
  }
  filterCategory(event: any) {
    //pass the keyword
    let value = event.target.value;
    console.log(value);
    value == 'all' ? this.getProducts : this.getProductsCategory(value);
  }

  //filtering method
  getProductsCategory(keyword: string) {
    this.service.getProductsByCategory(keyword).subscribe((res: any) => {
      console.log(res); // check if data is returned from API
      this.products = res;
    });
  }
}
