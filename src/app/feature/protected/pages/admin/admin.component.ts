import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RegisterResponse } from 'src/app/shared/interfaces/auth.interface';
import { ProductsResponse } from 'src/app/shared/interfaces/store.interface';
import { StoreService } from 'src/app/shared/services/store.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  length = 0;
  profile: RegisterResponse | null  = null;
  products: ProductsResponse[] = [];
  totalProducts: ProductsResponse[] = [];

  constructor(private store:StoreService, private router:Router) { }

  ngOnInit(): void {
    this.store.allProducts()
    .subscribe(products => {
      this.totalProducts = products;
      this.products = products.slice(0,12);
      this.length = products.length;
    })
    this.store.getProfile()
    .subscribe(profile => this.profile = profile)
  }

  update(productsUpdate:ProductsResponse[]){
    this.totalProducts = productsUpdate;
    this.products = productsUpdate.slice(0,12);
  }

  pagination(pagination:ProductsResponse[]){
    this.products = pagination;
  }

  logout(){
    this.store.logout();
    this.router.navigate(['/auth']);
  }

}
