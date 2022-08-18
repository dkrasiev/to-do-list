import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { BehaviorSubject } from 'rxjs';
import { ITodo } from '../types/todo';

import firebase from 'firebase/compat/app';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  url = 'https://jsonplaceholder.typicode.com/todos';
  currentUser: firebase.User | null = null;
  todos$: BehaviorSubject<ITodo[]> = new BehaviorSubject<ITodo[]>([]);

  get dbTodos() {
    if (!this.currentUser) return null;

    return this.db.list(`todos/${this.currentUser.uid}`);
  }

  constructor(
    private http: HttpClient,
    private auth: AngularFireAuth,
    private db: AngularFireDatabase
  ) {
    this.todos$.subscribe(() => this.saveTodo());

    auth.authState.subscribe((user) => {
      this.currentUser = user;
      if (user) {
        this.loadTodos();
      }
    });
  }

  loadTodos() {
    if (this.currentUser) {
      this.dbTodos?.query.get().then((snapshot) => {
        const todos = snapshot.val();
        if (todos) this.todos$.next(todos);
      });
    } else {
      const localTodos = localStorage.getItem('todos');
      if (localTodos) this.todos$.next(JSON.parse(localTodos));
    }
  }

  getMockedTodos() {
    this.http
      .get<ITodo[]>(this.url)
      .subscribe((todos) => this.todos$.next(todos));
  }

  clearTodos() {
    this.todos$.next([]);

    this.saveTodo();
  }

  updateTodo(id: number, todo: ITodo) {
    this.todos$.value.map((value) => {
      if (value.id == id) {
        return todo;
      } else {
        return value;
      }
    });

    this.todos$.next(this.todos$.value);
  }

  addTodo(todo: ITodo) {
    todo.title = todo.title.trim();
    this.todos$.value.push(todo);
    this.todos$.next(this.todos$.value);
  }

  deleteTodo(id: number) {
    this.todos$.next(this.todos$.value.filter((todo) => todo.id !== id));
  }

  async getTodos(): Promise<ITodo[]> {
    if (this.currentUser) {
      const snapshot = await this.dbTodos?.query.get();
      return snapshot?.val();
    } else {
      return new Promise((resolve, reject) => {
        const localTodos = localStorage.getItem('todos');
        const result = localTodos ? JSON.parse(localTodos) : [];

        resolve(result);
      });
    }
  }

  async saveTodo() {
    const todos = this.todos$.value;
    const user = await this.auth.currentUser;

    if (!todos) return;

    if (user) {
      this.db.list(`todos`).set(user.uid, todos);
    } else {
      localStorage.setItem('todos', JSON.stringify(todos));
    }
  }
}
