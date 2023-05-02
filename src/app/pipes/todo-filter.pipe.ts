import { Pipe, PipeTransform } from '@angular/core';
import { Todo } from '../models/todo';
import { ITodoFilter } from '../models/todo-filter';

@Pipe({
  name: 'todoFilter',
})
export class TodoFilterPipe implements PipeTransform {
  transform(
    todos: Todo[],
    { searchQuery = '', completeFilter = '', tags = [] }: ITodoFilter
  ): Todo[] {
    return todos.filter((v) => {
      let searchResult = v.title
        .toLowerCase()
        .includes(searchQuery.toLowerCase());

      let completeFilterResult = true;
      if (completeFilter) {
        completeFilterResult = v.completed.toString() == completeFilter;
      }

      let tagsFilterResult = true;
      if (tags.length) {
        tagsFilterResult = false;

        if (v.tags) {
          for (let tag of tags) {
            tagsFilterResult = v.tags.includes(tag);

            if (tagsFilterResult == true) break;
          }
        }
      }

      return searchResult && completeFilterResult && tagsFilterResult;
    });
  }
}
