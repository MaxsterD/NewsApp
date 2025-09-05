import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Auth } from 'src/app/service/auth/auth';


@Injectable({
  providedIn: 'root'
})
export class LoginGuard implements CanActivate {

  constructor(private authService: Auth, private router: Router) {}

  canActivate(): boolean {
    const currentUser = this.authService.getCurrentUser();
    if (currentUser) {
      this.router.navigate(['/home']);
      return false;
    }
    return true;
  }
}
