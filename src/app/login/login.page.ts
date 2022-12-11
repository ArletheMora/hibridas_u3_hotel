import { Person } from './../models/person';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RoomService } from './../services/room.service';
import { ToastController } from '@ionic/angular';
import { Router } from '@angular/router';
import { PersonService } from './../services/person.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  public myForm: FormGroup;
  public validationMessage: Object;
  public persons: Person[];

  constructor(
    private personService: PersonService,
    private r: Router,
    private tC: ToastController, 
    private rS: RoomService,
    private fB: FormBuilder
  ) { }
 
  ngOnInit() {

    this.personService.getPersons().subscribe( res => {
      this.persons = res;
    });

    this.myForm = this.fB.group({
      phone: [
        '',
        Validators.compose([
          Validators.required,
          Validators.minLength(10),
          Validators.maxLength(10),
          Validators.pattern('^[0-9]+$')
        ])
      ],
      token: [
        '',
        Validators.compose([
          Validators.required,
          Validators.minLength(5),
          Validators.maxLength(5),
          Validators.pattern('^[0-9]+$')
        ])
      ],
    })
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
      token: [
        {
          type: 'required',
          message: 'El token obligatorio'
        },
        {
          type: 'minlength',
          message: 'El token debe ser de 5 dígitos'
        },
        {
          type: 'maxlength',
          message: 'El token debe ser de 5 dígitos'
        },
        {
          type: 'pattern',
          message: 'El token esta mal formado'
        }
      ]
    }
  }

  async login() {
    if (this.myForm.get('phone').value === "3112264704" && this.myForm.get('token').value === "99999") {
      this.r.navigate(
        ['/guest-list']
      )
      this.myForm.reset();
    }
    if (this.myForm.valid) {
      if (this.reservaValida()) {
        this.r.navigate(['/tabs/tab2'], {
          queryParams: {
            phoneNumber: this.myForm.get('phone').value
          }
        })
        this.myForm.reset()
      } else {
        let toast = await this.tC.create({
          message: 'Credenciales no válidas',
          duration: 2000
        });
        toast.present();
      }
    } else {
      let toast = await this.tC.create({
        message: 'Llene los campos correctamente',
        duration: 2000
      });
      toast.present();
    }

  }

  reservaValida(): Boolean {
    let entro = false;
    for(var i = 0; i < this.persons.length; i++) {
      if (this.persons[i].phone.toString() === this.myForm.get('phone').value && this.persons[i].token.toString() === this.myForm.get('token').value) {
        entro = true;
      }
    }
    return entro;
  }

}
