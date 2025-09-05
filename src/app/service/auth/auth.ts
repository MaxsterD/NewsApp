import { Injectable } from '@angular/core';
import { Iuser } from 'src/app/interfaces/iuser';
import { Storage } from '../storage/storage';
import { BehaviorSubject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class Auth {
  private readonly USER_KEY = 'currentUser';

  constructor(private storage: Storage) {}

  private currentUserSubject = new BehaviorSubject<Iuser | null>(null);
  currentUser$ = this.currentUserSubject.asObservable();
  
  public setCurrentUser(user: Iuser) {
    this.currentUserSubject.next(user);
    this.storage.setItem(this.USER_KEY, user);
  }

  
  public getCurrentUser(): Iuser | null {
    return this.storage.getItem(this.USER_KEY);
  }

  
  public isAuthenticated(): boolean {
    return !!this.getCurrentUser();
  }

  public logout() {
    this.currentUserSubject.next(null);
    this.storage.removeItem(this.USER_KEY);
  }
}