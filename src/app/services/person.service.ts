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
        fechaInicio: new Date(),
        fechaFin: new Date(),
        habitacion: '',
        tipo: 'admin',
        token: 10000
      },
      {
        id: 2,
        name: 'Adrian',
        phone: '3112222222',
        fechaInicio: new Date(),
        fechaFin: new Date(),
        habitacion: 'A1',
        tipo: 'guest',
        token: 10001
      },
      {
        id: 3,
        name: 'Ana',
        phone: '3112222221',
        fechaInicio: new Date(),
        fechaFin: new Date(),
        habitacion: 'A2',
        tipo: 'guest',
        token: 10002
      },
      {
        id: 4,
        name: 'Polo',
        phone: '3112272687',
        fechaInicio: new Date(),
        fechaFin: new Date(),
        habitacion: 'A3',
        tipo: 'guest',
        token: 10003
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

  public getID(): number {
    return this.people[this.people.length-1].id + 1;
  }

  public getToken(): number {
    return this.people[this.people.length-1].token + 1;
  }

  public getGuestByPhoneNumber(pn: string): Person{
    let item: Person;
    item = this.people.find(
      (guest) => {
        return guest.phone===pn
      }
    );
    return item
  }
}
