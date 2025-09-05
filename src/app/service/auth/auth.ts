import { Injectable } from '@angular/core';
import { Iuser } from 'src/app/interfaces/iuser';
import { Storage } from '../storage/storage';


@Injectable({
  providedIn: 'root'
})
export class Auth {
  private readonly USER_KEY = 'currentUser';

  constructor(private storage: Storage) {}

  
  publicsetCurrentUser(user: Iuser) {
    this.storage.setItem(this.USER_KEY, user);
  }

  
  getCurrentUser(): Iuser | null {
    return this.storage.getItem(this.USER_KEY);
  }

  
  isAuthenticated(): boolean {
    return !!this.getCurrentUser();
  }

  logout() {
    this.storage.removeItem(this.USER_KEY);
  }
}