import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { FirebaseService } from '../services/firebase.service';
import { CATEGORY } from '../shared/category';


@Component({
  selector: 'app-expense',
  templateUrl: './expense.page.html',
  styleUrls: ['./expense.page.scss'],
})
export class ExpensePage implements OnInit {

  addExpenseForm: FormGroup;
  userId: string;
  Categories: any = CATEGORY;
  constructor(private modalCtrl: ModalController, private fb: FormBuilder, private firebaseService: FirebaseService) {
    this.createExpenseForm();
  }

  ngOnInit() {
    this.userId = localStorage.getItem('userId');
  }

  createExpenseForm = () => {
    this.addExpenseForm = this.fb.group({
      amount: ['', Validators.required],
      reason: ['', Validators.required],
      date: new Date().toISOString()
    });
  }

  closeExpenseModal = () => {
    this.modalCtrl.dismiss();
  }

  onSubmit = async () => {
    const expenseObj = this.addExpenseForm.value;
    this.firebaseService.addExpense(this.userId, expenseObj.amount, expenseObj.reason, expenseObj.date)
    .then((res) => {
      console.log('res at add expense', res);
    });
    this.modalCtrl.dismiss(expenseObj);
  }

}
