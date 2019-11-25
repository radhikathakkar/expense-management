import { Component, OnInit } from '@angular/core';
import { ModalController, ToastController, ActionSheetController, NavController } from '@ionic/angular';
import { ExpensePage } from '../expense/expense.page';
import { IncomePage } from '../income/income.page';
import { DataFormat } from '../shared/DataFormat';
import { Router, NavigationExtras, ActivatedRoute } from '@angular/router';
import { Storage } from '@ionic/storage';
import { ExpenseListPage } from '../expense-list/expense-list.page';
import { IncomeListPage } from '../income-list/income-list.page';
import { FirebaseService } from '../services/firebase.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  totalAmount: number;
  expenseAmount: number;
  expenseData: DataFormat;
  expenseArr: any = [];
  incomeArr: any = [];
  incomeData: DataFormat;
  incomeAmount: number;
  loading = true;
  amountId: string;
  userid: string;
  constructor(private modalCtrl: ModalController, private actionSheetCtrl: ActionSheetController, private route: ActivatedRoute,
              private router: Router, private firebaseService: FirebaseService, private storage: Storage) {
  }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.userid = params['userId'];
      this.totalAmount = parseFloat(params['totalAmount']);
    });
  }
  getData = (value) => {
    this.userid = value;
    console.log('userid at home page', this.userid);
  }
  getDataById = () => {
    this.firebaseService.getTotalById()
    .subscribe((res) => {
      console.log('res by id = ', res);
    });
  }

  openExpenseModal = async () => {
    const modal = this.modalCtrl.create({
      component: ExpensePage,
      componentProps: { value: this.expenseData, userId: this.userid }
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
    this.firebaseService.setAmountData(this.userid, this.totalAmount);
  }

  openIncomeModal = async () => {
    const modal = this.modalCtrl.create({
      component: IncomePage,
      componentProps: { value: this.incomeData, amountId: this.amountId }
    });
    (await modal).onDidDismiss().then((income: any) => this.handleIncomeModalDismiss(income.data));
    (await modal).present();
  }

  handleIncomeModalDismiss = (incomeData: any) => {
    this.incomeArr.push(incomeData);
    this.storage.set('income', this.incomeArr);
    this.incomeAmount = incomeData.amount;
    this.totalAmount = this.totalAmount + this.incomeAmount;
    this.firebaseService.setAmountData(this.userid, this.totalAmount);
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
    console.log('expenseData = ', data);
    if (!data) {
      return false;
    } else {
      this.totalAmount += data.amount;
      this.firebaseService.setAmountData(this.userid, this.totalAmount);
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
