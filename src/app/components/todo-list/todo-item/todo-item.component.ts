import { ThisReceiver } from '@angular/compiler';
import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { TodoService } from 'src/app/services/todo.service';
import { ITodo } from 'src/app/types/todo';

@Component({
  selector: 'app-todo-item',
  templateUrl: './todo-item.component.html',
  styleUrls: ['./todo-item.component.css'],
})
export class TodoItemComponent {
  @Input() todo!: ITodo;
  @ViewChild('input', { static: false, read: ElementRef }) input!: ElementRef;

  newTitle: string = '';
  editMode: boolean = false;

  constructor(private todoService: TodoService) {
    setTimeout(() => {
      this.todo = new Proxy(this.todo, {
        set(todo, prop, value) {
          const result = Reflect.set(todo, prop, value);

          todoService.setTodo(todo.id, todo);

          return result;
        },
      });
    }, 0);
  }

  deleteTodo() {
    this.todoService.deleteTodo(this.todo.id);
  }

  enterEditMode() {
    this.editMode = true;
    this.newTitle = this.todo?.title;

    setTimeout(() => {
      this.input.nativeElement.focus();
    }, 0);
  }

  toggleTodo() {
    if (!this.editMode) this.todo.completed = !this.todo.completed;
  }

  saveChanges() {
    this.todo.title = this.newTitle;
    this.editMode = false;
  }

  discardChanges() {
    this.editMode = false;
  }
}
