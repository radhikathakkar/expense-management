import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage';
import { ModalController, NavParams } from '@ionic/angular';
@Component({
  selector: 'app-expense-list',
  templateUrl: './expense-list.page.html',
  styleUrls: ['./expense-list.page.scss'],
})
export class ExpenseListPage implements OnInit {

  allExpenses: any = [];
  constructor(private navParams: NavParams, private modalCtrl: ModalController) {
    this.allExpenses = this.navParams.get('expense');
  }
  ngOnInit() {
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
