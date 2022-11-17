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
        fechaInicio: '',
        fechaFin: '',
        habitación: '',
        tipo: 'admin'
      },
      {
        id: 2,
        name: 'Adrian',
        phone: '3112222222',
        fechaInicio: '2022-11-17',
        fechaFin: '2022-11-19',
        habitación: 'A1',
        tipo: 'guest'
      },
      {
        id: 3,
        name: 'Ana',
        phone: '3112222221',
        fechaInicio: '2022-11-17',
        fechaFin: '2022-11-19',
        habitación: 'A2',
        tipo: 'guest'
      },
      {
        id: 4,
        name: 'Polo',
        phone: '3112422222',
        fechaInicio: '2022-11-17',
        fechaFin: '2022-11-19',
        habitación: 'A3',
        tipo: 'guest'
      }
    ]

  }

  public addPerson(persona: Person){
    this.person.push(persona);
    console.log(this.person)
  }


}
