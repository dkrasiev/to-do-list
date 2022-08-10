import { Component, Input, OnInit } from '@angular/core';
import { TodoService } from 'src/app/services/todo.service';
import { ITodo } from 'src/app/types/todo';

@Component({
  selector: 'app-todo-item',
  templateUrl: './todo-item.component.html',
  styleUrls: ['./todo-item.component.css'],
})
export class TodoItemComponent implements OnInit {
  @Input() todo!: ITodo;

  inputTitle: string = '';
  tagInput: string = '';

  tagInputFocused: boolean = false;
  mouseover: boolean = false;

  constructor(private todoService: TodoService) {}

  ngOnInit(): void {
    const context = this;
    setTimeout(() => {
      this.todo = new Proxy(this.todo, {
        set(todo, prop, value) {
          const result = Reflect.set(todo, prop, value);

          context.todoService.setTodo(todo.id, todo);

          return result;
        },
      });
    }, 0);

    this.inputTitle = this.todo.title;
  }

  deleteTodo() {
    this.todoService.deleteTodo(this.todo.id);
  }

  onBlur() {
    if (this.inputTitle) this.todo.title = this.inputTitle.trim();

    this.inputTitle = this.todo.title;
  }

  removeTag(tag: string) {
    this.todo.tags = this.todo.tags?.filter((v) => v !== tag);
  }

  addTag() {
    const value = this.tagInput.trim();

    if (!this.todo.tags) this.todo.tags = [];

    if (value && !this.todo.tags?.includes(value)) this.todo.tags?.push(value);

    this.tagInput = '';

    this.todo.tags = this.todo.tags;
  }
}
