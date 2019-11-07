import { Component } from '@angular/core';
import { ModalController, ToastController } from '@ionic/angular';
import { ExpensePage } from '../expense/expense.page';
import { IncomePage } from '../income/income.page';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  totalAmount = 10000;
  expenseAmount: number;
  expenseData: any;
  incomeAmount: number;
  incomeData: any;
  constructor(private modalCtrl: ModalController, private toastCtrl: ToastController) {}

  openExpenseModal = async () => {
    const modal = this.modalCtrl.create({
      component: ExpensePage,
      componentProps: {value: this.expenseData}
    });
    (await modal).onDidDismiss().then((expense: any) => this.handleExpenseModalDismiss(expense.data));
    (await modal).present();
  }

  handleExpenseModalDismiss = (expenseData: any) => {
    // console.log(expenseData);
    this.expenseAmount = expenseData.amount;
    this.totalAmount = this.totalAmount - this.expenseAmount;
  }

  openIncomeModal = async () => {
    const modal = this.modalCtrl.create({
      component: IncomePage,
      componentProps: {value: this.incomeData}
    });
    (await modal).onDidDismiss().then((income: any) => this.handleIncomeModalDismiss(income.data));
    (await modal).present();
  }

  handleIncomeModalDismiss = (incomeData: any) => {
    // console.log(incomeData);
    this.incomeAmount = incomeData.amount;
    this.totalAmount = this.totalAmount + this.incomeAmount;
  }
}
