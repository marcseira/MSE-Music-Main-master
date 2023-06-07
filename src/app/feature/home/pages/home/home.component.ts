import { Component, HostListener, Input, OnInit } from '@angular/core';
import { CategoriesResponse, ProductsResponse } from 'src/app/shared/interfaces/store.interface';
import { StoreService } from 'src/app/shared/services/store.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  quantity: number = 4;
  categories !: CategoriesResponse[];
  products !: ProductsResponse[];
  banner1 = "La mejor música exclusiva";
  banner3 = "Ultimas novedades";
  isSmallScreen = false;
  constructor(private store: StoreService) { }

  ngOnInit(): void {
    this.store.categories()
      .subscribe(categories => this.categories = categories);
    this.store.someProducts(this.quantity)
      .subscribe(products => {
        // Ordenar los productos por fecha de añadido (descendente)
        this.products = products.sort((a, b) => {
          return new Date(b.dateAdded).getTime() - new Date(a.dateAdded).getTime();
        });
      });
    this.store.saveVoidCart();
  }



}



