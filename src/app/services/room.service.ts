import { Room } from './../models/room';
import { Injectable } from '@angular/core';
import { map } from "rxjs/operators";
import { AngularFirestore } from "@angular/fire/compat/firestore";
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RoomService {

  private ocuppied: Room[];
  private free: Room[];

  constructor(private firestore: AngularFirestore) {
    
  }

  public getOccupied(): Observable<Room[]> {
    return this.firestore.collection('rooms').snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data() as Room;
          const id = a.payload.doc.id;
          return {id, ...data };
        }).filter(room => room.occupied == true);
      })
    )
  }

  public getFree(): Observable<Room[]> {
    return this.firestore.collection('rooms').snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data() as Room;
          const id = a.payload.doc.id;
          return {id, ...data };
        }).filter(room => room.occupied == false);
      })
    )
  }

  public setOcuppied(id: string) {
    this.firestore.collection('rooms').doc(id).update({
      occupied: true
    })
  }

  public setFree(id: string) {
    this.firestore.collection('rooms').doc(id).update({
      occupied: false
    })
  }

  public getOccupiedRoomByCode(code: string): Room{
    let item = this.ocuppied.find(
      (room) => {
        return room.roomCode===code;
      }
    );
    return item;
  }

  public getFreeRoomByCode(code: string){
    let item = this.firestore.collection('rooms').doc(code).valueChanges();
    return item;
  }
}
