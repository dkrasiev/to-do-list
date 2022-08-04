import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { ITodo } from '../types/todo';

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  url = 'https://jsonplaceholder.typicode.com/todos';

  todos$: BehaviorSubject<ITodo[]> = new BehaviorSubject<ITodo[]>([]);

  constructor(private http: HttpClient) {
    this.todos$.subscribe((todos) => {
      if (todos.length == 0) return;
      localStorage.setItem('todos', JSON.stringify(todos));
    });
  }

  loadTodos() {
    return this.http
      .get<ITodo[]>(this.url)
      .pipe(tap((todos) => this.todos$.next(todos)));
  }

  clearTodos() {
    this.todos$.next([]);
    localStorage.setItem('todos', JSON.stringify(this.todos$.value));
  }

  setTodo(id: number, todo: ITodo) {
    let oldTodo = this.todos$.value.find((v, i) => v.id == id);

    if (oldTodo) {
      oldTodo = { ...oldTodo, ...todo };
      this.todos$.next(this.todos$.value);
    }
  }

  getTodos() {
    const localTodos = localStorage.getItem('todos');
    let todos: ITodo[] | null = null;

    if (localTodos) {
      todos = JSON.parse(localTodos);
    }

    return new Observable<ITodo[]>((observer) => {
      observer.next((todos as ITodo[]) || this.todos$.value);
      observer.complete();
    }).pipe(tap((todos) => this.todos$.next(todos)));
  }

  getTodo(id: number) {
    return this.http.get<ITodo>(this.url + '/' + id);
  }

  getUserTodo(userId: number) {
    return this.todos$.value.filter((v) => v.userId == userId);
  }

  addTodo(todo: ITodo) {
    this.todos$.value.push(todo);
    this.todos$.next(this.todos$.value);
  }

  deleteTodo(id: number) {
    let index;
    const todo = this.todos$.value.find((v, i) => {
      if (v.id == id) {
        index = i;
        return true;
      }

      return false;
    });

    if (todo && typeof index == 'number') {
      this.todos$.value.splice(index, 1);
      this.todos$.next(this.todos$.value);
      return;
    }
  }
}
