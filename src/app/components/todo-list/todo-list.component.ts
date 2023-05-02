import {
  animate,
  query,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { Component, Input } from '@angular/core';
import { Observable, combineLatest, map } from 'rxjs';
import { Todo } from 'src/app/models/todo';
import { TodoFilterPipe } from 'src/app/pipes/todo-filter.pipe';
import { TodoFilterService } from 'src/app/services/todo-filter.service';
import { TodoSortingService } from 'src/app/services/todo-sorting.service';
import { TodoService } from 'src/app/services/todo.service';

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
export class TodoListComponent {
  @Input() public addInput: boolean = true;

  public todos$ = this.todoService.todos$;

  isLoading: boolean = false;

  public get transformedTodos$(): Observable<Todo[]> {
    return combineLatest([this.todos$, this.todoFilterService.filter$]).pipe(
      map(([todos, filter]) => this.todoFilter.transform(todos, filter)),
      map((todos) => this.todoSortingService.sort(todos))
    );
  }

  public get restTodos$(): Observable<Todo[]> {
    return combineLatest([this.todos$, this.transformedTodos$]).pipe(
      map(([actual, filtered]) =>
        actual.filter((todo) => filtered.includes(todo) === false)
      )
    );
  }

  public todoTitle: string = '';

  constructor(
    private todoService: TodoService,
    private todoFilterService: TodoFilterService,
    private todoFilter: TodoFilterPipe,
    private todoSortingService: TodoSortingService
  ) {}

  public addTodo() {
    if (!this.todoTitle.trim()) {
      this.todoTitle = '';
      return;
    }

    this.todoService.create({
      title: this.todoTitle,
      completed: false,
      userId: 1,
      id: new Date().getTime(),
      tags: [],
    });

    this.todoTitle = '';
  }

  public trackById(index: number, todo: Todo): number {
    return todo.id;
  }
}
