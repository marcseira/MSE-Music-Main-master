import { Pipe, PipeTransform } from '@angular/core';
import { ProductsResponse } from '../interfaces/store.interface';

@Pipe({
  name: 'sort'
})

export class SortPipe implements PipeTransform {
  transform(products: ProductsResponse[]): Array<any> {
      return products.sort((a, b) => {
          if (a.price < b.price) {
              return -1;
          } else if (a.price > b.price) {
              return 1;
          } else {
              return 0;
          }
      });
  }
}
