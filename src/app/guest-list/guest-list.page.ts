import { RoomService } from './../services/room.service';
import { Router } from '@angular/router';
import { PersonService } from './../services/person.service';
import { Person } from './../models/person';
import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { Room } from '../models/room';

@Component({
  selector: 'app-guest-list',
  templateUrl: './guest-list.page.html',
  styleUrls: ['./guest-list.page.scss'],
})
export class GuestListPage implements OnInit {
  public persona: Person;
  public personas: Person[];
  
  public url : String = "https://api.whatsapp.com/send?phone=+521"
  public msj1 = "&text= Gracias por hospedarte con nosotros, para entrar a ver información del hotel tu usuario es ";
  public msj2 = " y tu token es: "
  //https://api.whatsapp.com/send?phone=+5213112264704&text=prueba

  constructor(
    private alertController: AlertController,
    private personService: PersonService,
    private roomService: RoomService,
    private router: Router
  ) {
  }
  
  ngOnInit() {
    this.personService.getPersons().subscribe( res => {
      this.personas = res;
      console.log(this.personas[0].fechaInicio);   
    })
  }

  public formatDate(fecha){
    let fechas = fecha.split('T');
    return fechas[0];
  }

  public removePerson(id: string) {
    this.personService.getPersonById(id).subscribe(res => {
      this.persona = res as Person;
      
      let r: Room[];
      
      this.roomService.getRoomByCode(this.persona.habitacion).subscribe( res => {
        r = res;
        this.roomService.setFree(r[0].id);
      });
    })    
    this.personService.removePerson(id);
  }

  public getGuest(id : string){
    this.router.navigate(['/guest'], {queryParams:{id:id}});
  }

  async presentAlert(id: string) {
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
            this.removePerson(id);
          },
        },
      ],
    });

    await alert.present();
  }

  public refresh(){
    this.personService.getPersons().subscribe( res => {
      this.personas = res;
    })
  }
}
