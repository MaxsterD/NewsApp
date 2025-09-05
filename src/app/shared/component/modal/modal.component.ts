import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { DefaultWebViewOptions, InAppBrowser } from '@capacitor/inappbrowser'
import { INews } from 'src/app/interfaces/inews';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
  standalone: false,
})
export class ModalComponent  implements OnInit {
  @Input() article!: INews;
  
  constructor(private modalCtrl: ModalController) { }

  ngOnInit() {}

  close() {
    this.modalCtrl.dismiss();
  }

  async openInBrowser() {
    if (this.article.url) {
      await InAppBrowser.openInWebView({
        url: this.article.url,
        options: DefaultWebViewOptions
    });
    }
  }

}
