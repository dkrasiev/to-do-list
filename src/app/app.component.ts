import { Component, OnInit } from '@angular/core';
import { LayoutService } from './services/layout.service';
import { TodoService } from './services/todo.service';
import { DarkModeService } from './services/dark-mode.service';
import { Todo } from './models/todo';
import { Observable, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = $localize`:@@appTitle:todo list`;

  darkMode$ = this.darkModeService.darkMode$;
  isSidenavOpen = this.layoutService.sidenav$;

  constructor(
    private todoService: TodoService,
    private darkModeService: DarkModeService,
    private layoutService: LayoutService,
    private http: HttpClient
  ) {}

  public ngOnInit(): void {
    const todos = this.getLocalTodos();
    this.todoService.setTodos(todos);
  }

  public clearTodos() {
    this.todoService.clearTodos();
  }

  public toggleDarkMode() {
    this.darkModeService.toggle();
  }

  public openSidenav() {
    this.layoutService.openSidenav();
  }

  public closeSidenav() {
    this.layoutService.closeSidenav();
  }

  public getLocalTodos(): Todo[] {
    try {
      return JSON.parse(localStorage.getItem('todos') || '[]');
    } catch (e) {
      console.error(e);
      return [];
    }
  }

  public fetchMockedTodos() {
    this.http
      .get<Todo[]>('https://jsonplaceholder.typicode.com/todos')
      .subscribe((todos) => this.todoService.setTodos(todos));
  }
}
