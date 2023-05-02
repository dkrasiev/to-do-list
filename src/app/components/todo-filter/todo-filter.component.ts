import { Component, OnInit } from '@angular/core';
import { TodoFilterService } from 'src/app/services/todo-filter.service';
import { ITodoFilter } from 'src/app/models/todo-filter';

@Component({
  selector: 'app-todo-filter',
  templateUrl: './todo-filter.component.html',
  styleUrls: ['./todo-filter.component.css'],
})
export class TodoFilterComponent implements OnInit {
  searchQuery: string = '';
  completeFilter: string = '';

  selectedTags: string[] = [];
  tags: string[] = [];

  constructor(private todoFilterService: TodoFilterService) {}

  ngOnInit(): void {
    this.todoFilterService.tags$.subscribe((tags) => (this.tags = tags));
  }

  applyFilter() {
    const filter: ITodoFilter = {
      searchQuery: this.searchQuery,
      completeFilter: this.completeFilter,
      tags: this.selectedTags,
    };

    this.todoFilterService.setFilter(filter);
  }

  onChipClick(tag: string) {
    const hasTag = this.selectedTags.includes(tag);
    if (hasTag) {
      this.selectedTags = this.selectedTags.filter((v) => v !== tag);
    } else {
      this.selectedTags.push(tag);
    }

    this.applyFilter();
  }
}
