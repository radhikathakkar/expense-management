import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, NavigationExtras } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { FirebaseService } from '../services/firebase.service';

@Component({
  selector: 'app-total',
  templateUrl: './total.page.html',
  styleUrls: ['./total.page.scss'],
})
export class TotalPage implements OnInit {

  addTotalAmountForm: FormGroup;
  userId: string;
  totalAmount: number;
  constructor(private fb: FormBuilder, private router: Router, private modalCtrl: ModalController,
              private firebaseServive: FirebaseService) {
    this.addTotal();
  }

  ngOnInit() {
    // console.log('modal opens == ');
    // console.log('userId = ', this.userId);
  }

  addTotal = () => {
    this.addTotalAmountForm = this.fb.group({
      totalAmount: ['', Validators.required]
    });
  }

  onSubmit = () => {
    this.totalAmount = this.addTotalAmountForm.value.totalAmount;
    const navigationExtras: NavigationExtras = {
      queryParams: {
          userId: this.userId,
          totalAmount: this.totalAmount
      }
    };
    this.modalCtrl.dismiss();
    this.router.navigate(['home'], navigationExtras);
  }

  skip = () => {
    this.firebaseServive.getAmountData(this.userId)
    .subscribe(res => {
      if (res) {
        this.totalAmount = res.totalAmount;
        const navigationExtras: NavigationExtras = {
          queryParams: {
              userId: this.userId,
              totalAmount: this.totalAmount
          }
        };
        this.router.navigate(['home'], navigationExtras );
      }
    });
    console.log('', this.totalAmount);
    this.modalCtrl.dismiss();
  }
}
