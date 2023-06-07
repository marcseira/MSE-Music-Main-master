import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpContextToken,
  HttpContext
} from '@angular/common/http';
import { Observable, switchMap } from 'rxjs';

import { StoreService } from '../services/store.service';

const CHECK_TOKEN = new HttpContextToken<boolean>(() => false);

export function checkToken(){
  return new HttpContext().set(CHECK_TOKEN, true);
}

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor(private token:StoreService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    if(request.context.get(CHECK_TOKEN)){
      const isValidToken = this.token.validateToken();
      if(isValidToken){
        return this.addToken(request, next);
      }
      else {
        return this.updateAccessTokenAndRefreshToken(request, next);
      }
    }
    return next.handle(request);
  }

  private addToken(request:HttpRequest<unknown>, next: HttpHandler) {
    const accessToken = this.token.getToken();
    if(accessToken){
      const AuthRequest = request.clone({
        headers: request.headers.set('Authorization', `Bearer ${accessToken}`)
      });
      return next.handle(AuthRequest);
    }
    return next.handle(request);
  }

  private updateAccessTokenAndRefreshToken(request:HttpRequest<unknown>, next: HttpHandler){
    const refreshToken = this.token.getRefreshToken();
    const isValidRefreshToken = this.token.validateRefreshToken();
    if(refreshToken && isValidRefreshToken){
      return this.token.refreshToken(refreshToken)
      .pipe(
        switchMap(() => this.addToken(request, next)),
      )
    }
    return next.handle(request);
  }
}
