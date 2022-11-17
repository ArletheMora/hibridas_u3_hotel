import { PersonService } from '../services/person.service';
import { Person } from './../models/person';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-new-guest',
  templateUrl: './new-guest.page.html',
  styleUrls: ['./new-guest.page.scss'],
})
export class NewGuestPage implements OnInit {

  public person!: Person;
  public myForm!: FormGroup;
  public validationMessage!: Object;

  constructor(
    private personService: PersonService,
    private fb:FormBuilder
  ) { }

  ngOnInit() {
    this.myForm = this.fb.group(
      {
        name: [
          '',
          Validators.compose([
            Validators.required,
            Validators.pattern('^[a-zÑñA-Z]+[a-zÑñA-Z ]*$')
          ])
        ],
        phone: [
          '', 
          Validators.compose([
            Validators.required, 
            Validators.minLength(10), 
            Validators.maxLength(10), 
            Validators.pattern('^[0-9]+$')
          ])
        ],
        fecha: [
          '',
          Validators.required
        ]
      }
    );

    this.validationMessage = {
      phone: [
        {
          type: 'required',
          message: 'Número de telefono obligatorio'
        },
        {
          type: 'minlength',
          message: 'El numero de telefono debe ser de 10 dígitos'
        },
        {
          type: 'maxlength',
          message: 'El numero de telefono debe ser de 10 dígitos'
        },
        {
          type: 'pattern',
          message: 'El numero de telefono esta mal formado'
        }
      ],
      name: [
        {
          type: 'required',
          message: 'Nombre oblogatorio'
        },
        {
          type: 'pattern',
          message: 'El nombre esta mal formado'
        }
      ],
      fecha: [
        {
          type: 'required',
          message: 'Curp obligatoria'
        }
      ]
    }
  }

  public addPerson() {
    this.personService.addPerson(this.person);
    /* this.person = {
      id: 0,
      name: '',
      phone: '',
      fechaInicio: '',
      fechaFin: '',
      habitación: '',
      tipo: ''
    } */
  }

}
