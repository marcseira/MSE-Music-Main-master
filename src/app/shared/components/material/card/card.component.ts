import { Component, Input, OnInit } from '@angular/core';
import { ProductsResponse } from 'src/app/shared/interfaces/store.interface';
import { StoreService } from 'src/app/shared/services/store.service';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit {

  @Input() product !: ProductsResponse;
  cart: ProductsResponse[] = [];

  constructor(private store:StoreService) { }

  ngOnInit(): void {
    this.cart = this.store.getCart();
  }

  addProduct(){
    this.store.saveCart(this.product);
  }

}
