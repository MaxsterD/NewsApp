import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss'],
  standalone: false
})
export class ButtonComponent {
  @Input() text: string = 'Botón';
  @Input() type: 'button' | 'submit' = 'button';
  @Input() expand: 'block' | 'full' | 'default' = 'default';
  @Input() disabled: boolean = false;
}
