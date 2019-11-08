import { Component } from '@angular/core';
import { ModalController, ToastController, ActionSheetController, NavController } from '@ionic/angular';
import { ExpensePage } from '../expense/expense.page';
import { IncomePage } from '../income/income.page';
import { AmountFormat } from '../shared/amount';
import { Router, NavigationExtras } from '@angular/router';
import { Storage } from '@ionic/storage';
import { ExpenseListPage } from '../expense-list/expense-list.page';
import { IncomeListPage } from '../income-list/income-list.page';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  totalAmount = 10000;
  expenseAmount: number;
  expenseData: AmountFormat;
  expenseArr: any = [];
  incomeArr: any = [];
  incomeData: AmountFormat;
  incomeAmount: number;
  constructor(private modalCtrl: ModalController, private toastCtrl: ToastController, private actionSheetCtrl: ActionSheetController,
              private router: Router, private navCtrl: NavController, private storage: Storage) { }

  openExpenseModal = async () => {
    const modal = this.modalCtrl.create({
      component: ExpensePage,
      componentProps: { value: this.expenseData }
    });
    (await modal).onDidDismiss().then((expense: any) => {
      this.handleExpenseModalDismiss(expense.data);
    });
    (await modal).present();
  }

  handleExpenseModalDismiss = (expenseData: any) => {
    this.expenseData = expenseData;
    this.expenseArr.push(expenseData);
    this.storage.set('expense', this.expenseArr);
    this.expenseAmount = expenseData.amount;
    this.totalAmount = this.totalAmount - this.expenseAmount;
  }

  openIncomeModal = async () => {
    const modal = this.modalCtrl.create({
      component: IncomePage,
      componentProps: { value: this.incomeData }
    });
    (await modal).onDidDismiss().then((income: any) => this.handleIncomeModalDismiss(income.data));
    (await modal).present();
  }

  handleIncomeModalDismiss = (incomeData: any) => {
    this.incomeArr.push(incomeData);
    this.storage.set('income', this.incomeArr);
    this.incomeAmount = incomeData.amount;
    this.totalAmount = this.totalAmount + this.incomeAmount;
  }

  openActionSheetData = async () => {
    const actionSheet = this.actionSheetCtrl.create({
      header: '',
      cssClass: 'myPage',
      buttons: [
        {
          text: 'Add Expense',
          icon: 'add-circle-outline',
          cssClass: 'myActionSheetBtnStyle',
          handler: () => {
            this.openExpenseModal();
          }
        },
        {
          text: 'Add Income',
          icon: 'add-circle-outline',
          handler: () => {
            this.openIncomeModal();
          }
        },
        {
          text: 'Cancel',
          icon: 'close',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        }
      ]
    });
    (await actionSheet).present();
  }

  viewExpenses = async () => {
    const modal = this.modalCtrl.create({
      component: ExpenseListPage,
      componentProps: { expense: this.expenseArr }
    });
    (await modal).onDidDismiss().then((expense: any) => {
      this.handleExpenseListModalDismiss(expense.data);
    });
    (await modal).present();
  }
  handleExpenseListModalDismiss = (data) => {
    if (!data) {
      return false;
    } else {
      this.totalAmount += data.amount;
    }
  }

  viewIncome = async () => {
    const modal = this.modalCtrl.create({
      component: IncomeListPage,
      componentProps: { income: this.incomeArr }
    });
    (await modal).onDidDismiss().then((income: any) => {
      this.handleIncomeListModalDismiss(income.data);
    });
    (await modal).present();
  }

  handleIncomeListModalDismiss = (data) => {
  }

  logout = () => {
    this.router.navigate(['/']);
  }
}
