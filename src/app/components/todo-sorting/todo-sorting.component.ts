import { Component, OnInit } from '@angular/core';
import { TodoSortingService } from 'src/app/services/todo-sorting.service';
import { ITodoSort } from 'src/app/types/todo-sort';

@Component({
  selector: 'app-todo-sorting',
  templateUrl: './todo-sorting.component.html',
  styleUrls: ['./todo-sorting.component.css'],
})
export class TodoSortingComponent implements OnInit {
  sortingValue: string = 'id';
  sorting!: ITodoSort;

  options: ITodoSort[] = [
    // {
    //   value: '',
    //   name: 'none',
    // },
    {
      value: 'title',
      name: 'name',
    },
    {
      value: 'id',
      name: 'date',
    },
  ];

  constructor(private todoSortingService: TodoSortingService) {}

  ngOnInit(): void {
    this.updateSort();

    this.todoSortingService.sorting.subscribe((sort) => {
      this.sorting = sort;
      this.sortingValue = sort.value;
    });
  }

  setSort(e: Event) {
    const value = (e.target as HTMLSelectElement).value;
    const option = this.options.find((v) => v.value == value);

    if (option) {
      this.sorting = option;
      this.todoSortingService.setSorting(this.sorting);
    }
  }

  updateSort() {
    const findedOption = this.options.find((v) => v.value == this.sortingValue);
    if (findedOption) this.sorting = findedOption;
    this.todoSortingService.setSorting(this.sorting);
  }
}
