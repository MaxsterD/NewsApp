import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Auth } from 'src/app/service/auth/auth';
import { Loader } from 'src/app/providers/loader/loader';


@Injectable({
  providedIn: 'root'
})
export class LoginGuard implements CanActivate {

  constructor(private authService: Auth, private router: Router, private loader: Loader) {}

  async canActivate(): Promise<boolean> {
    const currentUser = this.authService.getCurrentUser();
    if (currentUser) {
      await this.loader.show('Loading...');
      
      this.router.navigate(['/home']).then(() => {
        setTimeout(() => this.loader.hide(), 500);
      });
      return false;
    }
    return true;
  }
}
