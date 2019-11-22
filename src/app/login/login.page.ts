import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { User } from '../shared/user';
import { ToastController, ModalController } from '@ionic/angular';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';
import { LoginService } from '../services/login.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { FirebaseService } from '../services/firebase.service';
import { TotalPage } from '../total/total.page';



@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  loginForm: FormGroup;
  user: any;
  users: any;
  userId: string;
  constructor(private fb: FormBuilder, private toastCtrl: ToastController, private router: Router, private fAuth: AngularFireAuth,
    private firebaseService: FirebaseService, private aFirestore: AngularFirestore, private modalCtrl: ModalController) {
    this.createLoginForm();
  }

  ngOnInit() {
    this.getData();
  }

  getData = () => {
    this.firebaseService.loginCredential()
      .subscribe(data => {
        this.users = data;
      });
  }
  createLoginForm = () => {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  async onSubmit() {
    const username = this.loginForm.value.username;
    const password = this.loginForm.value.password;
    console.log('', this.users);
    this.users.map(async user => {
      if (user.username === username) {
        if (user.password === password) {
          this.userId = user.uid;
          const toast = this.toastCtrl.create({
            message: 'Successfully Logged In..',
            duration: 3000
          });
          (await toast).present();
          this.openIncomeModal();
        }
      } else {
        const toast = this.toastCtrl.create({
          message: 'User Details are wrong',
          duration: 3000
        });
        (await toast).present();
      }
    });
  }

  openIncomeModal = async () => {
    
    const modal = this.modalCtrl.create({
      component: TotalPage,
      componentProps: {userId: this.userId}
    });
    (await modal).present();
  }

  registerUser = () => {
    this.router.navigate(['register']);
  }
}
