import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-link',
  templateUrl: './link.component.html',
  styleUrls: ['./link.component.scss'],
  standalone: false,
})
export class LinkComponent  {
  @Input() text: string = 'Go to Page';  
  @Input() route: string = '/';          
  @Input() align: 'left' | 'center' | 'right' = 'center'; 
  
  constructor(private router: Router) {}

  navigate() {
    
    this.router.navigate([this.route]);
    
  }

}
