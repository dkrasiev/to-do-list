import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import {
  AngularFireDatabase,
  snapshotChanges,
} from '@angular/fire/compat/database';
import { BehaviorSubject, catchError, Observable } from 'rxjs';
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
  isLoading$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  firstLoad = true;

  get dbTodos() {
    if (!this.currentUser) return null;

    return this.db.list(`todos/${this.currentUser.uid}`);
  }

  constructor(
    private http: HttpClient,
    private auth: AngularFireAuth,
    private db: AngularFireDatabase
  ) {
    this.todos$.subscribe(() => {
      if (!this.firstLoad) this.saveTodo();

      this.firstLoad = false;
    });

    this.auth.onAuthStateChanged((user) => {
      this.currentUser = user;
      this.loadTodos();
    });
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

  loadTodos(): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      this.isLoading$.next(true);

      this.getTodosFromDatabase()
        .then((todos) => {
          todos = todos || this.getTodosFromLocalStorage();

          this.todos$.next(todos);

          this.isLoading$.next(false);
          resolve();
        })
        .catch((e) => console.log(e.message));
    });
  }

  getTodosFromLocalStorage() {
    const localTodos = localStorage.getItem('todos');

    return localTodos ? JSON.parse(localTodos) : [];
  }

  async getTodosFromDatabase() {
    const user = await this.auth.currentUser;

    if (!user) {
      return;
    }

    const snapshot = await this.dbTodos?.query.get();
    const todos = snapshot?.val();

    return todos || [];
  }

  saveTodo() {
    const todos = this.todos$.value;

    if (!todos) return;

    if (this.currentUser) {
      this.db.list(`todos`).set(this.currentUser.uid, todos);
    } else {
      localStorage.setItem('todos', JSON.stringify(todos));
    }
  }

  getMockedTodos() {
    this.isLoading$.next(true);
    this.http.get<ITodo[]>(this.url).subscribe((todos) => {
      this.todos$.next(todos);
      this.isLoading$.next(false);
    });
  }

  clearTodos() {
    this.todos$.next([]);

    this.saveTodo();
  }
}
