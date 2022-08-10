import { Pipe, PipeTransform } from '@angular/core';
import { ITodo } from '../types/todo';
import { ITodoFilter } from '../types/todo-filter';

@Pipe({
  name: 'todoFilter',
})
export class TodoFilterPipe implements PipeTransform {
  transform(
    todos: ITodo[],
    { searchQuery = '', completeFilter = '', tags = [] }: ITodoFilter
  ): ITodo[] {
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
