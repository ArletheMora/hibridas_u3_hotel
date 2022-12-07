import { ActivatedRoute, Router } from '@angular/router';
import { PersonService } from './../services/person.service';
import { Person } from './../models/person';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-guest',
  templateUrl: './guest.page.html',
  styleUrls: ['./guest.page.scss'],
})
export class GuestPage implements OnInit {

  guest: Person;

  constructor(private personService: PersonService, private router: Router, private activatedRoute: ActivatedRoute) {
    this.guest = {
      name: "",
      phone: "",
      fechaInicio: "",
      fechaFin: "",
      habitacion: "",
      token: 0,
      pay: 0
    }
  }

  ngOnInit() {
    this.activatedRoute.queryParams.subscribe((params) => {
      this.personService.getPersonById(params.id).subscribe(res => {
        this.guest = res as Person;
        console.log(this.guest);
      });
    })
  }

  public formatDate(fecha){
    let fechas = fecha.split('T');
    return fechas[0];
  }
}
