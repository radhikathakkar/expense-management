import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage';
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
  constructor(private navParams: NavParams, private modalCtrl: ModalController, private firebaseService: FirebaseService) {
    this.allExpenses = this.navParams.get('expense');
  }
  ngOnInit() {
    this.getItems();
  }

  getItems() {
    const incomeList = this.firebaseService.getExpense().subscribe(res => {
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
  removeExpense = (item: any) => {
    const index = this.allExpenses.indexOf(item);
    this.allExpenses.splice(index, 1);
    this.modalCtrl.dismiss(item);
  }
}
