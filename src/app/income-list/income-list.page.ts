import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Storage } from '@ionic/storage';
import { NavParams, ModalController } from '@ionic/angular';
import { FirebaseService } from '../services/firebase.service';
import { AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-income-list',
  templateUrl: './income-list.page.html',
  styleUrls: ['./income-list.page.scss'],
})
export class IncomeListPage implements OnInit {
  allIncome: any;
  id: string;
  loading = true;
  constructor(private navParams: NavParams, private modalCtrl: ModalController, private firebaseService: FirebaseService,
              private fireStore: AngularFirestore) {
    this.allIncome = this.navParams.get('income');
  }

  ngOnInit() {
    this.getItems();
  }

  getItems() {
    const incomeList = this.firebaseService.getIcome().subscribe(res => {
     if (res) {
      this.loading = false;
      this.allIncome = res;
     } else {
      this.loading = true;
     }
    });
  }
  backToMenu = () => {
    this.modalCtrl.dismiss();
  }
}
