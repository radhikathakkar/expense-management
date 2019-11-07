import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-income',
  templateUrl: './income.page.html',
  styleUrls: ['./income.page.scss'],
})
export class IncomePage implements OnInit {

  addIncomeForm: FormGroup;

  constructor(private modalCtrl: ModalController, private fb: FormBuilder) {
    this.createIncomeForm();
   }

  ngOnInit() {
  }

  createIncomeForm = () => {
    this.addIncomeForm = this.fb.group({
      amount: ['', Validators.required],
      reason: ['', Validators.required]
    });
  }

  closeIncomeModal = () => {
    this.modalCtrl.dismiss();
  }

  onSubmit = () => {
    // console.log(this.addIncomeForm.value.amount);
    this.modalCtrl.dismiss(this.addIncomeForm.value);
  }

}
