import { RoomService } from './../services/room.service';
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
    this.personas = this.personService.getGuests();
  }
  

  ngOnInit() {
  }

  public removePerson(id: number) {
    console.log(id);
    
    let huesped = this.personas[id-1].habitacion;
    this.roomService.setFree(this.roomService.getOccupiedRoomByCode(huesped));
    this.personas = this.personService.removePerson(id);
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
            this.removePerson(id);
            this.personas = this.personService.getGuests();
          },
        },
      ],
    });

    await alert.present();
  }

  public refresh(){
    this.personas = this.personService.getGuests();
  }
}
