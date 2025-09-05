import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ICategory } from 'src/app/interfaces/inews';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
  standalone:false
})
export class ListComponent {
  @Input() items: ICategory[] = [];
  @Output() itemSelected = new EventEmitter<ICategory>();

  selectItem(item: ICategory) {
    this.itemSelected.emit(item);
  }

}
