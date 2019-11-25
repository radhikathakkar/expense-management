import { Component, OnInit } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';
import { FirebaseService } from '../services/firebase.service';
import { ToastService } from '../toast.service';
@Component({
  selector: 'app-expense-list',
  templateUrl: './expense-list.page.html',
  styleUrls: ['./expense-list.page.scss'],
})
export class ExpenseListPage implements OnInit {

  allExpenses: any = [];
  loading = true;
  userId: string;
  constructor(private navParams: NavParams, private modalCtrl: ModalController, private firebaseService: FirebaseService,
              private toastService: ToastService) {
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
    const res = this.firebaseService.removeExpense(this.userId, expense.expenseId);
    if (res) {
      const index = this.allExpenses.indexOf(expense);
      this.allExpenses.splice(index, 1);
    } else {
      console.log('array is not updated .. ');
    }
    this.toastService.setToast('Amount Added To account .... ');
    this.modalCtrl.dismiss(expense);
  }

  getList = (data) => {
    this.allExpenses = data;
  }
}
