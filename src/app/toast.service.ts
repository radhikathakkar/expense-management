import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class ToastService {

  constructor(private toastCtrl: ToastController) { }

  setToast = async (message: string) => {
    const toast = this.toastCtrl.create({
      message,
      duration: 3000
    });
    (await toast).present();
  }
}
