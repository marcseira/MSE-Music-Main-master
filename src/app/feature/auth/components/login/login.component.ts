import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { StoreService } from 'src/app/shared/services/store.service';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  miFormulario: FormGroup = this.fb.group({
    email:    ['john@mail.com', [ Validators.required, Validators.pattern("[a-zA-Z0-9.-_]{1,}@[a-zA-Z.-]{2,}[.]{1}[a-zA-Z]{2,3}") ]],
    password: ['changeme', [ Validators.required, Validators.minLength(6) ]],
  });

  hide = true;

  constructor(private fb: FormBuilder, private router: Router, private store:StoreService) { }

  campoValido(campo:string){
    return this.miFormulario.controls[campo]?.errors && this.miFormulario.controls[campo]?.touched;
  }

  login() {
    const { email, password } = this.miFormulario.value;
    this.store.login( email, password ).subscribe({
      next: (resp:any) => {
        if (resp.role == 'customer') {
          this.router.navigateByUrl('/user');
        } else if (resp.role == 'admin') {
          this.router.navigateByUrl('/user/admin');
        } },
      error: (error) => {
        console.log(error);
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: error.error.message,
        })
      },
    });
  }
}
