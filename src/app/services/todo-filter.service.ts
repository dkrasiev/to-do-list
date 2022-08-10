import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ITodoFilter } from '../types/todo-filter';

@Injectable({
  providedIn: 'root',
})
export class TodoFilterService {
  filter$: BehaviorSubject<ITodoFilter> = new BehaviorSubject<ITodoFilter>({
    searchQuery: '',
    completeFilter: '',
  });

  constructor() {}

  setFilter(filter: ITodoFilter) {
    this.filter$.next(filter);
  }
}
