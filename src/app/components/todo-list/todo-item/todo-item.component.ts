import { Component, Input } from '@angular/core';
import { Todo } from 'src/app/models/todo';
import { TodoService } from 'src/app/services/todo.service';

@Component({
  selector: 'app-todo-item',
  templateUrl: './todo-item.component.html',
  styleUrls: ['./todo-item.component.css'],
})
export class TodoItemComponent {
  @Input() todo!: Todo;

  inputTitle: string = '';
  tagInput: string = '';

  tagInputFocused: boolean = false;
  mouseover: boolean = false;

  constructor(private todoService: TodoService) {}

  public deleteTodo() {
    this.todoService.delete(this.todo.id);
  }

  public onBlur() {
    if (this.inputTitle) this.todo.title = this.inputTitle.trim();

    this.inputTitle = this.todo.title;
  }

  public addTag() {
    const tag = this.tagInput.trim();

    if (!this.todo.tags) this.todo.tags = [];

    if (tag && !this.todo.tags?.includes(tag)) {
      this.todo.tags?.push(tag);
    }

    this.tagInput = '';
  }

  public removeTag(tag: string) {
    this.todoService.update(this.todo.id, {
      ...this.todo,
      tags: this.todo.tags?.filter((v) => v !== tag),
    });
  }
}
