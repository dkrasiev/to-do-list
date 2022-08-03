import { Component, OnInit } from '@angular/core';
import { TodoService } from 'src/app/services/todo.service';

@Component({
  selector: 'app-todo-input',
  templateUrl: './todo-input.component.html',
  styleUrls: ['./todo-input.component.css'],
})
export class TodoInputComponent implements OnInit {
  title: string = '';

  constructor(private todoService: TodoService) {}

  ngOnInit(): void {}

  addPost() {
    if (this.title.length == 0) return;
    this.todoService.addTodo({
      userId: 1,
      id: new Date().getTime(),
      title: this.title,
      completed: false,
    });

    this.title = '';
  }
}
