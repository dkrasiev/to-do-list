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
    const sortingMethod = this.getSorting();
    let sortedTodos = todos;

    if (sortingMethod) sortedTodos = sortedTodos.sort(sortingMethod);

    return sortedTodos;
  }

  getSorting() {
    switch (this.sorting$.value.value) {
      case 'title':
        return (a: ITodo, b: ITodo) =>
          a.title.toLowerCase().localeCompare(b.title.toLowerCase());
      case 'id':
        return (a: ITodo, b: ITodo) => b.id - a.id;
      case 'completed':
        return (a: ITodo, b: ITodo) =>
          (a.completed ? 1 : 0) - (b.completed ? 1 : 0);
    }

    return null;
  }
}
