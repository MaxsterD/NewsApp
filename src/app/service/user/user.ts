import { Injectable } from '@angular/core';
import { Storage } from '../storage/storage';
import { Iuser } from 'src/app/interfaces/iuser';
import { v4 as uuidv4 } from 'uuid';
import { Encrypt } from '../encrypt/encrypt';

@Injectable({
  providedIn: 'root'
})
export class User {

  private readonly USER_KEY = 'users';

  constructor(private storage: Storage,private encrypt: Encrypt) {}

  public register(user: Iuser) {
    let users: Iuser[] = this.storage.getItem(this.USER_KEY) || [];
    if (!Array.isArray(users)) {
      users = [];
    }
    const userToSave: Iuser = {
      id: uuidv4(),
      password: this.encrypt.hash(user.password),
      name: user.name,
      lastName: user.lastName,
      email: user.email,
      country: user.country
    };

    users.push(userToSave);
    this.storage.setItem(this.USER_KEY, users);
    return userToSave;
  }

  public login(email: string, password: string): Iuser | null {
    let users: Iuser[] = this.storage.getItem(this.USER_KEY) || [];
    if (!Array.isArray(users)) {
      users = [];
    }
    
    const user = users.find(u => u.email === email);
    if (user && this.encrypt.compare(password, user.password)) {
      return user;
    }
    return null;
  }

  public getUserByEmail(email: string): Iuser | null {
    let users: Iuser[] = this.storage.getItem(this.USER_KEY) || [];
    if (!Array.isArray(users)) {
      users = [];
    }
    return users.find(u => u.email === email) || null;
  }

  public updateUser(updatedUser: Iuser): boolean {
    let users: Iuser[] = this.storage.getItem(this.USER_KEY) || [];
    if (!Array.isArray(users)) {
      users = [];
    }
    const userIndex = users.findIndex(u => u.id === updatedUser.id);
    if (userIndex !== -1) {
      users[userIndex] = {
        id: users[userIndex].id,
        name: updatedUser.name,
        lastName: updatedUser.lastName,
        country: updatedUser.country,
        email: updatedUser.email,
        password: this.encrypt.hash(updatedUser.password)
      };
      this.storage.setItem(this.USER_KEY, users);
      return true;
    }
    return false;
  }

  public removeUserByEmail(email: string): boolean {
    let users: Iuser[] = this.storage.getItem(this.USER_KEY) || [];
    if (!Array.isArray(users)) {
      users = [];
    }
    const filteredUsers = users.filter(u => u.email !== email);
    if (filteredUsers.length !== users.length) {
      this.storage.setItem(this.USER_KEY, filteredUsers);
      return true;
    }
    return false;
  }

}


