import { Component, OnInit } from '@angular/core';
import { Product } from '../Models';
import { ProductsService } from '../services/products.service';
import { faTrash, faEdit } from '@fortawesome/free-solid-svg-icons';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
@Component({
  selector: 'app-seller-home',
  templateUrl: './seller-home.component.html',
  styleUrls: ['./seller-home.component.css'],
})
export class SellerHomeComponent implements OnInit {
  productList: undefined | Product[];
  productMessage: undefined | string;
  dataSource = new MatTableDataSource<Product>();

  constructor(private product: ProductsService, private route: Router) {}

  ngOnInit(): void {
    this.list();
  }

  deleteProduct(id: number) {
    this.product.deleteProduct(id).subscribe((result) => {
      if (result) {
        this.productMessage = 'Product deleted successfully';
        this.list();
        this.dataSource = new MatTableDataSource<Product>(this.productList);
      }
    });
    setTimeout(() => {
      this.productMessage = '';
    }, 3000);
  }

  list() {
    this.product.productList().subscribe((result) => {
      this.productList = result;
    });
  }

  addProduct() {
    this.route.navigate(['/seller-add-product']);
  }
}
