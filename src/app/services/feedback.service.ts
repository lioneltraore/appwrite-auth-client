import { Injectable, inject } from '@angular/core';
import { ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root',
})
export class FeedbackService {
  toastCtrl = inject(ToastController);

  constructor() {}

  async presentToast(
    message: string,
    position: 'top' | 'middle' | 'bottom',
    color: 'danger' | 'success' | 'dark' | 'tertiary'
  ) {
    const toast = await this.toastCtrl.create({
      message,
      duration: 4000,
      position,
      color
    });

    await toast.present();
  }
}
