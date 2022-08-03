import { Pipe, PipeTransform } from '@angular/core';
import { ITodo } from '../types/todo';
import { ITodoFilter } from '../types/todo-filter';

@Pipe({
  name: 'todoFilter',
})
export class TodoFilterPipe implements PipeTransform {
  transform(
    todos: ITodo[],
    { searchQuery, completeFilter }: ITodoFilter
  ): ITodo[] {
    return todos.filter((v) => {
      let searchResult = v.title
        .toLowerCase()
        .includes(searchQuery.toLowerCase());

      let completeResult = true;
      if (completeFilter) {
        completeResult = v.completed.toString() == completeFilter;
      }

      return searchResult && completeResult;
    });
  }
}
