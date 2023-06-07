import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable, firstValueFrom } from 'rxjs';
import { RegisterResponse } from 'src/app/shared/interfaces/auth.interface';
import { StoreService } from 'src/app/shared/services/store.service';

@Injectable({
  providedIn: 'root',
})
export class ValidateRoleGuard implements CanActivate {
  profile: RegisterResponse | null = null;

  constructor(private store: StoreService, private router: Router) {}

  async canActivate(): Promise<boolean> {
    const profile$ = this.store.getProfile();
    this.profile = await firstValueFrom(profile$);
    console.log("Segundo guard");
    if (this.profile?.role == 'customer') {
      return true;
    } else {
      this.router.navigate(['/user/admin']);
      return false;
    }
  }

  /*   canActivate(): Observable<boolean> | boolean { 
    this.store.getProfile()
    .subscribe( profile => this.profile = profile)
    console.log(this.profile?.role);
    if (this.profile?.role == 'customer') {
      return true;
    } else if (this.profile?.role == 'admin') {
      return true;
    } else {
    this.router.navigate(['/auth']);
    return false;
    }
  } */

  /*   canActivate(): Observable<boolean> | boolean { 
    this.store.getProfile()
    .subscribe( profile => this.profile = profile)
    console.log(this.profile?.role);
    if (this.profile?.role == 'customer') {
      this.router.navigate(['/user']);
      return true;
    } else if (this.profile?.role == 'admin') {
      this.router.navigate(['/user/admin']);
      return true;
    } else {
    this.router.navigate(['/auth']);
    return false;
    }
  } */
}
