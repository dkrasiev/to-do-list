import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DarkModeService {
  darkModeClass = 'dark-mode';
  lightModeClass = 'light-mode';
  storageKey = 'dark-mode';

  darkMode$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(
    this._getInitialDarkModeValue()
  );

  constructor() {
    this.darkMode$.subscribe((darkmode) => {
      localStorage.setItem(
        this.storageKey,
        JSON.stringify({ darkMode: darkmode })
      );

      document.body.classList.add(
        darkmode ? this.darkModeClass : this.lightModeClass
      );

      document.body.classList.remove(
        darkmode ? this.lightModeClass : this.darkModeClass
      );
    });
  }

  toggle() {
    this.darkMode$.next(!this.darkMode$.value);
  }

  enable() {
    this.darkMode$.next(true);
  }

  disable() {
    this.darkMode$.next(false);
  }

  private _getInitialDarkModeValue(): boolean {
    let darkModeFromStorage = localStorage.getItem(this.storageKey);
    let initialDarkModeValue = false;

    if (darkModeFromStorage) {
      try {
        let parsedDarkModeFromStorage = JSON.parse(darkModeFromStorage);
        initialDarkModeValue = parsedDarkModeFromStorage.darkMode;
      } catch (err) {
        console.warn('Error initializing angular-dark-mode');
        console.warn(err);
      }
    } else {
      /**
       *  Default initial state is via prefers-color-scheme media query. Override the below lines to change initial state.
       *
       *  For example to always start in light / dark mode you can immediately set the localStorage entry:
       *  ```js
       *  localStorage.setItem(storageKey, JSON.stringify({ darkMode: initialDarkModeValue }))
       *  ```
       */
      let prefersDarkSchemeQuery = '(prefers-color-scheme: dark)';
      initialDarkModeValue = window.matchMedia(prefersDarkSchemeQuery).matches;
    }

    return initialDarkModeValue;
  }
}
