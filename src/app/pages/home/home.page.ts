import { Component, OnInit, ViewChild } from '@angular/core';
import { ICategory, INews, INewsResponse } from 'src/app/interfaces/inews';
import { HttpService } from 'src/app/service/http/http-service';
import { environment } from 'src/environments/environment';
import { IonMenu, ModalController } from "@ionic/angular";
import { SideBarComponent } from 'src/app/shared/component/side-bar/side-bar.component';
import { Router } from '@angular/router';
import { Loader } from 'src/app/service/loader/loader';
import { ModalComponent } from 'src/app/shared/component/modal/modal.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  standalone: false,
})
export class HomePage implements OnInit {
  @ViewChild(SideBarComponent) sideBar!: SideBarComponent;
  @ViewChild(IonMenu) menu!: IonMenu;
  articles: INews[] = [];
  mainArticle!: INews | null;
  categories: ICategory[] = [
    { name: 'Business', value: 'business' },
    { name: 'Entertainment', value: 'entertainment' },
    { name: 'General', value: 'general' },
    { name: 'Health', value: 'health' },
    { name: 'Science', value: 'science' },
    { name: 'Sports', value: 'sports' },
    { name: 'Technology', value: 'technology' },
  ];

  selectedCategory: string = 'general';
  loading = false;
  private apiUrl = 'https://newsapi.org/v2/top-headlines';
  private apiKey = environment.api_key;

  constructor(
    private httpService: HttpService,
    private router: Router, 
    private loader: Loader,
    private modalCtrl: ModalController) {}

  ngOnInit() {
    this.loadNews();
  }
  
  ionViewWillEnter() {
    this.loadNews();
  }

  openSideBar() {
    this.sideBar.open(); 
  }

  async openArticleModal(article: INews) {
    const modal = await this.modalCtrl.create({
      component: ModalComponent,
      componentProps: { article }
    });
    await modal.present();
  }

  async loadNews(event?: any) {
    this.loading = true;

    const url = 'https://newsapi.org/v2/top-headlines';
    const headers = {
      'X-Api-Key': this.apiKey
    };
   
    const params = { country: 'us', category: this.selectedCategory };


    try {
      const res = await this.httpService.get<INewsResponse>(this.apiUrl, headers, params);
      if (res && res.articles.length > 0) {
        const articlesWithImage = res.articles.filter(a => a.urlToImage);
        if (articlesWithImage.length > 0) {
          this.mainArticle = articlesWithImage[0]; 
          this.articles = articlesWithImage.slice(1);
          console.log('Main article:', this.mainArticle);
          console.log('Other articles:', this.articles);
        } else {
          console.warn('There is not articles with images.');
          this.mainArticle = null;
          this.articles = [];
        }
      }
    } catch (err) {
      console.error('Error loading news', err);
    } finally {
      this.loading = false;
      if (event) {
        event.target.complete();
      }
    }
  }

  async onCategorySelected(category: ICategory) {
    this.selectedCategory = category.value;
    await this.loadNews();
    this.sideBar.close();
  }

  async onLogout() {    
    
    this.selectedCategory = 'general';
    await this.loader.show('Loading...');
    
    this.router.navigate(['/login']).then(() => {
        setTimeout(() => this.loader.hide(), 500);
    });
  }
}
