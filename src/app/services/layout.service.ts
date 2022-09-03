import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LayoutService {
  sidenav$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  constructor() {}

  openSidenav() {
    this.sidenav$.next(true);
  }

  toggleSidenav() {
    this.sidenav$.next(!this.sidenav$.value);
  }

  closeSidenav() {
    this.sidenav$.next(false);
  }
}
