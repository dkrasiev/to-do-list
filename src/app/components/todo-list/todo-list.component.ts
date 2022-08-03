import { Component, OnInit } from '@angular/core';
import { TodoFilterService } from 'src/app/services/todo-filter.service';
import { TodoService } from 'src/app/services/todo.service';
import { ITodo } from 'src/app/types/todo';
import { ITodoFilter } from 'src/app/types/todo-filter';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css'],
})
export class TodoListComponent implements OnInit {
  todos: ITodo[] = [];
  filters: ITodoFilter = {} as ITodoFilter;

  constructor(
    private todoService: TodoService,
    private todoFilterService: TodoFilterService
  ) {}

  ngOnInit(): void {
    this.todoService.getTodos().subscribe();
    this.todoService.todos$.subscribe((todos) => {
      this.todos = todos.filter((v) => v.userId == 1);
    });

    this.todoFilterService.filters$.subscribe((filters) => {
      this.filters = filters;
    });
  }
}
