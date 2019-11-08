import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage';
@Component({
  selector: 'app-expense-list',
  templateUrl: './expense-list.page.html',
  styleUrls: ['./expense-list.page.scss'],
})
export class ExpenseListPage implements OnInit {

  allExpenses: any;
  constructor(private router: Router, private storage: Storage) {
   console.log('constructor calling ... . ');
   this.storage.get('expense').then((data) => {
    this.allExpenses = data;
    console.log('allExpenses at sub class thennn=', this.allExpenses);
   });
  }
  ngOnInit() {
  }

  backToMenu = () => {
    this.router.navigate(['/home']);
  }
}
