import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { FirebaseService } from '../services/firebase.service';

@Component({
  selector: 'app-expense',
  templateUrl: './expense.page.html',
  styleUrls: ['./expense.page.scss'],
})
export class ExpensePage implements OnInit {

  addExpenseForm: FormGroup;

  constructor(private modalCtrl: ModalController, private fb: FormBuilder, private firebaseService: FirebaseService) {
    this.createExpenseForm();
  }

  ngOnInit() {
  }

  createExpenseForm = () => {
    this.addExpenseForm = this.fb.group({
      amount: ['', Validators.required],
      reason: ['', Validators.required]
    });
  }

  closeExpenseModal = () => {
    this.modalCtrl.dismiss();
  }

  onSubmit = async () => {
    const expenseObj = this.addExpenseForm.value;
    this.firebaseService.addExpense(expenseObj.amount, expenseObj.reason)
    .then((res) => {
      console.log('res at add expense', res);
    });
    this.modalCtrl.dismiss(expenseObj);
  }

}
