import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

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
  @Input() icon?: string; 
  @Input() loading: boolean = false; 
  @Input() form?: FormGroup;

  get isDisabled(): boolean {
    return !!this.disabled || !!this.loading || (this.type === 'submit' && !!this.form && !!this.form?.invalid);
  }
}
