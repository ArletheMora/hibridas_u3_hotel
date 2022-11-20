import { RoomService } from './../services/room.service';
import { Room } from './../models/room';
import { PersonService } from '../services/person.service';
import { Person } from './../models/person';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastController } from '@ionic/angular';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-new-guest',
  templateUrl: './new-guest.page.html',
  styleUrls: ['./new-guest.page.scss'],
})
export class NewGuestPage implements OnInit {

  public rooms: Room[];
  public person: Person;
  public myForm: FormGroup;
  public validationMessage: Object;

  constructor(
    private personService: PersonService,
    private fb: FormBuilder,
    private rS: RoomService,
    private tC: ToastController,
    private r: Router,

  ) { }

  ngOnInit() {

    this.rooms = this.rS.getFree();

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
        fechaInicio: [
          '',
          Validators.required
        ],
        fechaFin: [
          '',
          Validators.required
        ],
        room: [
          '',
          Validators.compose(
            [
              Validators.required,
              Validators.minLength(2),
              Validators.maxLength(2)
            ]
          )
        ],
        pay: [
          0,
          Validators.compose(
            [
              Validators.required,
              Validators.pattern('^[0-9]+$')
            ]
          )
        ]
      }
    );

    this.validationMessage = {
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
      fechaInicio: [
        {
          type: 'required',
          message: 'Fecha obligatoria'
        }
      ],
      fechaFin: [
        {
          type: 'required',
          message: 'Fecha obligatoria'
        }
      ],
      room: [
        { 
          type: 'required', 
          message: "Elige una habitación"
        },
        { 
          type: 'minLength',
          message: "Elige una habitación"
        },
        { 
          type: 'maxLength', 
          message: "Elige una habitación"
        }
      ],
      pay: [
        {
          type: 'required',
          message: 'El anticipo es obligatorio'
        },
        {
          type: 'pattern',
          message: 'El precio está mal formado'
        }
      ]
    }
  }

  public async addPerson() {
    if (this.myForm.valid) {
      let entrada = this.newDate(this.myForm.get('fechaInicio').value)
      let salida = this.newDate(this.myForm.get('fechaFin').value)
      if (entrada > salida) {
        let toast = await this.tC.create({
          message: 'La fecha de entrada debe ser menor a la de salida',
          duration: 2000
        });
        toast.present();
      } else {
        let g: Person = {
          id: this.personService.getID(),
          name: this.myForm.get('name').value,
          phone: this.myForm.get('phone').value,
          fechaInicio: this.newDate(this.myForm.get('fechaInicio').value),
          fechaFin: this.newDate(this.myForm.get('fechaFin').value),
          habitacion: this.myForm.get('room').value,
          tipo: 'guest',
          token: this.personService.getToken(),
          pay: this.myForm.get('pay').value
        }
        this.personService.addPerson(g)
        let r: Room = this.rS.getFreeRoomByCode(this.myForm.get('room').value)
        this.rS.setOcuppied(r)
        let toast = await this.tC.create({
          message: 'Reservación creada',
          duration: 2000
        });
        toast.present();
        this.myForm.reset();
        this.r.navigate(['/guest-list']);
      }
    }
  }

  public newDate(d: string): Date {
    return new Date(d)
  }
}