import { Component, OnInit } from '@angular/core';
import { CategoriesResponse, ProductsResponse } from 'src/app/shared/interfaces/store.interface';
import { StoreService } from 'src/app/shared/services/store.service';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  word: string = '';
  quantity: number = 12;
  loadData: boolean = true;
  length: number = 0;
  index: number = 0;
  products !: ProductsResponse[];
  productsPaginator !: ProductsResponse[];
  categories !: CategoriesResponse[];
  uniqueRemixers: string[] = [];

  constructor(private store: StoreService, private activatedRoute: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        window.scrollTo(0, 0); // Desplazar la ventana hacia arriba al cambiar de ruta
      }
    });
    this.store.allProducts()
      .subscribe(products => {
        this.products = products.slice(0, 12);
        this.productsPaginator = products;
        this.length = products.length;
        this.loadData = false;
      });
    this.store.categories()
      .subscribe(categories => this.categories = categories);

    this.activatedRoute.queryParams
      .subscribe(params => {
        var myId = params['categoryId'];
        if (myId) {

          this.filter(myId)
        } else {
          console.log("vaina loca")
        }
      });

  }

  search() {
    if (this.word) {
      this.store.searchProducts(this.word)
        .subscribe(products => {
          if (products.length == 0) {
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: 'No se encontró el producto',
            });
          } else {
            this.productsPaginator = products;
            this.products = this.productsPaginator.slice(0, 12);
            this.length = products.length;
            this.index = 0;
          }
        });
    } else {
      this.store.allProducts()
        .subscribe(products => {
          this.productsPaginator = products;
          this.products = this.productsPaginator.slice(0, 12);
          this.length = products.length;
          this.index = 0;
        });
    }
  }

  filter(id: string) {
    this.store.filterCategories(id)
      .subscribe(products => {
        this.productsPaginator = products;
        this.products = this.productsPaginator.slice(0, 12);
        this.length = products.length;
        this.index = 0;
      })
  }

  filter2(id: number) {
    this.router.navigate(['/products'], { queryParams: { categoryId: id } });
  }

  paginated(productsPaginated: ProductsResponse[]) {
    this.products = productsPaginated;
  }

  sortBPM(event: Event) {
    const value = (event.target as HTMLOptionElement).value;
    if (value === "LowToHigh") {
      this.productsPaginator.sort((a, b) => {
        if (a.tempo < b.tempo) {
          return -1;
        } else if (a.tempo > b.tempo) {
          return 1;
        } else {
          return 0;
        }
      })
    } else {
      this.productsPaginator.sort((a, b) => {
        if (a.tempo > b.tempo) {
          return -1;
        } else if (a.tempo < b.tempo) {
          return 1;
        } else {
          return 0;
        }
      })
    }
    this.products = this.productsPaginator.slice(0, 12);
  }
}

