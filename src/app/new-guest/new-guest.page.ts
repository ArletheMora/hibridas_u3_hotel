import { PersonService } from '../services/person.service';
import { Person } from './../models/person';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-new-guest',
  templateUrl: './new-guest.page.html',
  styleUrls: ['./new-guest.page.scss'],
})
export class NewGuestPage implements OnInit {

  public person: Person;

  constructor(
    private personService: PersonService
  ) {
    this.person = {
      id: 0,
      name: '',
      phone: '',
      fechaInicio: '',
      fechaFin: '',
      habitación: '',
      tipo: ''
    }
  }

  ngOnInit() {
  }

  public addPerson() {
    if (this.person.name !== '' && this.person.phone !== '' && this.person.fechaInicio !== null && this.person.fechaFin !== null && this.person.habitación !== '') {
      this.personService.addPerson(this.person);
      this.person = {
        id: 0,
        name: '',
        phone: '',
        fechaInicio: '',
        fechaFin: '',
        habitación: '',
        tipo: ''
      }
    }
  }

}
