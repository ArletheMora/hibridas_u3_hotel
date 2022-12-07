import { Component, OnInit } from '@angular/core';
import { RoomService } from './../services/room.service';
import { PersonService } from './../services/person.service';
import { Room } from './../models/room';
import { Person } from './../models/person';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit {
  
  public seleccion: string;
  public person: Person;
  public room: Room;
  public montoRestante: number;

  constructor(
    private PersonService: PersonService,
    private roomService: RoomService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(){
    this.activatedRoute.queryParams.subscribe( (params) => {
      
      this.PersonService.getGuestByPhoneNumber(params.phoneNumber).subscribe(res => {
        this.person = res as Person;
        console.log(this.person);
      });
    })
  }

  obtenerValor(e){
    this.seleccion=e.detail.value;
    this.getRoom();
  }

  getRoom(){
    this.room = this.roomService.getOccupiedRoomByCode(this.person.habitacion);
    this.getMontoRestante();
  }

  getMontoRestante(){
    this.montoRestante = this.room.price - this.person.pay;
  }

  tokenAvailable(): boolean{
    let fechaActual = new Date();
    let fechaIngreso = new Date(this.person.fechaInicio);
    let fechaSalida = new Date(this.person.fechaFin);
    let valido = fechaActual >= fechaIngreso && fechaActual <= fechaSalida ? true : false;
    console.log(valido);
    
    return valido;
  }

}
