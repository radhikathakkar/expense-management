import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Storage } from '@ionic/storage';
import { NavParams, ModalController } from '@ionic/angular';

@Component({
  selector: 'app-income-list',
  templateUrl: './income-list.page.html',
  styleUrls: ['./income-list.page.scss'],
})
export class IncomeListPage implements OnInit {
  allIncome: any;
  constructor(private navParams: NavParams, private modalCtrl: ModalController) {
    this.allIncome = this.navParams.get('income');
  }

  ngOnInit() {
  }

  backToMenu = () => {
    this.modalCtrl.dismiss();
  }
}
