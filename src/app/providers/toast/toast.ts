import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';


@Injectable({
  providedIn: 'root'
})
export class Toast {
  constructor(private ctrlToast: ToastController) {}

  async show(message: string, color: string = 'danger', duration: number = 2500, position: 'top' | 'bottom' | 'middle' = 'bottom') {
    const toast = await this.ctrlToast.create({
      message,
      duration,
      color,
      position
    });
    await toast.present();
  }
}
