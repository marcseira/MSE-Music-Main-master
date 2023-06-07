import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { StoreService } from 'src/app/shared/services/store.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-credit-card',
  templateUrl: './credit-card.component.html',
  styleUrls: ['./credit-card.component.css']
})
export class CreditCardComponent {

  mesesYear = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12']

  years = [22, 23, 24, 25, 26, 27, 28]

  gmailValue    : string              = '';
  cardNumber    : string              = '';
  cardName      : string              = '';
  month         : number   | string   = 'MM';
  year          : number[] | string   = 'YY';
  cvv           : string              = '';

  constructor( private store: StoreService, private router:Router){
    document.getElementById('selectMes')?.innerText!= 'Month'
    
  }
  
  convertToLowerCase() {
    this.gmailValue = this.gmailValue.toLowerCase();
  }


  // Agregando clase que rota la tarjeta
  rotate(tarjeta: HTMLElement) {
    tarjeta.classList.toggle('active')
  }

  voltearTarjeta(){
    if( document.getElementById('tarjeta')?.classList.contains('active') ){
      document.getElementById('tarjeta')?.classList.remove('active')
    }
  }

  rellenarCVV(){
    if( !document.getElementById('tarjeta')?.classList.contains('active') ) {
      document.getElementById('tarjeta')?.classList.add('active')
    }
  }

  displayForm() {
    document.getElementById('formulario-tarjeta')?.classList.toggle('active')
    document.getElementById('btn-abrir-formulario')?.classList.toggle('active')
  }

  complete( form: NgForm ) {

    form.value.cardNumber = this.cardNumber
    // Eliminando espacios en blanco
    .replace(/\s/g, '')
    // Elimina las letras
    .replace(/\D/g, '')
    // Agregar espacio cada cuatro números
    .replace(/([0-9]{4})/g, '$1 ')
    // Eliminando últimos espaciados
    .trim()

    this.cardNumber = form.value.cardNumber;

    switch (form.value.cardNumber.slice(0, 1)) {

      case "3":
        document.getElementById('logo-marca')!.innerHTML = ''
        document.getElementById('logo-marca-trasera')!.innerHTML = ''
        let imagen2 = document.createElement('img')
        imagen2.setAttribute('width','150rem')
        imagen2.src = '../../../../../../assets/americanexpress.png'
        document.getElementById('logo-marca')!.appendChild(imagen2)
        break;

      case "4":
        document.getElementById('logo-marca')!.innerHTML = ''
        document.getElementById('logo-marca-trasera')!.innerHTML = ''
        let imagen = document.createElement('img')
        imagen.setAttribute('width','140rem')
        imagen.src = '../../../../../../assets/visa.png'
        document.getElementById('logo-marca')!.appendChild(imagen)
        break;

      case "5":
        document.getElementById('logo-marca')!.innerHTML = ''
        document.getElementById('logo-marca-trasera')!.innerHTML = ''
        let imagen1 = document.createElement('img')
        imagen1.setAttribute('width','130rem')
        imagen1.src = '../../../../../../assets/mastercard.png'
        document.getElementById('logo-marca')!.appendChild(imagen1)
        break;

      case "6":
        document.getElementById('logo-marca')!.innerHTML = ''
        document.getElementById('logo-marca-trasera')!.innerHTML = ''
        let imagen3 = document.createElement('img')
        imagen3.setAttribute('width','180rem')
        imagen3.src = '../../../../../../assets/discover.png'
        document.getElementById('logo-marca')!.appendChild(imagen3)
        break;

      case "": 
        document.getElementById('logo-marca')!.innerHTML = ''
        document.getElementById('logo-marca-trasera')!.innerHTML = ''
    }

    // Imagen Back

    switch (form.value.cardNumber.slice(0, 1)) {

      case "3":
        document.getElementById('logo-marca-trasera')!.innerHTML = ''
        let imagen2 = document.createElement('img')
        imagen2.setAttribute('width','150rem')
        imagen2.src = '../../../../../../assets/americanexpress.png'
        document.getElementById('logo-marca-trasera')!.appendChild(imagen2)
        break;

      case "4":
        document.getElementById('logo-marca-trasera')!.innerHTML = ''
        let imagen = document.createElement('img')
        imagen.setAttribute('width','140rem')
        imagen.src = '../../../../../../assets/visa.png'
        document.getElementById('logo-marca-trasera')!.appendChild(imagen)
        break;

      case "5":
        document.getElementById('logo-marca-trasera')!.innerHTML = ''
        let imagen1 = document.createElement('img')
        imagen1.setAttribute('width','130rem')
        imagen1.src = '../../../../../../assets/mastercard.png'
        document.getElementById('logo-marca-trasera')!.appendChild(imagen1)
        break;

      case "6":
        document.getElementById('logo-marca-trasera')!.innerHTML = ''
        let imagen3 = document.createElement('img')
        imagen3.setAttribute('width','180rem')
        imagen3.src = '../../../../../../assets/discover.png'
        document.getElementById('logo-marca-trasera')!.appendChild(imagen3)
        break;

      case "": 
        document.getElementById('logo-marca')!.innerHTML = ''
        document.getElementById('logo-marca-trasera')!.innerHTML = ''
    }

    this.voltearTarjeta()
  }

  payment(){
    this.store.saveRecord();
    this.router.navigateByUrl('/user');
    Swal.fire({
      icon: 'success',
      title: 'Compra realizada correctamente',
    })
  }

}
