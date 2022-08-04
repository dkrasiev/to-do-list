import { Component } from '@angular/core';
import { TodoService } from './services/todo.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = $localize`todo list`;

  constructor(private todoService: TodoService) {}

  loadTodos() {
    this.todoService.loadTodos().subscribe();
  }

  clearTodos() {
    this.todoService.clearTodos();
  }
}
