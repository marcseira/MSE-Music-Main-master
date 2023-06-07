import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, switchMap, tap } from 'rxjs';
import { getCookie, setCookie, removeCookie } from 'typescript-cookie'
import jwt_decode, { JwtPayload } from "jwt-decode";

import { environment } from 'src/environments/environment.prod';
import { CategoriesResponse, ProductsResponse } from '../interfaces/store.interface';
import { LoginResponse, RegisterResponse } from '../interfaces/auth.interface';
import { checkToken } from '../interceptors/token.interceptor';

@Injectable({
  providedIn: 'root'
})
export class StoreService {
  private baseUrl: string = environment.baseUrl;
  private baseUrl2: string = environment.baseUrl2;
  existToken$ = new BehaviorSubject<boolean>(false);

  constructor(private http: HttpClient) { }


  someProducts(quantity: number): Observable<ProductsResponse[]> {
    const offset = `0`;
    const url = `${this.baseUrl}/songs?offset=${offset}&limit=${quantity}`;
    return this.http.get<ProductsResponse[]>(url);
  }

  allProducts(): Observable<ProductsResponse[]> {
    const url = `${this.baseUrl}/songs`;
    return this.http.get<ProductsResponse[]>(url);
  }

  oneProduct(id: number): Observable<ProductsResponse> {
    const url = `${this.baseUrl}/songs/${id}`;
    return this.http.get<ProductsResponse>(url);
  }

  searchProducts(busqueda: String): Observable<ProductsResponse[]> {
    const offset = `0`;
    const url = `${this.baseUrl}/songs/title/${busqueda}`;
    return this.http.get<ProductsResponse[]>(url);
  }

  categories(): Observable<CategoriesResponse[]> {
    const offset = `0`;
    const cantidad = `5`; 
    const url = `${this.baseUrl}/categories?offset=${offset}&limit=${cantidad}`;
    return this.http.get<CategoriesResponse[]>(url);
  }

  filterCategories(id: string): Observable<ProductsResponse[]> {
    const url = `${this.baseUrl}/songs/categoryId/${id}`;
    return this.http.get<ProductsResponse[]>(url);
  }

  filterRemixer(name: string): Observable<ProductsResponse[]> {
    const url = `${this.baseUrl}/songs/?remixer=${name}`;
    return this.http.get<ProductsResponse[]>(url);
  }


  //Login, registro y token
  login(email: string, password: string) {
    const url = `${this.baseUrl2}/auth/login`;
    return this.http.post<LoginResponse>(url, { email, password })
      .pipe(
        tap(resp => {
          if (resp.access_token) {
            this.saveToken(resp.access_token);
            this.saveRefreshToken(resp.access_token);
          }
        }),
        switchMap(() => this.getProfile()
        )
      );
  }

  register(fullname: string, email: string, password: string) {

    const url = `${this.baseUrl2}/user`;
    const avatar = "https://w7.pngwing.com/pngs/627/693/png-transparent-computer-icons-user-user-icon-thumbnail.png";
    const body = { fullname, email, password, avatar };

    return this.http.post<RegisterResponse>(url, body)
  }

  registerAndLogin(name: string, email: string, password: string) {
    return this.register(name, email, password)
      .pipe(
        switchMap(() => this.login(email, password))
      );
  }

  saveToken(token: string) {
    setCookie('token', token, { expires: 365, path: '/' });
  }

  getToken() {
    const token = getCookie('token');
    return token;
  }

  logout() {
    removeCookie('token');
    removeCookie('refresh-token');
    this.existToken$.next(false);
  }

  saveRefreshToken(token: string) {
    setCookie('refresh-token', token, { expires: 365, path: '/' });
  }

  getRefreshToken() {
    const token = getCookie('refresh-token');
    return token;
  }

  /*   logoutRefresh(){
      removeCookie('refresh-token');
    } */

  refreshToken(refreshToken: string) {
    const url = `${this.baseUrl2}/auth/refresh-token`;
    return this.http.post<LoginResponse>(url, { refreshToken })
      .pipe(
        tap(resp => {
          if (resp.access_token) {
            this.saveToken(resp.access_token);
            this.saveRefreshToken(resp.access_token);
          }
        }),
      );
  }

  getProfile(): Observable<RegisterResponse> {
    const url = `${this.baseUrl2}/auth/profile`;
    return this.http.get<RegisterResponse>(url, { context: checkToken() })
  }

  validateToken() {
    const token = this.getToken();
    if (!token) {
      return false;
    }
    const decodeToken = jwt_decode<JwtPayload>(token);
    if (decodeToken && decodeToken?.exp) {
      this.existToken$.next(true);
      const tokenDate = new Date(0);
      tokenDate.setUTCSeconds(decodeToken.exp);
      const today = new Date();
      return tokenDate.getTime() > today.getTime();
    }
    return false;
  }

  validateRefreshToken() {
    const token = this.getRefreshToken();
    if (!token) {
      return false;
    }
    const decodeToken = jwt_decode<JwtPayload>(token);
    if (decodeToken && decodeToken?.exp) {
      this.existToken$.next(true);
      const tokenDate = new Date(0);
      tokenDate.setUTCSeconds(decodeToken.exp);
      const today = new Date();
      return tokenDate.getTime() > today.getTime();
    }
    return false;
  }

  //Cart
  getCart() {
    const data = JSON.parse(localStorage.getItem('cart') || '{}');
    return data;
  }
  
  sonidoCarrito() {
    var audio = new Audio('assets/buy.mp3');
    audio.play();
  }

  saveCart(product: ProductsResponse) {
    const cart: ProductsResponse[] = this.getCart();
    
    // Verificar si el producto ya está en el carrito
    const productExists = cart.some(item => item.id === product.id);
    
    if (productExists) {
      alert('El producto ya está en el carrito');
   
    } else {
      cart.push(product);
      localStorage.setItem('cart', JSON.stringify(cart));
      this.sonidoCarrito();
    }
  }

  saveVoidCart() {
    if (localStorage.getItem('cart') == undefined) {
      var cart: any[] = [];
      localStorage.setItem('cart', JSON.stringify(cart));
    }
  }

  deleteProductCart(id: number) {
    var cart = this.getCart();
    for (var i = 0; i < cart.length; i++) {
      if (cart[i].id == id) {
        console.log(cart[i].id);
        cart.splice(i, 1);
        localStorage.setItem('cart', JSON.stringify(cart));
        break;
      }
    }
  }

  // Verificar si el producto está en el carrito
  isProductInCart(product: ProductsResponse): boolean {
    const cart: ProductsResponse[] = this.getCart();
    return cart.some(item => item.id === product.id);
  }
  
  getRecord() {
    const data = JSON.parse(localStorage.getItem('record') || '{}');
    return data;
  }

  saveRecord() {
    var cart: ProductsResponse[] = this.getCart();
    var cart1: any = [];
    localStorage.setItem('record', JSON.stringify(cart));
    localStorage.removeItem('cart');
    localStorage.setItem('cart', JSON.stringify(cart1));
  }

}
