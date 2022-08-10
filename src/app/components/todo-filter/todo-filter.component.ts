import { Component, OnInit } from '@angular/core';
import { TodoFilterService } from 'src/app/services/todo-filter.service';
import { ITodoFilter } from 'src/app/types/todo-filter';

@Component({
  selector: 'app-todo-filter',
  templateUrl: './todo-filter.component.html',
  styleUrls: ['./todo-filter.component.css'],
})
export class TodoFilterComponent implements OnInit {
  searchQuery: string = '';
  completeFilter: string = '';

  constructor(private todoFilterService: TodoFilterService) {}

  ngOnInit(): void {}

  applyFilter() {
    const filter: ITodoFilter = {
      searchQuery: this.searchQuery,
      completeFilter: this.completeFilter,
    };

    this.todoFilterService.setFilter(filter);
  }
}
