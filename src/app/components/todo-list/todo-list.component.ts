import {
  animate,
  query,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { Component, Input, OnInit } from '@angular/core';
import { TodoFilterPipe } from 'src/app/pipes/todo-filter.pipe';
import { TodoFilterService } from 'src/app/services/todo-filter.service';
import { TodoSortingService } from 'src/app/services/todo-sorting.service';
import { TodoService } from 'src/app/services/todo.service';
import { ITodo } from 'src/app/types/todo';
import { ITodoFilter } from 'src/app/types/todo-filter';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css'],
  animations: [
    trigger('listAnimation', [
      transition('* <=> *', [
        query(
          ':enter',
          [
            style({ opacity: 0, height: 0 }),
            animate('200ms', style({ opacity: 1, height: '*' })),
          ],
          { optional: true }
        ),
        query(':leave', animate('200ms', style({ height: 0, opacity: 0 })), {
          optional: true,
        }),
      ]),
    ]),
  ],
})
export class TodoListComponent implements OnInit {
  @Input() addInput: boolean = true;

  todos: ITodo[] = [];
  filter: ITodoFilter = {} as ITodoFilter;
  isLoading: boolean = false;

  get filteredTodos(): ITodo[] {
    return this.todoFilter.transform(this.todos, this.filter);
  }

  get filteredAndSortedTodos(): ITodo[] {
    return this.todoSortingService.sort(this.filteredTodos);
  }

  get restTodos(): ITodo[] {
    return this.todos.filter(
      (a) => !this.filteredAndSortedTodos.find((b) => a == b)
    );
  }

  todoTitle: string = '';

  constructor(
    private todoService: TodoService,
    private todoFilterService: TodoFilterService,
    private todoFilter: TodoFilterPipe,
    private todoSortingService: TodoSortingService
  ) {}

  ngOnInit(): void {
    this.todoService.loadTodos();

    this.todoService.todos$.subscribe((todos) => {
      this.todos = todos;
    });

    this.todoFilterService.filter$.subscribe((filter) => {
      this.filter = filter;
    });

    this.todoService.isLoading$.subscribe((loadingState) => {
      this.isLoading = loadingState;
    });
  }

  addTodo() {
    if (!this.todoTitle.trim()) {
      this.todoTitle = '';
      return;
    }

    this.todoService.addTodo({
      title: this.todoTitle,
      completed: false,
      userId: 1,
      id: new Date().getTime(),
      tags: [],
    });

    this.todoTitle = '';
  }
}
