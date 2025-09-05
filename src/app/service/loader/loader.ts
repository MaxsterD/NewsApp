import { Injectable } from '@angular/core';
import { LoadingController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class Loader {
  private loading: HTMLIonLoadingElement | null = null;

  constructor(private loadingCtrl: LoadingController) {}

  async show(message: string = 'Loading...') {
    if (!this.loading) {
      this.loading = await this.loadingCtrl.create({
        message,
        spinner: 'crescent',
        backdropDismiss: false,
      });
      await this.loading.present();
    }
  }

  async hide() {
    if (this.loading) {
      await this.loading.dismiss();
      this.loading = null;
    }
  }
}
