import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Cart, Product } from '../Models';
import { ProductsService } from '../services/products.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css'],
})
export class ProductDetailsComponent implements OnInit {
  productData: undefined | Product;

  productQuantity: number = 1;
  cartData: Product | undefined;
  removeCart = false;
  constructor(
    private activeRoute: ActivatedRoute,
    private product: ProductsService
  ) {}

  ngOnInit(): void {
    //Retrieves the productID &  returns the value of the specified parameter as a string 
    let productId = this.activeRoute.snapshot.paramMap.get('productID');
    
    //Checks if productId is TRUE and calls the getProduct()
    productId &&
      this.product.getProduct(productId).subscribe((result) => {
        this.productData = result;
        //local storage
        let cartData = localStorage.getItem('localCart');
        if (productId && cartData) {
          // Parses the cartData from a JSON string into an array of objects
          let items = JSON.parse(cartData);
          // Filters the items array based on the matching productId
          items = items.filter(
            (item: Product) => productId == item.id.toString()
          );
          //If the product is found in the cart, it sets this.removeCart to true
          if (items.length) {
            this.removeCart = true;
          } else {
            this.removeCart = false;
          }
        }
        //Retrieves the user data from the browser's local storage.
        let user = localStorage.getItem('user');
        if (user) {
          let userId = user && JSON.parse(user).id;
          this.product.getCartList(userId);
          this.product.cartData.subscribe((result) => {
            let item = result.filter(
              (item: Product) =>
                productId?.toString() === item.productId?.toString()
            );
            if (item.length) {
              this.cartData = item[0]; // first item from the filtered array  is assigned to this.cartData
              this.removeCart = true;
            }
          });
        }
      });
  }
  //quantity control
  handleQty(val: string) {
    if (this.productQuantity < 10 && val === 'max') {
      this.productQuantity += 1;
    } else if (this.productQuantity > 1 && val === 'min') {
      this.productQuantity -= 1;
    }
  }
  //addto card
  addToCart() {
    if (this.productData) {
      this.productData.quantity = this.productQuantity;
      //If the user is not logged in
      if (!localStorage.getItem('user')) {
        // adds the product data to the local cart (localStorage)
        // and sets this.removeCart to true, indicating that the product is added to the cart.
        this.product.localAddToCart(this.productData);
        this.removeCart = true;
      } else {
        //user infos
        let user = localStorage.getItem('user');
       //store the id 
        let userId = user && JSON.parse(user).id;
        /**copy productData props and add them to the cartData object. **/
        let cartData: Cart = {
          ...this.productData,
          userId,
          productId: this.productData.id,
        };
        /**before sending the data to the server, you allow the server to generate a 
        new unique identifier for the cart entry**/
        delete cartData.id;
        this.product.addToCart(cartData).subscribe((result) => {
          if (result) {
            this.product.getCartList(userId);
            this.removeCart = true;
          }
        });
      }
    }
  }

  removeToCart(productId: number) {
    if (!localStorage.getItem('user')) {
      this.product.removeFromCart(productId);
    } else {
      this.cartData &&
        this.product.removeToCart(this.cartData.id).subscribe((result) => {
          let user = localStorage.getItem('user');
          let userId = user && JSON.parse(user).id;
          this.product.getCartList(userId);
        });
    }
    this.removeCart = false;
  }
}
