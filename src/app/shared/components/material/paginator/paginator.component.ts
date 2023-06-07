import { Component, EventEmitter, Input, Output } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { ProductsResponse } from 'src/app/shared/interfaces/store.interface';

@Component({
  selector: 'app-paginator',
  templateUrl: './paginator.component.html',
  styleUrls: ['./paginator.component.css']
})
export class PaginatorComponent {

  @Input() products : ProductsResponse[] = [];
  @Input() length : number = 0;
  @Input() pageIndex : number = 0;
  productSlice : ProductsResponse[] = [];
  pageSize : number = 12;
  pageEvent!: PageEvent;
  @Output() paginated: EventEmitter<ProductsResponse[]> = new EventEmitter();

  onPageChange(event: PageEvent) {
    const startIndex = event.pageIndex * event.pageSize;
    let endIndex = startIndex + event.pageSize;
    if (endIndex > this.products.length) {
      endIndex = this.products.length;
    }
    this.productSlice = this.products.slice(startIndex, endIndex);
    this.paginated.emit(this.productSlice);
  }

}
