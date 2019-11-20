import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
// import * as firebase from 'firebase';
// const db = firebase.firestore();
@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  constructor(private fireStore: AngularFirestore) { }

  addIncome = (amount, reason) => {
    const incomeId = this.fireStore.createId();

    return this.fireStore.doc(`income/${incomeId}`).set({
      incomeId,
      amount,
      reason,
    });
  }

  getIcome = () => {
    return this.fireStore.collection<any>( 'income' ).valueChanges();
  }

  addExpense = (amount, reason) => {
    const expenseId = this.fireStore.createId();

    return this.fireStore.doc(`expense/${expenseId}`).set({
      expenseId,
      amount,
      reason,
    });
  }

  getExpense = () => {
    return this.fireStore.collection<any>( 'expense' ).valueChanges();
  }

  totalAmountData = () => {
    return this.fireStore.collection<any>('amount').valueChanges();
  }
  addTotalAmount = (totalAmount) => {
    return this.fireStore.doc(`amount`).set({
      totalAmount
    });
  }
}
