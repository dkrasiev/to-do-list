import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ITodoFilter } from '../models/todo-filter';
import { TodoService } from './todo.service';

@Injectable({
  providedIn: 'root',
})
export class TodoFilterService {
  filter$: BehaviorSubject<ITodoFilter> = new BehaviorSubject<ITodoFilter>({
    searchQuery: '',
    completeFilter: '',
    tags: [],
  });

  tags$: BehaviorSubject<string[]> = new BehaviorSubject<string[]>([]);

  constructor(private todoService: TodoService) {
    this.todoService.todos$.subscribe((todos) => {
      const availableTags = new Set<string>();

      if (todos) {
        for (let todo of todos) {
          if (todo.tags && todo.tags.length > 0) {
            for (let tag of todo.tags) {
              availableTags.add(tag);
            }
          }
        }
      }

      this.tags$.next(Array.from(availableTags));
    });
  }

  setFilter(filter: ITodoFilter) {
    this.filter$.next(filter);
  }
}
