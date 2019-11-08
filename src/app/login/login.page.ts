import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { User } from '../shared/user';
import { ToastController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  loginForm: FormGroup;
  user: User = { username: 'admin', password: 'admin' };
  constructor(private fb: FormBuilder, private toastCtrl: ToastController, private router: Router) {
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

  onSubmit = async () => {
    console.log(this.loginForm.value);
    if (this.user.username === this.loginForm.value.username && this.user.password === this.loginForm.value.password) {
      const toast = this.toastCtrl.create({
        message: 'Successfully Logged In..',
        duration: 3000
      });
      (await toast).present();
      this.router.navigate(['home']);
    } else {
      const toast = this.toastCtrl.create({
        message: 'User Details are wrong',
        duration: 3000
      });
      (await toast).present();
    }
  }
}
