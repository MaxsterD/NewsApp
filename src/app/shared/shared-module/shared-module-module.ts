import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InputComponent } from '../component/input/input.component';
import { ButtonComponent } from '../component/button/button.component';
import { LinkComponent } from '../component/link/link.component';
import { HttpClientModule } from '@angular/common/http';
import { SelectComponent } from '../component/select/select.component';

@NgModule({
  declarations: [
    InputComponent,
    ButtonComponent,
    LinkComponent,
    SelectComponent
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
    ReactiveFormsModule,
    HttpClientModule
  ]
})
export class SharedModuleModule { }
