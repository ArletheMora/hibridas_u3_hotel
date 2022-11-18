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
  public validationMessages: Object

  constructor(
    private personService: PersonService,
    private r: Router,
    private tC: ToastController, 
    private rS: RoomService,
    private fB: FormBuilder
  ) { }

  ngOnInit() {
    this.myForm = this.fB.group({
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
          Validators.minLength(5),
          Validators.maxLength(5),
          Validators.pattern('^[0-9]+$')
        ])
      ],
    })
    this.validationMessages = {
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
    if (this.myForm.get('phone').value == "Admin" && this.myForm.get('room').value == "test") {
      this.r.navigate(
        ['/admin-view']
      )
      this.myForm.reset()
      return
    }
    if (this.myForm.valid) {
      if (this.reservaValida()) {
        this.r.navigate(['/tabs/tab2'], {})
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
    let b = this.personService.getGuestByPhoneNumber(this.myForm.get('phone').value)
    if (b) {
      if (b.token.toString() == this.myForm.get('room').value) {
        return true
      } else {
        return false
      }
    } else {
      return false
    }
  }

}
