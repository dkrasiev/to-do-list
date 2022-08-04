import { Component } from '@angular/core';
import { DarkModeService } from 'angular-dark-mode';
import { TodoService } from './services/todo.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = $localize`:@@appTitle:todo list`;

  constructor(
    private todoService: TodoService,
    private darkmodeService: DarkModeService
  ) {}

  loadTodos() {
    this.todoService.loadTodos().subscribe();
  }

  clearTodos() {
    this.todoService.clearTodos();
  }

  toggleDarkMode() {
    this.darkmodeService.toggle();
  }
}
