import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InputComponent } from '../component/input/input.component';
import { ButtonComponent } from '../component/button/button.component';
import { LinkComponent } from '../component/link/link.component';
import { HttpClientModule } from '@angular/common/http';
import { SelectComponent } from '../component/select/select.component';
import { HeaderComponent } from '../component/header/header.component';
import { ArticleComponent } from '../component/article/article.component';
import { MainArticleComponent } from '../component/main-article/main-article.component';
import { SideBarComponent } from '../component/side-bar/side-bar.component';
import { ListComponent } from '../component/list/list.component';
import { ModalComponent } from '../component/modal/modal.component';

@NgModule({
  declarations: [
    InputComponent,
    ButtonComponent,
    LinkComponent,
    SelectComponent,
    HeaderComponent,
    ArticleComponent,
    MainArticleComponent,
    SideBarComponent,
    ListComponent,
    ModalComponent
    
  ],
  imports: [
    CommonModule,
    IonicModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule
  ],
  exports: [
    CommonModule,
    IonicModule,
    InputComponent,
    ButtonComponent,
    LinkComponent,
    SelectComponent,
    HeaderComponent,
    ArticleComponent,
    MainArticleComponent,
    SideBarComponent,
    ListComponent,
    ModalComponent,
    ReactiveFormsModule,
    HttpClientModule
  ]
})
export class SharedModuleModule { }
