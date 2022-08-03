import { Component, OnInit } from '@angular/core';
import { TodoFilterPipe } from 'src/app/pipes/todo-filter.pipe';
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
  filteredTodos: ITodo[] = [];

  constructor(
    private todoService: TodoService,
    private todoFilterService: TodoFilterService,
    private todoFilter: TodoFilterPipe
  ) {}

  ngOnInit(): void {
    this.todoService.getTodos().subscribe();
    this.todoService.todos$.subscribe((todos) => {
      this.todos = todos.filter((v) => v.userId == 1);
      this.filteredTodos = this.todoFilter.transform(this.todos, this.filters);
    });

    this.todoFilterService.filters$.subscribe((filters) => {
      this.filters = filters;
      this.filteredTodos = this.todoFilter.transform(this.todos, this.filters);
    });
  }
}
