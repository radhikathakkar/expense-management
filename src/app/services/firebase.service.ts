import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { User } from '../shared/user';
import { AngularFireAuth } from '@angular/fire/auth';
import { Amount } from '../shared/amount';
import { firestore } from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  constructor(private fireStore: AngularFirestore, private fAuth: AngularFireAuth) { }

  addUser = (user: User) => {
    const id = this.fireStore.createId();
    return this.fireStore.doc(`users/${id}`).set({
      id,
      user
    });
  }
  userLogin = () => {
    // return this.fAuth.auth.signInWithEmailAndPassword(username, password).then(res => res);
    return this.fireStore.collection<any>( 'users' ).valueChanges();
  }
  addIncome = (amountId, income) => {
    console.log('amount id at add income service = ', amountId);
    return this.fireStore.collection<any>('amount').doc(`Wg5PBAjJ8Zx5JFlkhaku/income`).set({
      income
    });
    //  this.fireStore.doc(`amount/${amountId}/income`).set({
    //   income
    // });
  }
  getIcome = () => {
    return this.fireStore.collection<any>('amount').valueChanges();
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
      totalAmount,
    });
  }
  getTotal = () => {
    return this.fireStore.collection<any>('amount').valueChanges();
  }
  getTotalById = () => {
    return this.fireStore.collection<any>('amount').snapshotChanges();
  }
  setTotal = (data: Amount) => {
    const totalId = this.fireStore.createId();
    return this.fireStore.doc(`total/${totalId}`).set({
      data
    });
  }

  loginCredential = () => {
    return this.fireStore.collection<any>('users').valueChanges();
  }
}
