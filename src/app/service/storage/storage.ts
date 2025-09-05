import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class Storage {

  constructor() {}

  setItem(key: string, value: any): void {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (e) {
      console.error('Error guardando en localStorage', e);
    }
  }

 
  getItem<T>(key: string): T | null {
    try {
      const data = localStorage.getItem(key);
      return data ? JSON.parse(data) as T : null;
    } catch (e) {
      console.error('Error leyendo de localStorage', e);
      return null;
    }
  }

  removeItem(key: string): void {
    localStorage.removeItem(key);
  }

  updateItem(key: string, newValue: any): void {
    try {
      const current = this.getItem<any>(key) || {};
      const updated = { ...current, ...newValue };
      this.setItem(key, updated);
    } catch (e) {
      console.error('Error actualizando en localStorage', e);
    }
  }

  clear(): void {
    localStorage.clear();
  }
}
