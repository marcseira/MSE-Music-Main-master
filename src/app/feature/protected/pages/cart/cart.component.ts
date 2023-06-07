import { Component, OnInit } from '@angular/core';
import { ProductsResponse } from 'src/app/shared/interfaces/store.interface';
import { StoreService } from 'src/app/shared/services/store.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  cart !: ProductsResponse[];
  total : number = 0;

  constructor(private store:StoreService) { }

  ngOnInit(): void {
    this.cart = this.store.getCart();
    this.totalCart(this.cart);
    this.store.saveVoidCart();
  }

  update(productsUpdate:ProductsResponse[]){
    this.cart = productsUpdate;
    console.log(this.cart);
    this.totalCart(this.cart);
  }

  totalCart(cart:ProductsResponse[]){
    for(let i in cart){
      this.total = this.total + cart[i].price;
    }
  }

}
