import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-expense',
  templateUrl: './expense.page.html',
  styleUrls: ['./expense.page.scss'],
})
export class ExpensePage implements OnInit {

  addExpenseForm: FormGroup;

  constructor(private modalCtrl: ModalController, private fb: FormBuilder) {
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

  onSubmit = () => {
    // console.log(this.addExpenseForm.value.amount);
    this.modalCtrl.dismiss(this.addExpenseForm.value);
  }

}
