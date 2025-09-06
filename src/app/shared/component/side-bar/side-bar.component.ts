import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { IonMenu } from '@ionic/angular';
import { ICategory } from 'src/app/interfaces/inews';
import { Auth } from 'src/app/service/auth/auth';
import { Loader } from 'src/app/providers/loader/loader';

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.scss'],
  standalone: false,
})
export class SideBarComponent {
  @Input() categories: ICategory[] = [];
  @Output() categorySelected = new EventEmitter<ICategory>();
  @ViewChild(IonMenu) menu!: IonMenu;
  @Output() logoutEvent = new EventEmitter<void>();

  currentUser = this.authService.getCurrentUser();
  
  constructor(private router: Router, private authService: Auth, private loader: Loader) {
    this.authService.currentUser$.subscribe(user => {
      this.currentUser = user; 
    });
  }

  open() {
    this.menu.open();
  }

  close() {
    this.menu.close();
  }

  onSelect(category: ICategory) {
    this.categorySelected.emit(category);
  }

  async goToProfile() {
    await this.loader.show('Loading...');
    
    this.router.navigate(['/profile']).then(() => {
      setTimeout(() => this.loader.hide(), 500);
    });
  }

  logout() {
    this.authService.logout(); 
    this.logoutEvent.emit();
    this.menu.close();
  }
  
}
