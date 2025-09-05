import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Loader } from 'src/app/service/loader/loader';

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
  
  constructor(private router: Router, private loader: Loader) {}

  async navigate() {
    await this.loader.show('Loading...');
    
    this.router.navigate([this.route]).then(() => {
      setTimeout(() => this.loader.hide(), 500);
    });
    
  }

}
