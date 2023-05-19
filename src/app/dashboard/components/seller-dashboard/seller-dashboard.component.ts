import { Component, OnInit } from '@angular/core';
import { ChartDataset, ChartOptions, ChartType } from 'chart.js';
import { ProductsService } from 'src/app/services/products.service';
import { UsersService } from 'src/app/services/users.service';
import { SellerService } from 'src/app/services/seller.service';
import { Product } from '../../../Models';



@Component({
  selector: 'app-seller-dashboard',
  templateUrl: './seller-dashboard.component.html',
  styleUrls: ['./seller-dashboard.component.css']
})
export class SellerDashboardComponent implements OnInit {
  nb_vendors: number=0;
  nb_products: number=0;
  nb_customer: number=0;

  barChartData: ChartDataset[] = [];
  barChartLabels: string[] = [];
  barChartOptions: ChartOptions = {
    responsive: true
  };
  barChartType: ChartType = 'bar';
  barChartLegend = true;
  barChartPlugins = [];
  dataLoaded = false;

  constructor(private productsService: ProductsService, private usersService: UsersService, private sellerService: SellerService, private product: ProductsService) { }
  //sortsbased on price in descending order, selects the top 5 products, and displays the quantity data of those products 
  ngOnInit(): void {
    this.productsService.productList().subscribe((products) => {
      // Get the quantity data for each product
      const quantityData = products.map((product) => product.price?? 0); // Convert undefined values to 0
  
      // Sort products based on .pricedata in descending order
      const sortedProducts = products.sort((a, b) => (a.price?? 0) - (b.price?? 0)).reverse();
  
      // Display top 5 products with highest quantity
      const topProducts = sortedProducts.slice(0, 5);
  
      this.barChartData = [{
        data: quantityData as any[], // Convert quantityData to any[] type
        label: 'Product Quantity',
        backgroundColor: 'rgba(0, 0, 255, 0.5)', // Set the background color to blue with transparency
        borderColor: 'rgba(0, 0, 255, 0.5)', // Set the border color to blue
      }];
  
      this.barChartLabels = topProducts.map((product) => product.name);
      this.dataLoaded = true;
    });
  }
  
  
}  