import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ITodo } from '../types/todo';
import { ITodoFilter } from '../types/todo-filter';

@Injectable({
  providedIn: 'root',
})
export class TodoFilterService {
  filters$: BehaviorSubject<ITodoFilter> = new BehaviorSubject<ITodoFilter>({
    searchQuery: '',
    completeFilter: '',
  });

  constructor() {}

  setFilters(filters: ITodoFilter) {
    this.filters$.next(filters);
  }
}
