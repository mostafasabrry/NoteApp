import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {

  private themeKey = 'bs-theme';

  constructor() {
    this.loadTheme();
  }

  toggleTheme(): void {
    const htmlElement = document.documentElement;
    const currentTheme = htmlElement.getAttribute('data-bs-theme') === 'light' ? 'dark' : 'light';
    htmlElement.setAttribute('data-bs-theme', currentTheme);
    localStorage.setItem(this.themeKey, currentTheme);
  }

  private loadTheme(): void {
    const savedTheme = localStorage.getItem(this.themeKey) || 'light';
    document.documentElement.setAttribute('data-bs-theme', savedTheme);
  }
}
