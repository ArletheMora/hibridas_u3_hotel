import { map } from 'rxjs/operators';
import { Picture } from './../models/picture';
import { Observable } from 'rxjs';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PictureService {

  constructor(private firestore: AngularFirestore) { }

  public getPictures(): Observable<Picture[]>{
    return this.firestore.collection('pictures').snapshotChanges().pipe(
      map(actions=>{
        return actions.map(a => {
          const data = a.payload.doc.data() as Picture;
          const id = a.payload.doc.id;
          return {id, ...data};
        })
      })
    )
  }

  public savePicture(picture: Picture) {
    this.firestore.collection('pictures').add(picture);
  }
}
