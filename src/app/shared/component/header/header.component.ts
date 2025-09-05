import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  standalone: false,
})
export class HeaderComponent {
  @Input() title: string = 'Título';
  @Input() color: string = 'primary';
  @Input() align: 'start' | 'center' | 'end' = 'start';
  @Input() icon?: string;        
  @Input() showArrow: boolean = false; 
  @Output() headerClick = new EventEmitter<void>();
  @Output() profileClick = new EventEmitter<void>();

  onProfileClick() {
    this.profileClick.emit();
  }

  onHeaderClick() {
    this.headerClick.emit();
  }
}
