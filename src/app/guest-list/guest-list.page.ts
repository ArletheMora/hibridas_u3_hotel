import { Router } from '@angular/router';
import { PersonService } from './../services/person.service';
import { Person } from './../models/person';
import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-guest-list',
  templateUrl: './guest-list.page.html',
  styleUrls: ['./guest-list.page.scss'],
})
export class GuestListPage implements OnInit {
  public personas!: Person[];
  public huesped;

  public huespedes: Person[] = [];
  public url : String = "https://api.whatsapp.com/send?phone=+521"
  public msj1 = "&text= Gracias por hospedarte con nosotros, para entrar a ver información del hotel tu usuario es ";
  public msj2 = "y tu token es: "
  //https://api.whatsapp.com/send?phone=+5213112264704&text=prueba

  constructor(
    private alertController: AlertController,
    private personService: PersonService,
    private router: Router
  ) {
    this.huespedes = [];

  }
  

  ngOnInit() {
    this.getGuests(); 
  }

  getGuests() {
    this.personas = this.personService.getPersons();
    console.log('refrescar', this.personas);
    
    for (let i = 0; i < this.personas.length; i++) {
      console.log(this.personas[i].tipo);
      if (this.personas[i].tipo === 'guest') {
        this.huespedes.push(this.personas[i]);
        console.log('se agregó' + this.personas[i].name);
      }
    }
  }

  public removePerson(id: number) {
    this.huespedes = this.personService.removePerson(id);
    this.personas = this.personService.getPersons();
    console.log(id);
  }

  public getGuest(phone : string){
    this.router.navigate(['/guest'], {queryParams:{phone:phone}});
  }

  async presentAlert(id: number) {
    const alert = await this.alertController.create({
      header: '¿Seguro que deseas eliminar?',
      cssClass: 'custom-alert',
      buttons: [
        {
          text: 'No',
          cssClass: 'alert-button-cancel',
        },
        {
          text: 'Sí',
          cssClass: 'alert-button-confirm',
          handler: () => {
            console.log(id);
            this.removePerson(id);
            this.personas = this.personService.getPersons();
          },
        },
      ],
    });

    await alert.present();
  }
}
