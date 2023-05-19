import { Component, OnInit } from '@angular/core';
import { Order } from '../Models';
import { ProductsService } from '../services/products.service';
import { Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-my-orders',
  templateUrl: './my-orders.component.html',
  styleUrls: ['./my-orders.component.css'],
})
export class MyOrdersComponent implements OnInit {
  orderData: Order[] = []; // Initialize as an empty array

  dataSource = new MatTableDataSource<Order>();
  constructor(private product: ProductsService, private route: Router) {}

  ngOnInit(): void {
    this.getOrderList();
  }

  getOrderList() {
    this.product.orderList().subscribe((result) => {
      this.orderData = result;
    });
  }

  cancelOrder(orderId: number | undefined) {
    orderId &&
      this.product.cancelOrder(orderId).subscribe((result) => {
        this.getOrderList();
      });
  }
}
