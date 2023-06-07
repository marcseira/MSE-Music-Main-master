import { Component, EventEmitter, Input, Output } from '@angular/core';

import {MatDialog} from '@angular/material/dialog';
import { DialogComponent } from '../dialog/dialog.component';
import { ProductsResponse } from 'src/app/shared/interfaces/store.interface';
import { StoreService } from 'src/app/shared/services/store.service';
import { Sort } from '@angular/material/sort';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})

export class TableComponent {

  @Input() products: ProductsResponse[] = [];
  @Input() totalProducts: ProductsResponse[] = [];
  @Output() newTable: EventEmitter<ProductsResponse[]> = new EventEmitter();

  constructor(private dialog: MatDialog, private store:StoreService) { }

  displayedColumns: string[] = ['image', 'title', 'price', 'description', 'category', 'action'];

  sortData(sort: Sort) {
    const data = this.totalProducts;
    if (!sort.active || sort.direction === '') {
      this.totalProducts = data;
      return;
    }

    this.products = data.sort((a, b) => {
      const isAsc = sort.direction === 'asc';
      switch (sort.active) {
        case 'title':
          return compare(a.title, b.title, isAsc);
        case 'price':
          return compare(a.price, b.price, isAsc);
        case 'description':
          return compare(a.description, b.description, isAsc);
        case 'category':
          return compare(a.category.name, b.category.name, isAsc);
        default:
          return 0;
      }
    });
    this.products = this.products.slice(0,12);
  }

  dialogForm() {
    const dialogRef = this.dialog.open(DialogComponent);

    dialogRef.afterClosed().subscribe(result => {
      this.updatedTable();
    });
  }

  dialogFormEdit(data:ProductsResponse) {
    const dialogRef = this.dialog.open(DialogComponent, {data});

    dialogRef.afterClosed().subscribe(result => {
      this.updatedTable();
    });
  }

  updatedTable(){
    this.store.allProducts()
    .subscribe(resp => {
      this.newTable.emit(resp);
    })
  }

}

function compare(a: number | string, b: number | string, isAsc: boolean) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}