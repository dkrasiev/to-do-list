import { Injectable } from '@angular/core';
import { BehaviorSubject, skip } from 'rxjs';
import { Todo } from '../models/todo';

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  public todos$ = new BehaviorSubject<Todo[]>([]);

  constructor() {
    this.todos$.pipe(skip(1)).subscribe(() => this.saveTodos());
  }

  public create(todo: Todo): void {
    this.todos$.next([...this.todos$.value, todo]);
  }

  public update(id: number, todo: Partial<Todo>): void {
    this.todos$.next(
      this.todos$.value.map((value) =>
        value.id === id ? { ...value, ...todo } : value
      )
    );
  }

  public delete(id: number): void {
    this.todos$.next(this.todos$.value.filter((todo) => todo.id !== id));
  }

  public setTodos(todo: Todo[]): void {
    this.todos$.next(todo);
  }

  public clearTodos(): void {
    this.todos$.next([]);
  }

  private saveTodos(): void {
    localStorage.setItem('todos', JSON.stringify(this.todos$.value));
  }
}
