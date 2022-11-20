import { Room } from './../models/room';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RoomService {

  private ocuppied: Room[];
  private free: Room[];

  constructor() {
    this.ocuppied = [{
      enterCode: "11111",
      roomCode: "A1",
      price: 2500
    }, {
      enterCode: "22222",
      roomCode: "A2",
      price: 2500
    }]
    this.free = [{
      enterCode: "33333",
      roomCode: "A3",
      price: 2500
    },
    {
      enterCode: "44444",
      roomCode: "A4",
      price: 2500
    },
    {
      enterCode: "55555",
      roomCode: "A5",
      price: 2500
    }]
  }

  public getOccupied(): Room[] {
    return this.ocuppied
  }

  public getFree(): Room[] {
    return this.free
  }

  public setOcuppied(r: Room) {
    this.free.splice(this.getIndexFreeRoomByCode(r.roomCode), 1)
    this.ocuppied.push(r);
  }

  public setFree(r: Room) {
    this.ocuppied.splice(this.getIndexOccupiedRoomByCode(r.roomCode), 1)
    this.free.push(r);
  }

  public getIndexOccupiedRoomByCode(code: string): number {
    let index = this.ocuppied.findIndex(
      (room) => {
        return room.roomCode===code;
      }
    );
    return index
  }

  public getIndexFreeRoomByCode(code: string): number {
    let index = this.free.findIndex(
      (room) => {
        return room.roomCode===code;
      }
    );
    return index;
  }

  public getOccupiedRoomByCode(code: string): Room{
    let item = this.ocuppied.find(
      (room) => {
        return room.roomCode===code;
      }
    );
    return item;
  }

  public getFreeRoomByCode(code: string): Room{
    let item = this.free.find(
      (room) => {
        return room.roomCode===code;
      }
    );
    return item;
  }
}
