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

  constructor(private modalCtrl: ModalController, private fb: FormBuilder, private firebaseService: FirebaseService) {
    this.createIncomeForm();
  }

  ngOnInit() {
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
    console.log('this.addIncomeForm.value = ', this.addIncomeForm.value);
    const incomeObj = this.addIncomeForm.value;
    this.firebaseService.addIncome(incomeObj.amount, incomeObj.reason)
    .then((res) => {
      console.log('res at add income', res);
    });
    this.modalCtrl.dismiss(incomeObj);
  }

}
