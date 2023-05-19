import { Component, OnInit } from '@angular/core';
import { Product } from '../Models';
import { ProductsService } from '../services/products.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  //popularProd: undefined | Product[];
  avaliableProd: undefined | Product[];
  constructor(private product: ProductsService) {}

  ngOnInit(): void {
    this.product.availableProducts().subscribe((data) => {
      this.avaliableProd = data;
    });
    /*
    this.product.availableProducts()
    .subscribe((data)=>{
      this.popularProd=data;
    })*/
  }
}
