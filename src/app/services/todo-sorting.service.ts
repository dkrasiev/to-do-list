import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Todo } from '../models/todo';
import { ITodoSort } from '../models/todo-sort';

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

  sort(todos: Todo[]): Todo[] {
    const sortingMethod = this.getSorting();
    let sortedTodos = todos;

    if (sortingMethod) sortedTodos = sortedTodos.sort(sortingMethod);

    return sortedTodos;
  }

  getSorting() {
    switch (this.sorting$.value.value) {
      case 'title':
        return (a: Todo, b: Todo) =>
          a.title.toLowerCase().localeCompare(b.title.toLowerCase());
      case 'id':
        return (a: Todo, b: Todo) => b.id - a.id;
      case 'completed':
        return (a: Todo, b: Todo) =>
          (a.completed ? 1 : 0) - (b.completed ? 1 : 0);
    }

    return null;
  }
}
