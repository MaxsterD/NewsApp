import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.scss'],
  standalone: false
})
export class SelectComponent {
  @Input() options: any[] = [];
  @Input() label: string = '';
  @Input() interface: string = 'popover';
  @Input() displayKey: string = '';
  @Output() selected = new EventEmitter<any>();

  onSelect(event: any) {
    this.selected.emit(event.detail.value);
  }
}
