import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { FirebaseService } from '../services/firebase.service';
import { ToastController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  registerForm: FormGroup;
  constructor(private fb: FormBuilder, private firebaseService: FirebaseService, private toastCtrl: ToastController,
              private router: Router) {
    this.createLoginForm();
  }

  ngOnInit() {
  }

  createLoginForm = () => {
    this.registerForm = this.fb.group({
      username: ['', Validators.compose([
        Validators.required,
        Validators.minLength(5),
      ])],
      email: ['', Validators.compose([
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
        ])],
      password: ['', Validators.compose([
        Validators.required,
        Validators.minLength(5),
        Validators.maxLength(10),
      ])],
      confirmPassword: ['', Validators.compose([
        Validators.required,
        Validators.minLength(5),
        Validators.maxLength(10),
      ])],
      contactNumber: ['', Validators.compose([
        Validators.required,
        Validators.minLength(10),
        Validators.maxLength(10),
      ])],
      createdOn: new Date().toISOString()
    });
  }

  onSubmit = () => {
    console.log(this.registerForm.value);
    this.firebaseService.addUser(this.registerForm.value)
    .then(async (res: any) => {
      console.log(res.user);
      if (res.user) {
        const toast = this.toastCtrl.create({
          message: 'Successfully Logged In..',
          duration: 3000
        });
        (await toast).present();
        this.router.navigate(['login']);
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

  backToMenu = () => {
    this.router.navigate(['login']);
  }
}
