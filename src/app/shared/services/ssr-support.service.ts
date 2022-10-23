import { Platform } from '@angular/cdk/platform';
import { DOCUMENT } from '@angular/common';
import { Inject, Injectable } from '@angular/core';

export class MemoryStorage implements Storage {
  private data: { [key: string]: string } = {};

  get length(): number {
    return Object.keys(this.data).length;
  }

  clear(): void {
    this.data = {};
  }

  getItem(key: string): string | null {
    return key in this.data ? this.data[key] : null;
  }

  key(index: number): string | null {
    const keys = Object.keys(this.data);

    return index >= 0 && keys.length < index ? keys[index] : null;
  }

  removeItem(key: string): void {
    delete this.data[key];
  }

  setItem(key: string, value: string): void {
    this.data[key] = value;
  }
}

@Injectable({
  providedIn: 'root',
})
export class SsrSupportService {
  private readonly storage: Storage;
  constructor(
    @Inject(DOCUMENT) private document: Document,
    private _platform: Platform
  ) {
    if (this._platform.isBrowser && window?.localStorage) {
      this.storage = window.localStorage;
    } else {
      this.storage = new MemoryStorage();
    }
  }

  public getDocument(): Document {
    return this.document;
  }

  get localStorageLength(): number {
    return this.storage.length;
  }

  public clearLocalStorage(): void {
    this.storage.clear();
  }

  public getLocalStorageItem(key: string): string | null {
    return this.storage.getItem(key);
  }

  public localStorageKey(index: number): string | null {
    return this.storage.key(index);
  }

  public removeLocalStorageItem(key: string): void {
    this.storage.removeItem(key);
  }

  public setLocalStorageItem(key: string, value: string): void {
    this.storage.setItem(key, value);
  }
}
