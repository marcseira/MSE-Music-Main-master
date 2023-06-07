import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ProductsResponse } from 'src/app/shared/interfaces/store.interface';
import { StoreService } from 'src/app/shared/services/store.service';

@Component({
  selector: 'app-cart-products',
  templateUrl: './cart-products.component.html',
  styleUrls: ['./cart-products.component.css']
})
export class CartProductsComponent implements OnInit {

  @Input() product !: ProductsResponse;
  @Output() update: EventEmitter<ProductsResponse[]> = new EventEmitter();
  total : number = 0;

  constructor(private store:StoreService) { }

  ngOnInit(): void {
    if(this.product.quantity!=null){
      this.total = this.product.price * this.product.quantity;
    }
  }

  increase(){
    if(this.product != null){
      var c = this.product?.quantity ?? 1;
      c = c + 1;
      this.product.quantity = c;
      this.total = this.total + this.product.price;
    }
  }

  decrease(){
    if(this.product != null){
      if(this.product.quantity!==1){
        var c = this.product?.quantity ?? 1;
        c = c - 1;
        this.product.quantity = c;
        this.total = this.total - this.product.price;
      }
    }
  }

  remove(id:number){
    this.store.deleteProductCart(id);
    const cart = this.store.getCart()
    this.update.emit(cart);
  }

}
