import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'https://api.escuelajs.co/api/v1'; // URL de la API en el servidor

  constructor(private http: HttpClient) {}

  login(email: string, password: string) {
    const url = `${this.apiUrl}`; // Ruta para la autenticación en la API
    const body = { email, password }; // Datos de inicio de sesión

    return this.http.post(url, body);
  }
}
