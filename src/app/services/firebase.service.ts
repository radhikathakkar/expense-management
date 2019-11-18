import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { DataFormat } from '../shared/DataFormat';
import { firestore } from 'firebase';


@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  
  constructor(private fireStore: AngularFirestore) { }

  addItem = (amount, reason) => {
    const id = this.fireStore.createId();

    return this.fireStore.doc(`songList/${id}`).set({
      id,
      amount,
      reason,
    });
  }
}
