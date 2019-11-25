import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AngularFirestore } from '@angular/fire/firestore';
import * as firebase from 'firebase';
import { firebaseConfig } from '../firebase';
import { FirebaseService } from '../services/firebase.service';
import { async } from 'q';
firebase.initializeApp(firebaseConfig);
const database = firebase.database();

@Component({
  selector: 'app-income',
  templateUrl: './income.page.html',
  styleUrls: ['./income.page.scss'],
})
export class IncomePage implements OnInit {

  addIncomeForm: FormGroup;
  amountId: string;
  userId: string;
  constructor(private modalCtrl: ModalController, private fb: FormBuilder, private firebaseService: FirebaseService) {
    this.createIncomeForm();
  }

  ngOnInit() {
    this.userId = localStorage.getItem('userId');
  }

  createIncomeForm = () => {
    this.addIncomeForm = this.fb.group({
      amount: ['', Validators.required],
      reason: ['', Validators.required]
    });
  }

  closeIncomeModal = () => {
    this.modalCtrl.dismiss();
  }

  onSubmit = async () => {
    const incomeObj = this.addIncomeForm.value;
    this.firebaseService.addIncome(this.userId, incomeObj.amount, incomeObj.reason)
    .then((res) => {
      console.log('res at add income', res);
    });
    this.modalCtrl.dismiss(incomeObj);
  }

}
