import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Auth } from 'src/app/service/auth/auth';
import { Loader } from 'src/app/service/loader/loader';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private auth: Auth, private router: Router, private loader: Loader) {}

  async canActivate(): Promise<boolean> {
    if (this.auth.isAuthenticated()) {
      return true;
    } else {
      this.auth.logout();
      await this.loader.show('Loading...');
      this.router.navigate(['/login']).then(() => {
        setTimeout(() => this.loader.hide(), 500);
      });
      return false;
    }
  }
}
