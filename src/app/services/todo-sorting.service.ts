import { TypeofExpr } from '@angular/compiler';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ITodo } from '../types/todo';
import { ITodoSort } from '../types/todo-sort';

@Injectable({
  providedIn: 'root',
})
export class TodoSortingService {
  sorting$: BehaviorSubject<ITodoSort> = new BehaviorSubject({
    value: 'id',
    name: 'date',
  });

  constructor() {}

  setSorting(value: ITodoSort) {
    this.sorting$.next(value);
  }

  sort(todos: ITodo[]): ITodo[] {
    let sortedTodos = todos;
    switch (this.sorting$.value.value) {
      case 'title':
        sortedTodos = todos.sort((a, b) =>
          a.title.toLowerCase().localeCompare(b.title.toLowerCase())
        );
        break;
      case 'id':
        sortedTodos = todos.sort((a, b) => b.id - a.id);
        break;
      case 'completed':
        sortedTodos = todos.sort(
          (a, b) => (a.completed ? 1 : 0) - (b.completed ? 1 : 0)
        );
        break;

      default:
        break;
    }

    return sortedTodos;
  }
}
