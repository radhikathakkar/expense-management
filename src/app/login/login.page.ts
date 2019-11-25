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
import { ToastService } from '../toast.service';



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
  constructor(private fb: FormBuilder, private toastService: ToastService, private router: Router, private fAuth: AngularFireAuth,
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
    this.users.map(async user => {
      if (user.username === username) {
        if (user.password === password) {
          this.userId = user.uid;
          localStorage.setItem('userId', this.userId);
          this.toastService.setToast('Successfully Logged In..');
          this.openIncomeModal();
        } else {
          this.toastService.setToast('Password wrong');
        }
      }
    });
  }

  openIncomeModal = async () => {
    // console.log('calling open total page at login ... ');
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
