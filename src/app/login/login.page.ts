import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { User } from '../shared/user';
import { ToastController } from '@ionic/angular';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';
import { LoginService } from '../services/login.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { FirebaseService } from '../services/firebase.service';



@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  loginForm: FormGroup;
  user: any;
  users: any;
  constructor(private fb: FormBuilder, private toastCtrl: ToastController, private router: Router, private fAuth: AngularFireAuth,
              private firebaseService: FirebaseService, private aFirestore: AngularFirestore) {
    this.createLoginForm();
  }

  ngOnInit() {
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
    const response = this.fAuth.auth.signInWithEmailAndPassword(username, password)
      .then(async (res: any) => {
        console.log(res.user);
        if (res.user) {
          this.aFirestore.doc(`users/${res.user.uid}`).set({
            uid : res.user.uid,
            username,
            password
          });
          const toast = this.toastCtrl.create({
            message: 'Successfully Logged In..',
            duration: 3000
          });
          (await toast).present();
          this.router.navigate(['home']);
        }
      })
      .catch(async (error: any) => {
        const toast = this.toastCtrl.create({
          message: 'User Details are wrong',
          duration: 3000
        });
        (await toast).present();
      });
  }


  registerUser = () => {
    this.router.navigate(['register']);
  }
}
