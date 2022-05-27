import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Person } from '../models/person';

@Injectable({
  providedIn: 'root'
})
export class HeaderService {
  private apiServerUrl ='*';

  constructor(private http: HttpClient) { }

  public getPerson(): Observable<Person> { //getUser: para traer ususarios; Observable: para vincular y traer los datos; <Usuario>: para que mire al usuario
    return this.http.get<Person>(`${this.apiServerUrl}/api/person/1`); //Trae el usuario, desde apiServerUrl y le pasamos la ruta
  }

  public updatePerson(person: Person): Observable<Person> {
    return this.http.put<Person>(`${this.apiServerUrl}/api/person`, person);
  }

}
