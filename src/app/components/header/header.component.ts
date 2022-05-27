import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Person } from 'src/app/models/person';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { HeaderService } from 'src/app/services/header.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  public person: Person | undefined;
  public editPerson: Person | undefined;

  constructor(private headerService: HeaderService, public authentication: AuthenticationService) { }

  ngOnInit(): void { //interfaz
    this.getPerson(); //Colocamos el metodo que creamos más abajo para poder usarlo
  }

  public getPerson(): void { //Metodo que trae usuarios
    this.headerService.getPerson().subscribe({ //suscribe el metodo creado en headerService
      next: (response: Person) => {
        this.person = response;
      },
      error: (error: HttpErrorResponse) => {
        alert(error.message);
      }
    })
  }

  public onOpenModal(mode: string): void {
    const container = document.getElementById('main-container');
    const button = document.createElement('button');
    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-toggle', 'modal');
    if (mode === 'edit') {
      this.editPerson = this.person;
      button.setAttribute('data-target', '#editPersonModal');
    }

    container?.appendChild(button);
    button.click();
  }

  public onUpdatePerson(person: Person) {
    this.editPerson = person;
    document.getElementById('add-person-form')?.click();
    this.headerService.updatePerson(person).subscribe({
      next: (response: Person) => {
        console.log(response);
        this.getPerson();
      },
      error: (error: HttpErrorResponse) => {
        alert(error.message);
      }
    })
  }

  logeado = () => this.authentication.logeado();
}