import { Injectable } from '@angular/core';
import * as crypto from 'crypto-js';

@Injectable({
  providedIn: 'root'
})
export class Encrypt {

  constructor() {}

  hash(value: string): string {
    return crypto.SHA256(value).toString();
  }

  compare(value: string, hashedValue: string): boolean {
    return this.hash(value) === hashedValue;
  }
}
