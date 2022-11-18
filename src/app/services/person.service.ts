import { Person } from './../models/person';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class PersonService {
  private people: Person[];

  constructor() {
    this.people = [
      {
        id: 1,
        name: 'Juan Pablo Campos',
        phone: '',
        fechaInicio: '',
        fechaFin: '',
        habitacion: '',
        tipo: 'admin',
      },
      {
        id: 2,
        name: 'Adrian',
        phone: '3112222222',
        fechaInicio: '2022-11-17',
        fechaFin: '2022-11-19',
        habitacion: 'A1',
        tipo: 'guest',
      },
      {
        id: 3,
        name: 'Ana',
        phone: '3112222221',
        fechaInicio: '2022-11-17',
        fechaFin: '2022-11-19',
        habitacion: 'A2',
        tipo: 'guest',
      },
      {
        id: 4,
        name: 'Polo',
        phone: '3112422222',
        fechaInicio: '2022-11-17',
        fechaFin: '2022-11-19',
        habitacion: 'A3',
        tipo: 'guest',
      },
    ];
  }

  public addPerson(persona: Person) {
    this.people.push(persona);
    console.log(this.people);
  }

  public getPersons(): Person[] {
    return this.people;
  }

  public removePerson(id: number): Person[] {
    this.people = this.people.filter((person) => person.id != id && person.tipo === 'guest');
    for(let i =0; i<  this.people.length; i++ ){
      console.log(this.people[i].name);
    }
    return this.people;
  }
}
