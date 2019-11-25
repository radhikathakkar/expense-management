import { Component, OnInit } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';
import { FirebaseService } from '../services/firebase.service';
@Component({
  selector: 'app-expense-list',
  templateUrl: './expense-list.page.html',
  styleUrls: ['./expense-list.page.scss'],
})
export class ExpenseListPage implements OnInit {

  allExpenses: any = [];
  loading = true;
  userId: string;
  constructor(private navParams: NavParams, private modalCtrl: ModalController, private firebaseService: FirebaseService) {
    this.allExpenses = this.navParams.get('expense');
  }
  ngOnInit() {
    this.userId = localStorage.getItem('userId');
    this.getItems();
  }

  getItems() {
    const expenseList = this.firebaseService.getExpense(this.userId).subscribe(res => {
     if (res) {
      this.loading = false;
      this.allExpenses = res;
     } else {
      this.loading = true;
     }
    });
  }
  backToMenu = () => {
    this.modalCtrl.dismiss();
  }
  removeExpense = (expense: any) => {
    console.log('demo', expense.expenseId);
    this.firebaseService.removeExpense(this.userId, expense.expenseId)
    .then(res => {
      // console.log('res at remove expense = ', res);
      const index = this.allExpenses.indexOf(expense);
      this.allExpenses.splice(index, 1);
      res = this.allExpenses;
      this.getList(res);
      // console.log('this.allExpenses = ', this.allExpenses);
      // console.log('res at updated expense =', res);
    });
    // const index = this.allExpenses.indexOf(item);
    // this.allExpenses.splice(index, 1);
    this.modalCtrl.dismiss(expense);
  }

  getList = (data) => {
    this.allExpenses = data;
  }
}
