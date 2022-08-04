import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ITodoSort } from '../types/todo-sort';

@Injectable({
  providedIn: 'root',
})
export class TodoSortingService {
  sorting: BehaviorSubject<ITodoSort> = new BehaviorSubject({
    value: 'id',
    name: 'date',
  });

  constructor() {}

  setSorting(value: ITodoSort) {
    this.sorting.next(value);
  }
}
