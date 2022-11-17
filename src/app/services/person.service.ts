import { Person } from './../models/person';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PersonService {

  private person: Person[];

  constructor() {

    this.person = [
      {
        id: 1,
        name: 'Juan Pablo Campos',
        phone: '',
        fechaInicio: "",
        fechaFin: '',
        habitación: '',
        tipo: 'admin'
      }
    ]

  }

  public addPerson(persona: Person){

  }


}
