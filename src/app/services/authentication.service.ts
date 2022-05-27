import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  /* url="http://localhost:8080"; */

  url = '*';
  currentUserSubject: BehaviorSubject<any>;
  pipi: boolean | undefined;

  constructor(private http: HttpClient) {
    console.log("El servicio de autenticación está corriendo");
    this.currentUserSubject = new BehaviorSubject<any>(JSON.parse(sessionStorage.getItem('currentUser') || '{}'))
  }

  IniciarSesion(credenciales: any): Observable<any> {
    return this.http.post(`${this.url}/api/login`, credenciales).pipe(map((data) => {
      sessionStorage.setItem('currentUser', JSON.stringify(data));
      this.currentUserSubject.next(data);
      this.pipi = true;
      return data;
    }))
  }

  get UsuarioAutenticado() {
    return this.currentUserSubject.value;
  }

  logeado() {
    return this.pipi;
  }

  deslogeado() {
    this.pipi = false;
    sessionStorage.clear();
    localStorage.clear();
    this.currentUserSubject.next(null);
  }
}



