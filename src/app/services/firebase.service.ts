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
    return this.fireStore.collection<any>( 'users' ).valueChanges();
  }
  addIncome = (userId, amount, reason) => {
    const incomeId = this.fireStore.createId();
    const data = this.fireStore.collection('amount').doc(userId).collection('income').doc(incomeId)
    .set({
      incomeId,
      amount,
      reason
    });
    return data;
  }
  getIncome = (userId) => {
    return this.fireStore.collection('amount').doc(userId).collection('income').valueChanges();
  }
  addExpense = (userId, amount, reason) => {
    const expenseId = this.fireStore.createId();
    const data = this.fireStore.collection('amount').doc(userId).collection('expense').doc(expenseId)
    .set({
      expenseId,
      amount,
      reason
    });
    return data;
  }
  removeExpense = (userId, expenseId) => {
    const data = this.fireStore.collection('amount').doc(userId).collection('expense').doc(expenseId).delete();
    return data;
  }
  getExpense = (userId) => {
    return this.fireStore.collection('amount').doc(userId).collection('expense').valueChanges();
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
  setAmountData = (userId: string, totalAmount: number) => {
    const data = this.fireStore.collection('amount').doc(userId);
    return data.set({
      totalAmount
    });
  }

  getAmountData = (userId: string) => {
    return this.fireStore.collection('amount').doc(userId).valueChanges();
  }
}
