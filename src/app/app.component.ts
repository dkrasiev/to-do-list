import { Component, OnInit } from '@angular/core';
import { LayoutService } from './services/layout.service';
import { TodoService } from './services/todo.service';
import { DarkModeService } from './services/dark-mode.service';

import { AngularFireAuth } from '@angular/fire/compat/auth';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = $localize`:@@appTitle:todo list`;
  isDarkMode: boolean = false;
  isSidenavOpen: boolean = false;

  isModalOpen = false;

  constructor(
    private todoService: TodoService,
    private darkModeService: DarkModeService,
    private layoutService: LayoutService,
    public auth: AngularFireAuth
  ) {}

  ngOnInit(): void {
    this.todoService.getTodos().subscribe();

    this.darkModeService.darkMode$.subscribe(
      (state) => (this.isDarkMode = state)
    );

    this.layoutService.sidenav$.subscribe((state) => {
      this.isSidenavOpen = state;
    });
  }

  loadTodos() {
    this.todoService.loadTodos().subscribe();
  }

  clearTodos() {
    this.todoService.clearTodos();
  }

  onDarkModeChange() {
    this.isDarkMode
      ? this.darkModeService.enable()
      : this.darkModeService.disable();
  }

  toggleSidenav() {
    this.layoutService.toggle();
  }

  closeSidenav() {
    this.layoutService.close();
  }

  openModal() {
    this.isModalOpen = true;
  }
}
