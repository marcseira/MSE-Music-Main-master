import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { StoreService } from 'src/app/shared/services/store.service';

@Injectable({
  providedIn: 'root'
})
export class RedirectGuard implements CanActivate {

  constructor( private token: StoreService, private router: Router) {}

  canActivate(): boolean{
    const isValidToken = this.token.validateToken();
    if (isValidToken) {
      this.router.navigate(['/']);
    }
    return true;
  }
  
}
