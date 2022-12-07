import { Person } from './../models/person';
import { Injectable } from '@angular/core';
import { map } from "rxjs/operators";
import { AngularFirestore } from "@angular/fire/compat/firestore";
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PersonService {
  private people: Person[];
  private person: Person;

  constructor(private firestore: AngularFirestore) {
  }

  public addPerson(persona: Person) {
    this.firestore.collection('person').add(persona);
  }

  public getPersons(): Observable<Person[]> {
    return this.firestore.collection('person').snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data() as Person;
          const id = a.payload.doc.id;
          return {id, ...data };
        });
      })
    );
  }

  public removePerson(id: string) {
    this.firestore.collection('person').doc(id).delete();
  }

  public getToken(): number {
    this.getPersons().subscribe(res => {
      this.people = res;
    });

    if (this.people.length > 0) {
      return this.people[this.people.length-1].token + 1;
    }else{
      return 10000;
    }
  }

  public getGuestByPhoneNumber(id: string){
    let item = this.firestore.collection('person').doc(id).valueChanges();
    return item;
  }

  public getPersonById(id: string) {
    let item = this.firestore.collection('person').doc(id).valueChanges();
    return item;
  }
}

