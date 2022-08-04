import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LayoutService {
  sidenav$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  constructor() {}

  toggle() {
    this.sidenav$.next(!this.sidenav$.value);
  }

  close() {
    this.sidenav$.next(false);
  }
}
