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
        name: 'Polo',
        phone: '3112272687',
        fechaInicio: new Date(),
        fechaFin: new Date(),
        habitacion: 'A1',
        tipo: 'guest',
        token: 10000,
        pay: 1000
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
    return this.people;
  }

  public getID(): number {
    if(this.people.length > 0){
      return this.people[this.people.length-1].id + 1;
    }else{
      return 1;
    }
  }

  public getToken(): number {
    if (this.people.length > 0) {
      return this.people[this.people.length-1].token + 1;
    }else{
      return 10000;
    }
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

  public getGuests():Person[] {
    return this.people.filter((person) => person.tipo === 'guest');
  }

}

