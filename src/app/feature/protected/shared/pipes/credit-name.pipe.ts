import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'creditName',
  pure: true,
})
export class CreditNamePipe implements PipeTransform {

  chars = /[!"#$%&'()*+,\-./:;<=>?@[\\\]^_`{|}~]/gim
  numbers = /[0-9.]/g

  transform(name: string): string {
    
    if( name.match(this.chars) || name.match(this.numbers) ){
      return name= "jhon doe"
    } else {
      return name
      // Eliminar números
      .replace(/[0-9.]/g, '')
      .replace(/[!"#$%&'()*+,\-./:;<=>?@[\\\]^_`{|}~]/gim, '')  
    }
  }
}