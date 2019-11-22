import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-total',
  templateUrl: './total.page.html',
  styleUrls: ['./total.page.scss'],
})
export class TotalPage implements OnInit {

  addTotalAmountForm: FormGroup;
  userId: string;
  constructor(private fb: FormBuilder, private router: Router, private modalCtrl: ModalController) {
    this.addTotal();
  }

  ngOnInit() {
    console.log('modal opens == ');
    console.log('userId = ', this.userId);
  }

  addTotal = () => {
    this.addTotalAmountForm = this.fb.group({
      totalAmount: ['', Validators.required]
    });
  }

  onSubmit = () => {
    console.log(this.addTotalAmountForm.value);
    this.modalCtrl.dismiss();
    this.router.navigate(['home']);
  }

  skip = () => {
    this.modalCtrl.dismiss();
    this.router.navigate(['home']);
  }
}
