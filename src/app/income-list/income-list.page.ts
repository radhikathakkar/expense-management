import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-income-list',
  templateUrl: './income-list.page.html',
  styleUrls: ['./income-list.page.scss'],
})
export class IncomeListPage implements OnInit {
  allIncome: any;
  constructor(private router: Router, private storage: Storage) {
   console.log('constructor calling ... . ');
   this.storage.get('income').then((data) => {
    this.allIncome = data;
    console.log('allIncome at sub class thennn=', this.allIncome);
   });
  }

  ngOnInit() {
  }

  backToMenu = () => {
    this.router.navigate(['/home']);
  }
}
